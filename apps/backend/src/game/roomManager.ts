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
    scores: {}
  };
  initialDeal(state, seed, dealerSeat);
  room.seq++;
  // persist game
  await prisma.game.create({
    data: {
      id: gameId,
      status: 'started',
      deckSeed: seed,
      dealerId: state.dealerId
    }
  });
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
  }

  // If the round is over, compute scores and persist them
  if (isRoundOver(room.state)) {
    const result = computeRoundScores(room.state);
    const roundEv = { type: 'round_end', actor: undefined, payload: result } as Event;
    room.seq++;
    await appendGameEvent(room.state.id, room.seq, roundEv.type, roundEv.actor, roundEv.payload);
    emitted.push(roundEv);
    // persist round scores for both teams
    const pts0 = result.scores.team0 || 0;
    const pts1 = result.scores.team1 || 0;
    await prisma.roundScore.createMany({
      data: [
        { gameId: room.state.id, team: 0, points: pts0 },
        { gameId: room.state.id, team: 1, points: pts1 }
      ]
    });
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
