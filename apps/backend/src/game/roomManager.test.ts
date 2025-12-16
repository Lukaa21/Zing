import { describe, it, expect } from 'vitest';
import { createRoom, startGame, finalizeRound } from './roomManager';
import { GameState } from './types';
import { vi } from 'vitest';

vi.mock('../db', () => {
  return {
    default: {
      game: {
        create: vi.fn(),
      },
      roundScore: {
        createMany: vi.fn(),
      },
    },
  };
});


describe('room manager match progression', () => {
  it('updates cumulative scores and starts a new round when target not reached', async () => {
    const room = createRoom();
    // create two players
    const p1 = { id: 'p1', name: 'p1', seat: 0, role: 'player', team: 0, hand: [], taken: [] } as any;
    const p2 = { id: 'p2', name: 'p2', seat: 1, role: 'player', team: 1, hand: [], taken: [] } as any;
    room.players.push(p1, p2);

    const state = await startGame(room);
    // simulate end-of-round state with team0 scoring 10 points
    state.players.forEach((pl: any) => {
      pl.hand = [];
      pl.taken = [];
    });
    // give p1 some scoring taken cards (simulate 10 points using one 'diamonds-10')
    room.state!.players.find((x) => x.id === 'p1')!.taken.push('diamonds-10');
    room.state!.deck = [];
    room.state!.talon = [];

    const events = await finalizeRound(room as any);
    expect(events.map((e) => e.type)).toContain('round_end');
    expect(events.map((e) => e.type)).toContain('match_update');
    // since target (101) not reached, a hands_dealt should be emitted to start next round
    expect(events.map((e) => e.type)).toContain('hands_dealt');
    expect(room.state!.scores.team0).toBeGreaterThan(0);
  });

  it('emits match_end when a team crosses target and opponent has not', async () => {
    const room = createRoom();
    const p1 = { id: 'p1', name: 'p1', seat: 0, role: 'player', team: 0, hand: [], taken: [] } as any;
    const p2 = { id: 'p2', name: 'p2', seat: 1, role: 'player', team: 1, hand: [], taken: [] } as any;
    room.players.push(p1, p2);

    const state = await startGame(room);
    // set scores close to target
    state.scores.team0 = 100;
    state.scores.team1 = 20;

    // simulate a round where team0 gets 5 points
    state.players.forEach((pl: any) => {
      pl.hand = [];
      pl.taken = [];
    });
    room.state!.players.find((x) => x.id === 'p1')!.taken.push('diamonds-10');
    room.state!.deck = [];
    room.state!.talon = [];

    const events = await finalizeRound(room as any);
    expect(events.map((e) => e.type)).toContain('match_end');
    expect(room.state!.matchOver).toBe(true);
  });
});
