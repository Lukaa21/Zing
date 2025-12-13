import { describe, it, expect } from 'vitest';
import { createDeck, initialDeal } from './engine';
import { GameState } from './types';

describe('game engine', () => {
  it('creates a 52 card deck', () => {
    const deck = createDeck();
    expect(deck).toHaveLength(52);
    expect(new Set(deck).size).toBe(52);
  });

  it('deals four cards to each player', () => {
    const players = [{ id: 'p1', name: 'p1', seat: 0, role: 'player', hand: [], taken: [] }, { id: 'p2', name: 'p2', seat: 1, role: 'player', hand: [], taken: [] }];
    const state: GameState = { id: 'g1', players: players as any, talons: [[], [], [], []], deck: createDeck(), currentTurnPlayerId: 'p1', dealerId: 'p1', scores: {} };
    initialDeal(state);
    expect(state.players[0].hand.length).toBe(4);
    expect(state.players[1].hand.length).toBe(4);
    expect(state.talons.flat().length).toBe(4);
  });
});
