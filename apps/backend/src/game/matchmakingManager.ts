import { createRoom, startGame, joinRoom, Room } from './roomManager';
import { randomUUID } from 'crypto';

export type MatchmakingMode = '1v1' | '2v2';

type QueueEntry = {
  playerId: string;
  playerName: string;
  socketId: string;
  joinedAt: number;
};

type MatchmakingQueues = {
  '1v1': QueueEntry[];
  '2v2': QueueEntry[];
};

class MatchmakingManager {
  private queues: MatchmakingQueues = {
    '1v1': [],
    '2v2': []
  };

  // Track which queue each player is in (playerId -> mode)
  private playerInQueue: Map<string, MatchmakingMode> = new Map();

  /**
   * Add player to matchmaking queue
   * Returns { matched: true, room } if match found immediately, otherwise { matched: false }
   */
  async addToQueue(
    mode: MatchmakingMode,
    playerId: string,
    playerName: string,
    socketId: string
  ): Promise<{ matched: boolean; room?: Room; players?: QueueEntry[] }> {
    // Remove player from any existing queue first
    this.removeFromQueue(playerId);

    // Add to new queue
    const entry: QueueEntry = {
      playerId,
      playerName,
      socketId,
      joinedAt: Date.now()
    };

    this.queues[mode].push(entry);
    this.playerInQueue.set(playerId, mode);

    console.log(`[Matchmaking] Player ${playerName} (${playerId}) joined ${mode} queue. Queue size: ${this.queues[mode].length}`);

    // Try to form a match
    return await this.tryFormMatch(mode);
  }

  /**
   * Remove player from queue (for cancel or disconnect)
   */
  removeFromQueue(playerId: string): void {
    const mode = this.playerInQueue.get(playerId);
    if (!mode) return;

    this.queues[mode] = this.queues[mode].filter(e => e.playerId !== playerId);
    this.playerInQueue.delete(playerId);

    console.log(`[Matchmaking] Player ${playerId} removed from ${mode} queue. Queue size: ${this.queues[mode].length}`);
  }

  /**
   * Get queue status for a player
   */
  getPlayerQueueStatus(playerId: string): { inQueue: boolean; mode?: MatchmakingMode; position?: number } {
    const mode = this.playerInQueue.get(playerId);
    if (!mode) return { inQueue: false };

    const position = this.queues[mode].findIndex(e => e.playerId === playerId);
    return { inQueue: true, mode, position: position + 1 };
  }

  /**
   * Try to form a match from the queue
   * Returns { matched: true, room, players } if enough players found, otherwise { matched: false }
   */
  private async tryFormMatch(mode: MatchmakingMode): Promise<{ matched: boolean; room?: Room; players?: QueueEntry[] }> {
    const requiredPlayers = mode === '1v1' ? 2 : 4;
    const queue = this.queues[mode];

    if (queue.length < requiredPlayers) {
      return { matched: false };
    }

    // Take first N players (FIFO)
    const matchedPlayers = queue.splice(0, requiredPlayers);

    // Remove from tracking
    for (const player of matchedPlayers) {
      this.playerInQueue.delete(player.playerId);
    }

    console.log(`[Matchmaking] Match formed for ${mode}! Players:`, matchedPlayers.map(p => p.playerName));

    // Create room and add players
    const room = createRoom('public'); // Matchmaking rooms are public (access controlled by matchmaking, not listed anywhere)
    room.ownerId = matchedPlayers[0].playerId; // First player is nominal owner

    // Shuffle players for 2v2 to randomize team assignment
    const shuffledPlayers = mode === '2v2' ? this.shuffleArray([...matchedPlayers]) : matchedPlayers;

    // Add all players to the room
    for (let i = 0; i < shuffledPlayers.length; i++) {
      const player = shuffledPlayers[i];
      const team = i % 2; // Alternating teams (0, 1, 0, 1)
      
      joinRoom(room, {
        id: player.playerId,
        name: player.playerName,
        seat: i,
        team: team,
        role: 'player',
        hand: [],
        taken: []
      });
    }

    // Auto-start the game immediately
    try {
      await startGame(room);
      console.log(`[Matchmaking] Game auto-started for room ${room.id}`);
    } catch (error) {
      console.error(`[Matchmaking] Failed to start game for room ${room.id}:`, error);
      // If game start fails, re-queue players
      for (const player of matchedPlayers) {
        this.queues[mode].push(player);
        this.playerInQueue.set(player.playerId, mode);
      }
      return { matched: false };
    }

    return { matched: true, room, players: matchedPlayers };
  }

  /**
   * Shuffle array using Fisher-Yates algorithm
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Get queue stats (for debugging/monitoring)
   */
  getQueueStats() {
    return {
      '1v1': {
        count: this.queues['1v1'].length,
        players: this.queues['1v1'].map(e => ({ name: e.playerName, waitTime: Date.now() - e.joinedAt }))
      },
      '2v2': {
        count: this.queues['2v2'].length,
        players: this.queues['2v2'].map(e => ({ name: e.playerName, waitTime: Date.now() - e.joinedAt }))
      }
    };
  }
}

// Singleton instance
export const matchmakingManager = new MatchmakingManager();
