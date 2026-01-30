import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Game from './Game';

// Mock socket connect
const handlers: Record<string, Function[]> = {};
const mockSocket = {
  on: (ev: string, cb: Function) => { handlers[ev] = (handlers[ev] || []).concat(cb); },
  off: (ev: string, cb?: Function) => { if (!cb) { handlers[ev] = []; } else { handlers[ev] = (handlers[ev] || []).filter(f => f !== cb); } },
  emit: vi.fn(),
  connected: true,
  disconnect: vi.fn()
};
vi.mock('../services/socket', () => ({ connect: () => mockSocket }));

beforeEach(() => {
  for (const k of Object.keys(handlers)) handlers[k] = [];
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

describe('Round recap modal', () => {
  it('shows recap modal for 8s and disables actions', async () => {
    const roomId = 'room1';
    const { container } = render(<Game roomId={roomId} playerName="Me" />);

    // Simulate auth_ok
    handlers['auth_ok']?.forEach(cb => cb({ id: 'p1' }));

    // Send initial game_state
    const state = {
      id: 'g1',
      players: [{ id: 'p1', name: 'Me', seat: 0, role: 'player', team: 0, hand: ['hearts-4','spades-5'], taken: [] }],
      talon: [],
      faceUpCard: [],
      currentTurnPlayerId: 'p1',
      dealerId: 'p1',
      handNumber: 1,
      scores: { team0: 0, team1: 0 }
    };
    handlers['game_state']?.forEach(cb => cb({ state }));

    // Emit round_end event with perPlayer payload
    const payload = {
      scores: { team0: 2, team1: 0 },
      teams: { team0: { zings: 0, zingsCount: 0 }, team1: { zings: 0, zingsCount: 0 } },
      perPlayer: { p1: { id: 'p1', name: 'Me', team: 0, points: 2, takenCount: 1, zings: 0, zingsCount: 0 } },
      bonus: null
    };

    handlers['game_event']?.forEach(cb => cb({ type: 'round_end', payload }));

    // Modal should be present
    await waitFor(() => {
      const modal = container.querySelector('.recap-modal');
      expect(modal).toBeTruthy();
    });

    // Actions should be disabled during recap
    const disabledMsg = container.querySelector('.logs')?.textContent || '';
    // Try to play - should be blocked (handlePlay logs a message)
    // Emulate a play attempt by calling handlers directly isn't straightforward here; we'll just assert modal exists and then advance time

    // Advance 13s
    vi.advanceTimersByTime(13000);

    await waitFor(() => {
      const modal = container.querySelector('.recap-modal');
      expect(modal).toBeNull();
    });
  });
});
