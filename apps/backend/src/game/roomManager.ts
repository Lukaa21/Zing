import { GameState, PlayerState, Event, Intent } from './types';
import { createDeck, initialDeal, applyIntent } from './engine';
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
  const gameId = randomUUID();
  const deck = createDeck();
  const players = room.players.map((p, idx) => ({ ...p, hand: [], taken: [] }));
  const state: GameState = {
    id: gameId,
    players,
    talons: [[], [], [], []],
    deck: [...deck],
    currentTurnPlayerId: players[0]?.id,
    dealerId: players[0]?.id,
    scores: {}
  };
  initialDeal(state);
  room.seq++;
  // persist game
  await prisma.game.create({
    data: {
      id: gameId,
      status: 'started',
      deckSeed: 'seedless'
    }
  });
  const ev = { type: 'game_started', actor: undefined, payload: state };
  await appendGameEvent(gameId, room.seq, ev.type, ev.actor, ev.payload);
  room.state = state;
  return state;
}

export async function handleIntent(room: Room, intent: Intent) {
  if (!room.state) return null;
  const ev = applyIntent(room.state!, intent);
  if (!ev) return null;
  room.seq++;
  await appendGameEvent(room.state.id, room.seq, ev.type, ev.actor, ev.payload);
  return ev;
}

export function joinRoom(room: Room, p: PlayerState) {
  room.players.push(p);
}

export function getRoom(id: string) {
  return rooms.get(id);
}

export function listRooms() {
  return Array.from(rooms.values()).map((r) => ({ id: r.id, size: r.players.length }));
}
