import { createRoom, startGame, joinRoom, Room } from './roomManager';
import { randomUUID } from 'crypto';

export type MatchmakingMode = '1v1' | '2v2';

type QueueEntry = {
  playerId: string;
  playerName: string;
  socketId: string;
  joinedAt: number;
  partyId?: string; // For tracking parties in 2v2
};

type PartyEntry = {
  partyId: string;
  roomId: string; // Original room ID for cleanup
  players: QueueEntry[];
  joinedAt: number;
};

type MatchmakingQueues = {
  '1v1': QueueEntry[];
  '2v2': QueueEntry[];
};

type PartyQueues = {
  '2v2': PartyEntry[];
};

class MatchmakingManager {
  private queues: MatchmakingQueues = {
    '1v1': [],
    '2v2': []
  };

  private partyQueues: PartyQueues = {
    '2v2': []
  };

  // Track which queue each player is in (playerId -> mode)
  private playerInQueue: Map<string, MatchmakingMode> = new Map();
  
  // Track which party queue each room is in (roomId -> partyId)
  private roomInPartyQueue: Map<string, string> = new Map();

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
   * Add a party (2 players) to 2v2 matchmaking queue
   * Returns { matched: true, room } if match found with another party, otherwise { matched: false }
   */
  async addPartyToQueue(
    mode: '2v2',
    players: Array<{ playerId: string; playerName: string; socketId: string }>,
    roomId: string
  ): Promise<{ matched: boolean; room?: Room; players?: QueueEntry[] }> {
    if (players.length !== 2) {
      throw new Error('Party must have exactly 2 players for 2v2');
    }

    // Remove any existing party for this room
    this.removePartyFromQueue(roomId);

    // Create party entry
    const partyId = randomUUID();
    const partyEntry: PartyEntry = {
      partyId,
      roomId,
      players: players.map(p => ({
        playerId: p.playerId,
        playerName: p.playerName,
        socketId: p.socketId,
        joinedAt: Date.now(),
        partyId,
      })),
      joinedAt: Date.now(),
    };

    // Add to party queue
    this.partyQueues['2v2'].push(partyEntry);
    this.roomInPartyQueue.set(roomId, partyId);

    // Mark players as in queue
    for (const player of players) {
      this.playerInQueue.set(player.playerId, '2v2');
    }

    console.log(`[Matchmaking] Party ${partyId} (room ${roomId}) joined 2v2 queue. Queue size: ${this.partyQueues['2v2'].length} parties`);

    // Try to match two parties
    return await this.tryFormPartyMatch();
  }

