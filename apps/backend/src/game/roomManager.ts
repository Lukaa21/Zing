import { GameState, PlayerState, Event, Intent } from './types';
import { createDeck, initialDeal, applyIntent, isRoundOver, computeRoundScores, dealNextHands } from './engine';
import { randomUUID } from 'crypto';
import prisma from '../db';
import { appendGameEvent } from '../events/logger';

export type Room = {
  id: string;
  players: PlayerState[];
  state?: GameState;
  seq: number;
};

const rooms: Map<string, Room> = new Map();

export function createRoom() {
  const id = `room-${Math.random().toString(36).slice(2, 8)}`;
  const room: Room = { id, players: [], seq: 0 };
  rooms.set(id, room);
  return room;
}

export async function startGame(room: Room) {
  // require 2 or 4 players to start
  if (room.players.length !== 2 && room.players.length !== 4) {
    throw new Error('game_start_requires_2_or_4_players');
  }
  const gameId = randomUUID();
  const seed = randomUUID();
  const dealerSeat = 0;
  const players = room.players.map((p, idx) => ({ ...p, hand: [], taken: [], seat: idx, team: idx % 2 }));
  const state: GameState = {
    id: gameId,
    players,
    talon: [],
    deck: [],
    currentTurnPlayerId: players[0]?.id,
    dealerId: players[dealerSeat]?.id,
    scores: { team0: 0, team1: 0 },
    targetScore: process.env.TARGET_SCORE ? Number(process.env.TARGET_SCORE) : 101,
    matchOver: false
  };
  initialDeal(state, seed, dealerSeat);
  room.seq++;
  // persist game (best-effort)
  if (process.env.DATABASE_URL) {
    try {
      await prisma.game.create({
        data: {
          id: gameId,
          status: 'started',
          deckSeed: seed,
          dealerId: state.dealerId
        }
      });
    } catch (err) {
      console.warn('prisma.game.create failed (continuing without DB):', err);
    }
  } else {
    console.warn('DATABASE_URL not set — skipping prisma.game.create');
  }

  const ev = { type: 'game_started', actor: undefined, payload: state };
  await appendGameEvent(gameId, room.seq, ev.type, ev.actor, ev.payload);
  // persist initial hands_dealt event (capture current hands state)
  const dealt: Record<string, string[]> = {};
  for (const p of state.players) dealt[p.id] = [...p.hand];
  const handsEv = { type: 'hands_dealt', actor: undefined, payload: { dealt } } as Event;
  room.seq++;
  await appendGameEvent(gameId, room.seq, handsEv.type, handsEv.actor, handsEv.payload);
  room.state = state;
  return state;
}

// Finalize a round: compute round scores, update cumulative match scores,
// emit round_end and match_update, check for match end and either emit match_end
// or start the next round (rotate dealer and deal new hands). Returns emitted events.
export async function finalizeRound(room: Room) {
  if (!room.state) return [] as Event[];
  const emitted: Event[] = [];
  const state = room.state;

  const result = computeRoundScores(state);
  const roundEv = { type: 'round_end', actor: undefined, payload: result } as Event;
  room.seq++;
  await appendGameEvent(state.id, room.seq, roundEv.type, roundEv.actor, roundEv.payload);
  emitted.push(roundEv);

  // persist round scores for both teams (best-effort)
  const pts0 = result.scores.team0 || 0;
  const pts1 = result.scores.team1 || 0;
  if (process.env.DATABASE_URL) {
    try {
      await prisma.roundScore.createMany({
        data: [
          { gameId: state.id, team: 0, points: pts0 },
          { gameId: state.id, team: 1, points: pts1 }
        ]
      });
    } catch (err) {
      console.warn('prisma.roundScore.createMany failed (continuing without DB):', err);
    }
  }

  // update cumulative match scores
  state.scores = state.scores || { team0: 0, team1: 0 };
  state.scores.team0 = (state.scores.team0 || 0) + pts0;
  state.scores.team1 = (state.scores.team1 || 0) + pts1;

  const matchUpdate = { type: 'match_update', actor: undefined, payload: { cumulative: { ...state.scores }, lastRound: result.scores, targetScore: state.targetScore } } as Event;
  room.seq++;
  await appendGameEvent(state.id, room.seq, matchUpdate.type, matchUpdate.actor, matchUpdate.payload);
  emitted.push(matchUpdate);

  // check match end: one team reached target while the other did not
  const target = state.targetScore || 101;
  const t0 = state.scores.team0 || 0;
  const t1 = state.scores.team1 || 0;
  if ((t0 >= target && t1 < target) || (t1 >= target && t0 < target)) {
    state.matchOver = true;
    const winner = t0 > t1 ? 0 : 1;
    const matchEnd = { type: 'match_end', actor: undefined, payload: { winnerTeam: winner, finalScores: { team0: t0, team1: t1 } } } as Event;
    room.seq++;
    await appendGameEvent(state.id, room.seq, matchEnd.type, matchEnd.actor, matchEnd.payload);
    emitted.push(matchEnd);

    // best-effort DB update
    if (process.env.DATABASE_URL) {
      try {
        await prisma.game.update({ where: { id: state.id }, data: { status: 'completed' } });
      } catch (err) {
        console.warn('prisma.game.update failed (continuing without DB):', err);
      }
    }

    return emitted;
  }

  // otherwise, start a new round: rotate dealer and deal new hands
  const dealerIdx = state.players.findIndex((p) => p.id === state.dealerId);
  const nextDealerSeat = (dealerIdx === -1 ? 0 : (dealerIdx + 1) % state.players.length);
  const seed = randomUUID();
  initialDeal(state, seed, nextDealerSeat);

  // persist round start / hands_dealt event similar to startGame
  const dealt: Record<string, string[]> = {};
  for (const p of state.players) dealt[p.id] = [...p.hand];
  const handsEv = { type: 'hands_dealt', actor: undefined, payload: { dealt, handNumber: state.handNumber } } as Event;
  room.seq++;
  await appendGameEvent(state.id, room.seq, handsEv.type, handsEv.actor, handsEv.payload);
  emitted.push(handsEv);

  return emitted;
}

