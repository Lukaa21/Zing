import { GameState, Intent, Event } from './types';

// Seeded RNG helpers (mulberry32)
function hashSeed(seed: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619) >>> 0;
  return h;
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createDeck(seed?: string): string[] {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
  const cards: string[] = [];
  for (const s of suits) for (const r of ranks) cards.push(`${s}-${r}`);
  if (!seed) return cards;
  const rnd = mulberry32(hashSeed(seed));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export function initialDeal(state: GameState, seed?: string, dealerSeat = 0): GameState {
  const deck = createDeck(seed || Math.random().toString());
  const halfA = deck.slice(0, 26);
  const halfB = deck.slice(26);
  const cutterHalf = halfB.slice();
  const reserved = cutterHalf.pop();
  const talon: string[] = [];
  for (let i = 0; i < 4; i++) {
    const c = cutterHalf.pop();
    if (c) talon.unshift(c);
  }
  const dealDeck = halfA.slice();
  // reset hands
  for (const p of state.players) p.hand = [];
  state.talon = talon;
  // initial deck is dealDeck followed by remaining cutterHalf and reserved card
  state.deck = dealDeck.concat(cutterHalf).concat(reserved ? [reserved] : []);
  // deal first small hands (up to 4 cards each)
  dealNextHands(state);
  state.handNumber = 1;
  state.dealerId = state.players[dealerSeat]?.id;
  state.currentTurnPlayerId = state.players[(dealerSeat + 1) % state.players.length]?.id;
  (state as any)._zingPending = null;
  (state as any)._roundZings = { team0: 0, team1: 0 };
  return state;
}

// Deal up to 4 cards per player from the top of the deck (top is last element)
export function dealNextHands(state: GameState, countPerPlayer = 4) {
  const dealt: Record<string, string[]> = {};
  for (const p of state.players) {
    dealt[p.id] = [];
  }
  for (let i = 0; i < countPerPlayer; i++) {
    for (const p of state.players) {
      if (state.deck.length === 0) break;
      const c = state.deck.pop() as string;
      p.hand.push(c);
      dealt[p.id].push(c);
    }
  }
  // after dealing, set the next turn to player after dealer
  const dealerIdx = state.players.findIndex((p) => p.id === state.dealerId);
  const dealerSeat = dealerIdx === -1 ? 0 : dealerIdx;
  state.currentTurnPlayerId = state.players[(dealerSeat + 1) % state.players.length]?.id;
  state.handNumber = (state.handNumber || 0) + 1;
  return { type: 'hands_dealt', actor: undefined, payload: { dealt, handNumber: state.handNumber } } as any;
}

function parseCard(cardId: string) {
  const [suit, rank] = cardId.split('-');
  return { suit, rank };
}

function cardBasePoints(cardId: string) {
  const { suit, rank } = parseCard(cardId);
  if (rank === '10' && suit === 'diamonds') return 2;
  if (rank === '2' && suit === 'clubs') return 1;
  if (['10', 'J', 'Q', 'K', 'A'].includes(rank)) return 1;
  return 0;
}

export function legalIntents(state: GameState, playerId: string) {
  const p = state.players.find((pl) => pl.id === playerId);
  if (!p) return [];
  if (p.role === 'spectator') return [];
  const intents: Intent[] = [];
  for (const c of p.hand) intents.push({ type: 'play_card', playerId, cardId: c } as any);
  return intents;
}

export function applyIntent(state: GameState, intent: Intent): Event | null {
  const player = state.players.find((p) => p.id === (intent as any).playerId);
  if (!player) return null;
  if ((intent as any).type === 'play_card') {
    const cardId = (intent as any).cardId as string;
    const idx = player.hand.indexOf(cardId);
    if (idx === -1) return null;
    const prevTalonSize = state.talon.length;
    const prevTop = state.talon.length > 0 ? state.talon[state.talon.length - 1] : null;
    player.hand.splice(idx, 1);
    state.talon.push(cardId);
    const playedRank = parseCard(cardId).rank;
    let captured: string[] = [];
    let zing: { points: number; double?: boolean } | null = null;
    if (prevTop) {
      const prevRank = parseCard(prevTop).rank;
      if (playedRank === 'J' || playedRank === prevRank) {
        captured = state.talon.splice(0, state.talon.length);
        player.taken.push(...captured);
        if (prevTalonSize === 1 && (state as any)._zingPending) {
          const pending = (state as any)._zingPending as { cardId: string; playerId: string } | null;
          if (pending && pending.cardId) {
            const pendingRank = parseCard(pending.cardId).rank;
            if (!(playedRank === 'J' && pendingRank !== 'J')) {
              const points = playedRank === 'J' && pendingRank === 'J' ? 20 : 10;
              zing = { points, double: points === 20 };
              const teamKey = `team${player.team}` as 'team0' | 'team1';
              (state as any)._roundZings[teamKey] += points;
            }
          }
        }
      }
    } else {
      (state as any)._zingPending = { cardId, playerId: player.id };
    }
    let ev: any;
    if (captured.length > 0) {
      ev = {
        type: 'talon_taken',
        actor: player.id,
        payload: { playerId: player.id, taken: captured, zing }
      } as any;
      (state as any)._zingPending = null;
    } else {
      ev = { type: 'card_played', actor: player.id, payload: { playerId: player.id, cardId } } as any;
    }

    // advance turn to next player in seating order
    const curIdx = state.players.findIndex((p) => p.id === player.id);
    const nextIdx = (curIdx + 1) % state.players.length;
    state.currentTurnPlayerId = state.players[nextIdx]?.id;
    return ev as any;
  }
  
   return null;
}

export function isRoundOver(state: GameState) {
  const handsEmpty = state.players.every((p) => p.hand.length === 0);
  return state.deck.length === 0 && handsEmpty && state.talon.length === 0;
}

export function computeRoundScores(state: GameState) {
  const teamPoints: any = { team0: 0, team1: 0 };
  const teamTakenCounts: any = { team0: 0, team1: 0 };
  let ownerOfTwoClubs: number | null = null;
  for (const p of state.players) {
    const team = p.team;
    for (const c of p.taken) {
      const pts = cardBasePoints(c);
      teamPoints[`team${team}` as 'team0' | 'team1'] += pts;
      teamTakenCounts[`team${team}` as 'team0' | 'team1'] += 1;
      const [suit, rank] = c.split('-');
      if (suit === 'clubs' && rank === '2') ownerOfTwoClubs = team;
    }
  }
  const z = (state as any)._roundZings || { team0: 0, team1: 0 };
  teamPoints.team0 += z.team0;
  teamPoints.team1 += z.team1;
  if (teamTakenCounts.team0 > teamTakenCounts.team1) teamPoints.team0 += 3;
  else if (teamTakenCounts.team1 > teamTakenCounts.team0) teamPoints.team1 += 3;
  else {
    if (ownerOfTwoClubs !== null) teamPoints[`team${ownerOfTwoClubs}` as 'team0' | 'team1'] += 3;
  }
  return { scores: teamPoints, takenCounts: teamTakenCounts };
}
