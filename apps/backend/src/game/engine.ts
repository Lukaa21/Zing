import { GameState, Card, Intent, Event } from './types';

export function createDeck(seed?: string): string[] {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
  const cards: string[] = [];
  for (const s of suits) {
    for (const r of ranks) {
      cards.push(`${s}-${r}`);
    }
  }
  // simple shuffle (Fisher-Yates seeded). We'll keep deterministic seeded shuffle later.
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export function initialDeal(state: GameState): GameState {
  // Implement Zing initial deal: split deck into halves etc. For now we'll do a simple deal of 4 cards to each player and 4 talon cards.
  const deck = [...state.deck];
  state.talons = [[], [], [], []];
  for (let i = 0; i < 4; i++) {
    state.talons[i].push(deck.pop()!);
  }
  // give each player 4 cards
  for (const p of state.players) {
    p.hand = [];
    for (let i = 0; i < 4; i++) {
      const c = deck.pop();
      if (c) p.hand.push(c);
    }
  }
  state.deck = deck;
  return state;
}

export function legalIntents(state: GameState, playerId: string): Intent[] {
  const p = state.players.find((pl) => pl.id === playerId);
  if (!p) return [];
  if (p.role === 'spectator') return [];
  const intents: Intent[] = [];
  // play_card for each card in hand
  for (const c of p.hand) intents.push({ type: 'play_card', playerId, cardId: c });
  intents.push({ type: 'take_talon', playerId });
  intents.push({ type: 'pass', playerId });
  return intents;
}

export function applyIntent(state: GameState, intent: Intent): Event | null {
  switch (intent.type) {
    case 'play_card': {
      const p = state.players.find((pl) => pl.id === intent.playerId);
      if (!p) return null;
      const idx = p.hand.indexOf(intent.cardId);
      if (idx < 0) return null;
      p.hand.splice(idx, 1);
      // put on talon top: choose talon 0 for now
      state.talons[0].push(intent.cardId);
      return { type: 'card_played', actor: intent.playerId, payload: { cardId: intent.cardId } };
    }
    case 'take_talon': {
      const p = state.players.find((pl) => pl.id === intent.playerId);
      if (!p) return null;
      const taken = state.talons[0].splice(0, state.talons[0].length);
      p.taken.push(...taken);
      return { type: 'talon_taken', actor: intent.playerId, payload: { taken } };
    }
    case 'pass':
      return { type: 'pass', actor: intent.playerId };
  }
}