export async function handleIntent(room: Room, intent: Intent) {
  if (!room.state) return null;
  // enforce turn order
  if (room.state.currentTurnPlayerId && room.state.currentTurnPlayerId !== (intent as any).playerId) {
    room.seq++;
    const rej = { type: 'intent_rejected', actor: (intent as any).playerId, payload: { reason: 'not_your_turn' } } as Event;
    await appendGameEvent(room.state.id, room.seq, rej.type, rej.actor, rej.payload);
    return rej;
  }

  const ev = applyIntent(room.state!, intent);
  if (!ev) return null;

  const emitted: Event[] = [];

  // persist the immediate event
  room.seq++;
  await appendGameEvent(room.state.id, room.seq, ev.type, ev.actor, ev.payload);
  emitted.push(ev);

  // If all hands empty and deck has cards, deal next mini-hands
  const handsEmpty = room.state.players.every((p) => p.hand.length === 0);

  if (handsEmpty && room.state.deck.length > 0) {
    const handsEv = dealNextHands(room.state);
    room.seq++;
    await appendGameEvent(room.state.id, room.seq, handsEv.type, handsEv.actor, handsEv.payload);
    emitted.push(handsEv as Event);

    // KLJUČ: upravo smo podijelili nove karte -> ne smijemo raditi “end of round” logiku sad
    return emitted;
  }

  // If all hands empty and deck is empty but talon still has cards,
  // award remaining talon to the last taker (or fallback to dealer / first player)
  if (handsEmpty && room.state.deck.length === 0 && room.state.talon.length > 0) {
    const lastTaker = (room.state as any)._lastTaker as string | undefined;
    const awardTo = lastTaker ?? room.state.dealerId ?? room.state.players[0]?.id;
    if (awardTo) {
      const taken = [...room.state.talon];
      const p = room.state.players.find((pl) => pl.id === awardTo);
      if (p) p.taken.push(...taken);
      const awardEv = { type: 'talon_awarded', actor: awardTo, payload: { playerId: awardTo, taken } } as Event;
      room.seq++;
      await appendGameEvent(room.state.id, room.seq, awardEv.type, awardEv.actor, awardEv.payload);
      emitted.push(awardEv);
    }
    // clear talon so round end condition can be reached
    room.state.talon = [];
  }

// If the round is over, finalize it (compute scores, update cumulative match score,
  // possibly end match or start a new round)
  if (isRoundOver(room.state)) {
    const extra = await finalizeRound(room);
    if (extra && extra.length) emitted.push(...extra);
  }

  return emitted;
}

export function joinRoom(room: Room, p: PlayerState) {
  const idx = room.players.findIndex((x) => x.id === p.id);
  if (idx !== -1) {
    // update existing player entry (preserve seat if already assigned)
    const existing = room.players[idx];
    room.players[idx] = { ...existing, ...p, seat: existing.seat ?? p.seat };
  } else {
    room.players.push({ ...p, seat: p.seat ?? room.players.length });
  }
}

export function leaveRoom(room: Room, playerId: string) {
  room.players = room.players.filter((p) => p.id !== playerId);
}

export function removePlayerFromAllRooms(playerId: string) {
  const changed: string[] = [];
  for (const room of rooms.values()) {
    const before = room.players.length;
    room.players = room.players.filter((p) => p.id !== playerId);
    if (room.players.length !== before) changed.push(room.id);
  }
  return changed;
}

export function getRoom(id: string) {
  return rooms.get(id);
}

export function listRooms() {
  return Array.from(rooms.values()).map((r) => ({ id: r.id, size: r.players.length }));
}