  /**
   * Remove party from queue (when room is deleted or cancelled)
   * Returns true if party was removed, false if not in queue
   */
  removePartyFromQueue(roomId: string): boolean {
    const partyId = this.roomInPartyQueue.get(roomId);
    if (!partyId) return false;

    const party = this.partyQueues['2v2'].find(p => p.partyId === partyId);
    if (party) {
      // Remove players from tracking
      for (const player of party.players) {
        this.playerInQueue.delete(player.playerId);
      }
    }

    this.partyQueues['2v2'] = this.partyQueues['2v2'].filter(p => p.partyId !== partyId);
    this.roomInPartyQueue.delete(roomId);

    console.log(`[Matchmaking] Party ${partyId} (room ${roomId}) removed from 2v2 queue`);
    return true;
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

    // For 2v2, try to match with party + singles first
    if (mode === '2v2' && this.partyQueues['2v2'].length > 0 && queue.length >= 2) {
      const partyResult = await this.tryFormPartyWithSingles();
      if (partyResult.matched) {
        return partyResult;
      }
    }

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
    const room = createRoom('public', undefined, true); // Matchmaking rooms always have timer enabled
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
        taken: [],
        socketId: player.socketId
      } as any);
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
   * Try to match two parties for 2v2
   * Returns { matched: true, room, players } if 2 parties found, otherwise { matched: false }
   */
  private async tryFormPartyMatch(): Promise<{ matched: boolean; room?: Room; players?: QueueEntry[] }> {
    const partyQueue = this.partyQueues['2v2'];

    // Try party + singles first if available
    if (partyQueue.length >= 1 && this.queues['2v2'].length >= 2) {
      const partyWithSinglesResult = await this.tryFormPartyWithSingles();
      if (partyWithSinglesResult.matched) {
        return partyWithSinglesResult;
      }
    }

    if (partyQueue.length < 2) {
      return { matched: false };
    }

    // Take first 2 parties (FIFO)
    const party1 = partyQueue.shift()!;
    const party2 = partyQueue.shift()!;

    // Remove from tracking
    this.roomInPartyQueue.delete(party1.roomId);
    this.roomInPartyQueue.delete(party2.roomId);

    for (const player of [...party1.players, ...party2.players]) {
      this.playerInQueue.delete(player.playerId);
    }

    console.log(`[Matchmaking] 2v2 party match formed! Party 1: ${party1.players.map(p => p.playerName).join(', ')}, Party 2: ${party2.players.map(p => p.playerName).join(', ')}`);

    // Create new matchmaking room with timer enabled
    const room = createRoom('public', undefined, true);
    room.ownerId = party1.players[0].playerId;

    // Add all 4 players to room
    // Party 1 = Team 0, Party 2 = Team 1
    const allPlayers = [
      ...party1.players.map(p => ({ ...p, team: 0 })),
      ...party2.players.map(p => ({ ...p, team: 1 })),
    ];

    for (let i = 0; i < allPlayers.length; i++) {
      const player = allPlayers[i];
      
      joinRoom(room, {
        id: player.playerId,
        name: player.playerName,
        seat: i,
        team: player.team,
        role: 'player',
        hand: [],
        taken: [],
        socketId: player.socketId
      } as any);
    }

    // Auto-start the game
    try {
      await startGame(room);
      console.log(`[Matchmaking] 2v2 party game auto-started for room ${room.id}`);
    } catch (error) {
      console.error(`[Matchmaking] Failed to start 2v2 party game for room ${room.id}:`, error);
      // If game start fails, re-queue parties
      partyQueue.push(party1, party2);
      this.roomInPartyQueue.set(party1.roomId, party1.partyId);
      this.roomInPartyQueue.set(party2.roomId, party2.partyId);
      for (const player of [...party1.players, ...party2.players]) {
        this.playerInQueue.set(player.playerId, '2v2');
      }
      return { matched: false };
    }

    // Return all players from both parties
    const allPlayerEntries = [...party1.players, ...party2.players];
    return { matched: true, room, players: allPlayerEntries };
  }

  /**
   * Try to match 1 party (2 players) with 2 single players for 2v2
   * Returns { matched: true, room, players } if party + 2 singles found, otherwise { matched: false }
   */
  private async tryFormPartyWithSingles(): Promise<{ matched: boolean; room?: Room; players?: QueueEntry[] }> {
    const partyQueue = this.partyQueues['2v2'];
    const singlesQueue = this.queues['2v2'];

    if (partyQueue.length < 1 || singlesQueue.length < 2) {
      return { matched: false };
    }

    // Take first party and first 2 singles (FIFO)
    const party = partyQueue.shift()!;
    const single1 = singlesQueue.shift()!;
    const single2 = singlesQueue.shift()!;

    // Remove from tracking
    this.roomInPartyQueue.delete(party.roomId);
    for (const player of party.players) {
      this.playerInQueue.delete(player.playerId);
    }
    this.playerInQueue.delete(single1.playerId);
    this.playerInQueue.delete(single2.playerId);

    console.log(`[Matchmaking] 2v2 mixed match formed! Party: ${party.players.map(p => p.playerName).join(', ')}, Singles: ${single1.playerName}, ${single2.playerName}`);

    // Create new matchmaking room with timer enabled
    const room = createRoom('public', undefined, true);
    room.ownerId = party.players[0].playerId;

    // Add all 4 players to room
    // Party players = Team 0, Single players = Team 1
    const allPlayers = [
      ...party.players.map(p => ({ ...p, team: 0 })),
      { ...single1, team: 1 },
      { ...single2, team: 1 },
    ];

    for (let i = 0; i < allPlayers.length; i++) {
      const player = allPlayers[i];
      
      joinRoom(room, {
        id: player.playerId,
        name: player.playerName,
        seat: i,
        team: player.team,
        role: 'player',
        hand: [],
        taken: [],
        socketId: player.socketId
      } as any);
    }

    // Auto-start the game
    try {
      await startGame(room);
      console.log(`[Matchmaking] 2v2 mixed game auto-started for room ${room.id}`);
    } catch (error) {
      console.error(`[Matchmaking] Failed to start 2v2 mixed game for room ${room.id}:`, error);
      // If game start fails, re-queue party and singles
      partyQueue.push(party);
      singlesQueue.push(single1, single2);
      this.roomInPartyQueue.set(party.roomId, party.partyId);
      for (const player of party.players) {
        this.playerInQueue.set(player.playerId, '2v2');
      }
      this.playerInQueue.set(single1.playerId, '2v2');
      this.playerInQueue.set(single2.playerId, '2v2');
      return { matched: false };
    }

    // Return all players
    const allPlayerEntries = [...party.players, single1, single2];
    return { matched: true, room, players: allPlayerEntries };
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
