import { GameState, PlayerState, Event, Intent } from './types';
import { createDeck, initialDeal, applyIntent, isRoundOver, computeRoundScores, dealNextHands } from './engine';
import { randomUUID } from 'crypto';
import prisma from '../db';
import { appendGameEvent } from '../events/logger';

function generateAccessCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function generateInviteToken(): string {
  return randomUUID().replace(/-/g, '').slice(0, 32);
}

function generateReconnectToken(): string {
  return randomUUID().replace(/-/g, '').slice(0, 32);
}

export type RoomRole = 'PLAYER' | 'SPECTATOR';

export type RoomMember = {
  userId: string; // User.id or guestId
  name: string;
  roleInRoom: RoomRole;
  joinedAt: Date;
  socketId?: string; // Current socket connection
  isAuthenticated?: boolean; // True if authenticated user, false/undefined for guest
};

export type Room = {
  id: string;
  players: PlayerState[]; // Game players (for active game state)
  members: RoomMember[]; // Room members (lobby + game)
  state?: GameState;
  seq: number;
  // id of the room owner (player who created the room)
  ownerId?: string;
  // id of the current host (can change when host leaves)
  hostId?: string;
  // id(s) of the original host(s) from private room(s) (for party matchmaking)
  // Array to support 2 parties matching (each with their own host)
  originalHostIds?: string[];
  // room visibility
  visibility?: 'public' | 'private';
  // access code for private rooms (6 chars like "vpq6rc")
  accessCode?: string;
  // invite token for private rooms
  inviteToken?: string;
  // team assignment for 2v2 party (set by host before game start)
  teamAssignment?: {
    team0: string[]; // Array of 2 player userIds
    team1: string[]; // Array of 2 player userIds
  };
  // timer enabled (for turn time limit)
  timerEnabled?: boolean;
  // current turn timer (if active)
  turnTimer?: {
    playerId: string;
    expiresAt: number; // timestamp when timer expires
    timeoutId: NodeJS.Timeout;
  };
  // game mode and start time for match history
  mode?: '1v1' | '2v2';
  gameStartedAt?: Date;
  // flag to indicate room is in an active game (prevents auto-deletion)
  inGame?: boolean;
  // original room IDs for players (used for returning after game)
  // Maps playerId -> originalRoomId
  playerOriginalRooms?: Map<string, string>;
  // timestamp of last activity (for cleanup of inactive private rooms)
  lastActivity?: number;
};

const rooms: Map<string, Room> = new Map();

// Reconnect token storage: token -> { roomId, playerId, expiresAt }
type ReconnectTokenEntry = {
  roomId: string;
  playerId: string; // identityId
  expiresAt: number;
};
const reconnectTokens: Map<string, ReconnectTokenEntry> = new Map();

// Cleanup expired tokens periodically
setInterval(() => {
  const now = Date.now();
  for (const [token, entry] of reconnectTokens.entries()) {
    if (entry.expiresAt < now) {
      reconnectTokens.delete(token);
    }
  }
}, 30000); // Check every 30 seconds

export function createRoom(visibility?: 'public' | 'private', creatorId?: string, timerEnabled?: boolean): Room {
  const id = `room-${Math.random().toString(36).slice(2, 8)}`;
  const room: Room = { 
    id, 
    players: [],
    members: [],
    seq: 0,
    visibility: visibility || 'public',
    hostId: creatorId, // Creator becomes initial host
    ownerId: creatorId,
    timerEnabled: timerEnabled ?? false, // Default to false for private rooms
    lastActivity: Date.now(), // Track activity for cleanup
  };
  
  // Generate access credentials for private rooms
  if (visibility === 'private') {
    room.accessCode = generateAccessCode();
    room.inviteToken = generateInviteToken();
  }
  
  rooms.set(id, room);
  return room;
}

export async function startGame(room: Room, options?: { customTeams?: { team0: string[], team1: string[] } }) {
  // require 2 or 4 players to start (filter only PLAYER roles, not spectators)
  const activePlayers = room.players.filter(p => p.role === 'player');
  if (activePlayers.length !== 2 && activePlayers.length !== 4) {
    throw new Error('game_start_requires_2_or_4_players');
  }
  const gameId = randomUUID();
  const seed = randomUUID();
  const dealerSeat = 0;
  
  // Map players with team assignment (use only active players, exclude spectators)
  let players: PlayerState[];
  
  if (options?.customTeams && activePlayers.length === 4) {
    // Use custom team assignment for 2v2 party
    const { team0, team1 } = options.customTeams;
    
    // First, assign teams to all players
    const playersWithTeams = activePlayers.map((p) => {
      const isTeam0 = team0.includes(p.id);
      const team = isTeam0 ? 0 : 1;
      return { ...p, hand: [], taken: [], team };
    });
    
    // Separate into team arrays
    const team0Players = playersWithTeams.filter(p => p.team === 0);
    const team1Players = playersWithTeams.filter(p => p.team === 1);
    
    // Interleave teams: Team0, Team1, Team0, Team1
    players = [];
    for (let i = 0; i < Math.max(team0Players.length, team1Players.length); i++) {
      if (team0Players[i]) players.push(team0Players[i]);
      if (team1Players[i]) players.push(team1Players[i]);
    }
    
    // Assign seat numbers after interleaving
    players = players.map((p, idx) => ({ ...p, seat: idx }));
  } else {
    // Default: alternating teams (0, 1, 0, 1)
    players = activePlayers.map((p, idx) => ({ ...p, hand: [], taken: [], seat: idx, team: idx % 2 }));
  }
  
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
  room.gameStartedAt = new Date();
  
  // Mark room as in-game to prevent auto-deletion when players leave
  room.inGame = true;
  
  // Update activity timestamp
  updateRoomActivity(room.id);
  
  // Track original room for each player (for returning after game)
  if (!room.playerOriginalRooms) {
    room.playerOriginalRooms = new Map();
  }
  for (const player of state.players) {
    // Only set if not already set (to preserve party matchmaking mappings)
    if (!room.playerOriginalRooms.has(player.id)) {
      room.playerOriginalRooms.set(player.id, room.id);
    }
  }
  
  return state;
}

// Save match history to database when a match ends
async function updatePlayerStatistics(
  room: Room,
  team0Players: any[],
  team1Players: any[],
  winnerTeam: number,
  mode: string,
  finalScores: { team0: number; team1: number },
  zingsCounts: { team0: number; team1: number }
) {
  if (!process.env.DATABASE_URL) return;

  const allPlayers = [...team0Players, ...team1Players];
  const isHost = (playerId: string) => playerId === room.hostId;

  for (const player of allPlayers) {
    // Find matching member to check if authenticated
    const member = room.members?.find(m => m.userId === player.id);
    if (!member || !member.isAuthenticated) {
      continue; // Skip guests
    }

    const userId = player.id;
    const playerTeam = player.team;
    const isWinner = playerTeam === winnerTeam;
    const isSolo = mode === '1v1';
    const isDuo = mode === '2v2';

    // Calculate player's contribution
    const teamScore = playerTeam === 0 ? finalScores.team0 : finalScores.team1;
    const teamZings = playerTeam === 0 ? zingsCounts.team0 : zingsCounts.team1;
    
    // Count hosted games if:
    // 1. Room is private and player is host, OR
    // 2. Room is public (matchmaking) but player was originalHost (party matchmaking from private room)
    const isPrivateHost = room.visibility === 'private' && isHost(userId);
    const isPartyHost = room.visibility === 'public' && room.originalHostIds?.includes(userId);
    const shouldCountHosted = isPrivateHost || isPartyHost;

    try {
      // Update or create user stats
      const stats = await prisma.userStats.upsert({
        where: { userId },
        create: {
          userId,
          gamesPlayed: 1,
          soloWins: isSolo && isWinner ? 1 : 0,
          duoWins: isDuo && isWinner ? 1 : 0,
          pointsTaken: teamScore,
          zingsMade: teamZings,
          gamesHosted: shouldCountHosted ? 1 : 0,
          friendsAdded: 0,
        },
        update: {
          gamesPlayed: { increment: 1 },
          soloWins: { increment: isSolo && isWinner ? 1 : 0 },
          duoWins: { increment: isDuo && isWinner ? 1 : 0 },
          pointsTaken: { increment: teamScore },
          zingsMade: { increment: teamZings },
          gamesHosted: { increment: shouldCountHosted ? 1 : 0 },
        },
      });

      // Check for newly unlocked achievements
      await checkAndUnlockAchievements(userId, stats);
    } catch (err) {
      console.warn(`Failed to update statistics for user ${userId}:`, err);
    }
  }
}

async function checkAndUnlockAchievements(userId: string, stats: any) {
  const statMap = {
    GAMES_PLAYED: stats.gamesPlayed,
    SOLO_WINS: stats.soloWins,
    DUO_WINS: stats.duoWins,
    POINTS_TAKEN: stats.pointsTaken,
    ZINGS_MADE: stats.zingsMade,
    GAMES_HOSTED: stats.gamesHosted,
    FRIENDS_ADDED: stats.friendsAdded,
  };

  try {
    // Get all achievements
    const achievements = await prisma.achievement.findMany();

    // Get user's already unlocked achievements
    const unlockedAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true },
    });
    const unlockedIds = new Set(unlockedAchievements.map(a => a.achievementId));

    // Check each achievement
    for (const achievement of achievements) {
      // Skip if already unlocked
      if (unlockedIds.has(achievement.id)) continue;

      // Check if threshold is met
      const currentStat = statMap[achievement.type as keyof typeof statMap];
      if (currentStat >= achievement.threshold) {
        // Unlock achievement
        await prisma.userAchievement.create({
          data: {
            userId,
            achievementId: achievement.id,
          },
        });
        console.log(`[Achievement] User ${userId} unlocked: ${achievement.name}`);
      }
    }
  } catch (err) {
    console.warn(`Failed to check achievements for user ${userId}:`, err);
  }
}

// Save match history to database when a match ends
export async function saveMatchHistory(
  room: Room, 
  winnerTeam: number, 
  finalScores: { team0: number; team1: number },
  zingsPoints?: { team0: number; team1: number },
  zingsCounts?: { team0: number; team1: number }
) {
  if (!room.state || !process.env.DATABASE_URL) return;

  const mode = room.mode || (room.state.players.length === 2 ? '1v1' : '2v2');
  const duration = room.gameStartedAt 
    ? Math.floor((Date.now() - room.gameStartedAt.getTime()) / 1000) 
    : null;
  
  // Track total zings POINTS for display (default to 0 if not provided)
  const team0ZingsPoints = zingsPoints?.team0 || 0;
  const team1ZingsPoints = zingsPoints?.team1 || 0;
  
  // Track total zings COUNT for achievements (default to 0 if not provided)
  const team0ZingsCount = zingsCounts?.team0 || 0;
  const team1ZingsCount = zingsCounts?.team1 || 0;

  // Map players by team
  const team0Players = room.state.players.filter(p => p.team === 0);
  const team1Players = room.state.players.filter(p => p.team === 1);

  console.log('[Match History] Team 0 players:', team0Players.map(p => ({ id: p.id, name: p.name })));
  console.log('[Match History] Team 1 players:', team1Players.map(p => ({ id: p.id, name: p.name })));
  console.log('[Match History] Room members:', room.members?.map(m => ({ userId: m.userId, name: m.name, isAuthenticated: m.isAuthenticated })));

  // Helper to extract userId from player - check if user is authenticated
  const extractUserId = (playerId: string): string | null => {
    console.log('[Match History] Checking playerId:', playerId);
    
    // Find matching member in room
    const member = room.members?.find(m => m.userId === playerId);
    if (member) {
      console.log('[Match History] Found member:', member.userId, 'isAuthenticated:', member.isAuthenticated);
      // Return userId only if authenticated
      if (member.isAuthenticated) {
        console.log('[Match History] Authenticated user, returning userId:', playerId);
        return playerId;
      }
    }
    
    console.log('[Match History] Guest player, returning null');
    return null; // Guest player
  };

  try {
    const matchHistory = await prisma.matchHistory.create({
      data: {
        mode,
        winnerTeam,
        team0Score: finalScores.team0,
        team1Score: finalScores.team1,
        team0Zings: team0ZingsPoints,
        team1Zings: team1ZingsPoints,
        hostUserId: room.visibility === 'private' ? (room.hostId || null) : (room.originalHostIds?.[0] || null),
        team0Player1Id: team0Players[0] ? extractUserId(team0Players[0].id) : null,
        team0Player1Name: team0Players[0]?.name || 'Unknown',
        team0Player2Id: team0Players[1] ? extractUserId(team0Players[1].id) : null,
        team0Player2Name: team0Players[1]?.name || null,
        team1Player1Id: team1Players[0] ? extractUserId(team1Players[0].id) : null,
        team1Player1Name: team1Players[0]?.name || 'Unknown',
        team1Player2Id: team1Players[1] ? extractUserId(team1Players[1].id) : null,
        team1Player2Name: team1Players[1]?.name || null,
        duration,
      }
    });
    console.log('Match history saved successfully');

    // Update statistics for authenticated players
    await updatePlayerStatistics(
      room,
      team0Players,
      team1Players,
      winnerTeam,
      mode,
      finalScores,
      { team0: team0ZingsCount, team1: team1ZingsCount }
    );
  } catch (err) {
    console.warn('Failed to save match history:', err);
  }
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

  // Track cumulative zings per team for the match
  if (!(room as any)._matchZings) {
    (room as any)._matchZings = { team0: 0, team1: 0 };
  }
  (room as any)._matchZings.team0 += result.teams.team0.zings || 0;
  (room as any)._matchZings.team1 += result.teams.team1.zings || 0;

  // Track cumulative zing count (number of zings, not points) for achievements
  if (!(room as any)._matchZingsCount) {
    (room as any)._matchZingsCount = { team0: 0, team1: 0 };
  }
  (room as any)._matchZingsCount.team0 += result.teams.team0.zingsCount || 0;
  (room as any)._matchZingsCount.team1 += result.teams.team1.zingsCount || 0;

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

  // check match end logic with escalating thresholds
  let target = state.targetScore || 101;
  const t0 = state.scores.team0 || 0;
  const t1 = state.scores.team1 || 0;

  // If both teams exceeded the current target, raise the target by 50
  while (t0 >= target && t1 >= target) {
    target += 50;
    state.targetScore = target;
  }

  const matchUpdate = { type: 'match_update', actor: undefined, payload: { cumulative: { ...state.scores }, lastRound: result.scores, targetScore: state.targetScore } } as Event;
  room.seq++;
  await appendGameEvent(state.id, room.seq, matchUpdate.type, matchUpdate.actor, matchUpdate.payload);
  emitted.push(matchUpdate);

  // Now check if one team reached the (possibly updated) target while the other did not
  if ((t0 >= target && t1 < target) || (t1 >= target && t0 < target)) {
    state.matchOver = true;
    
    // Stop any active turn timer since game is over
    clearTurnTimer(room.id);
    
    const winner = t0 > t1 ? 0 : 1;
    const matchEnd = { type: 'match_end', actor: undefined, payload: { winnerTeam: winner, finalScores: { team0: t0, team1: t1 } } } as Event;
    room.seq++;
    await appendGameEvent(state.id, room.seq, matchEnd.type, matchEnd.actor, matchEnd.payload);
    emitted.push(matchEnd);

    // Save match history
    const matchZings = (room as any)._matchZings || { team0: 0, team1: 0 };
    const matchZingsCount = (room as any)._matchZingsCount || { team0: 0, team1: 0 };
    await saveMatchHistory(room, winner, { team0: t0, team1: t1 }, matchZings, matchZingsCount);
    
    // Mark room as not in game anymore (game is over)
    room.inGame = false;

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
  
  // Update activity timestamp on game action
  updateRoomActivity(room.id);
  
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

  // Also add to members if not present (for backward compatibility)
  const memberExists = room.members.some(m => m.userId === p.id);
  if (!memberExists) {
    // Pass socketId if available in PlayerState
    addMemberToRoom(room, p.id, p.name, (p as any).socketId);
  } else {
    // Update socketId for existing member if provided
    if ((p as any).socketId) {
      const member = room.members.find(m => m.userId === p.id);
      if (member) {
        member.socketId = (p as any).socketId;
      }
    }
  }
  
  // Update activity timestamp
  updateRoomActivity(room.id);
}

export function leaveRoom(room: Room, playerId: string) {
  room.players = room.players.filter((p) => p.id !== playerId);
  
  // Remove from members
  const memberIndex = room.members.findIndex(m => m.userId === playerId);
  if (memberIndex !== -1) {
    room.members.splice(memberIndex, 1);
  }

  // if owner left, reassign owner to first player if any
  if (room.ownerId === playerId) {
    room.ownerId = room.players[0]?.id || room.members[0]?.userId;
  }

  // if host left, reassign to random remaining member
  if (room.hostId === playerId) {
    const remainingMembers = room.members.filter(m => m.userId !== playerId);
    if (remainingMembers.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingMembers.length);
      room.hostId = remainingMembers[randomIndex].userId;
    } else {
      room.hostId = undefined;
    }
  }

  // Delete room if it should be deleted (checks inGame, members, and grace period)
  if (shouldDeleteRoom(room)) {
    deleteRoom(room.id);
  }
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

export function getRoomByAccessCode(code: string): Room | undefined {
  return Array.from(rooms.values()).find((r) => r.accessCode === code);
}

export function validateRoomAccess(room: Room, code?: string, inviteToken?: string): boolean {
  // Public rooms: no validation needed
  if (room.visibility === 'public') {
    return true;
  }
  
  // Private rooms: check code or token
  if (room.visibility === 'private') {
    if (code && room.accessCode === code) {
      return true;
    }
    if (inviteToken && room.inviteToken === inviteToken) {
      return true;
    }
    return false;
  }
  
  return false;
}

export function generateAndStoreReconnectToken(roomId: string, playerId: string): string {
  const token = generateReconnectToken();
  const expiresAt = Date.now() + 1800000; // 30 minutes (1800 seconds)
  reconnectTokens.set(token, { roomId, playerId, expiresAt });
  return token;
}

export function validateReconnectToken(token: string, roomId: string): string | null {
  const entry = reconnectTokens.get(token);
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    reconnectTokens.delete(token);
    return null;
  }
  if (entry.roomId !== roomId) return null;
  return entry.playerId; // Return the playerId (identityId)
}

/**
 * Clear all reconnect tokens for a specific room
 */
function clearReconnectTokensForRoom(roomId: string): void {
  const tokensToDelete: string[] = [];
  
  for (const [token, entry] of reconnectTokens.entries()) {
    if (entry.roomId === roomId) {
      tokensToDelete.push(token);
    }
  }
  
  for (const token of tokensToDelete) {
    reconnectTokens.delete(token);
  }
}

export function getAllRooms(): Room[] {
  return Array.from(rooms.values());
}

// ============================================
// TASK 3: Extended Room Management Functions
// ============================================

/**
 * Add member to room
 * Default role: PLAYER
 */
export function addMemberToRoom(room: Room, userId: string, name: string, socketId?: string, isAuthenticated?: boolean): RoomMember {
  // Check if already a member
  const existing = room.members.find(m => m.userId === userId);
  if (existing) {
    // Update socket if provided
    if (socketId) existing.socketId = socketId;
    // Update isAuthenticated if provided
    if (isAuthenticated !== undefined) existing.isAuthenticated = isAuthenticated;
    
    // Also update legacy players array if exists
    const legacyPlayer = room.players.find(p => p.id === userId);
    if (legacyPlayer && socketId) {
      legacyPlayer.socketId = socketId;
      legacyPlayer.connected = true;
    }
    
    // Update activity timestamp
    updateRoomActivity(room.id);
    
    return existing;
  }

  const member: RoomMember = {
    userId,
    name,
    roleInRoom: 'PLAYER',
    joinedAt: new Date(),
    socketId,
    isAuthenticated,
  };

  room.members.push(member);
  
  // Update activity timestamp for new member
  updateRoomActivity(room.id);

  // Sync to legacy players array (for backwards compatibility)
  const existingLegacyPlayer = room.players.find(p => p.id === userId);
  if (!existingLegacyPlayer) {
    room.players.push({
      id: userId,
      name,
      role: 'player',
      hand: [],
      taken: [],
      socketId,
      connected: true,
      seat: room.players.length,
      team: 0,
    });
  } else {
    // Update existing legacy player
    existingLegacyPlayer.name = name;
    existingLegacyPlayer.socketId = socketId;
    existingLegacyPlayer.connected = true;
  }

  // If this is the first member and no host, make them host
  if (!room.hostId) {
    room.hostId = userId;
  }

  return member;
}

/**
 * Set member role (PLAYER or SPECTATOR)
 * Only host can change roles
 */
export function setMemberRole(
  roomId: string, 
  targetUserId: string, 
  newRole: RoomRole, 
  requesterId: string
): RoomMember {
  const room = rooms.get(roomId);
  if (!room) {
    throw new Error('ROOM_NOT_FOUND');
  }

  // Validate: requester must be host
  if (room.hostId !== requesterId) {
    throw new Error('NOT_HOST');
  }

  const member = room.members.find(m => m.userId === targetUserId);
  if (!member) {
    throw new Error('MEMBER_NOT_FOUND');
  }

  member.roleInRoom = newRole;
  
  // Sync with legacy room.players array
  const legacyPlayer = room.players.find(p => p.id === targetUserId);
  if (legacyPlayer) {
    legacyPlayer.role = newRole === 'PLAYER' ? 'player' : 'spectator';
  }
  
  return member;
}

/**
 * Kick member from room
 * Only host can kick
 * Host cannot kick themselves (they should leave instead)
 */
export function kickMember(
  roomId: string, 
  targetUserId: string, 
  requesterId: string
): RoomMember {
  const room = rooms.get(roomId);
  if (!room) {
    throw new Error('ROOM_NOT_FOUND');
  }

  // Validate: requester must be host
  if (room.hostId !== requesterId) {
    throw new Error('NOT_HOST');
  }

  // Validate: host cannot kick themselves
  if (targetUserId === requesterId) {
    throw new Error('CANNOT_KICK_SELF');
  }

  const memberIndex = room.members.findIndex(m => m.userId === targetUserId);
  if (memberIndex === -1) {
    throw new Error('MEMBER_NOT_FOUND');
  }

  const [kickedMember] = room.members.splice(memberIndex, 1);

  // Also remove from players array if present
  room.players = room.players.filter(p => p.id !== targetUserId);

  // Check if room should be deleted
  if (shouldDeleteRoom(room)) {
    deleteRoom(roomId);
  } else {
    // Clear team assignment when member count changes
    room.teamAssignment = undefined;
  }

  return kickedMember;
}

/**
 * Member leaves room
 * If host leaves, transfer host to random remaining member
 * If room becomes empty, delete room
 * 
 * Returns: { wasHost: boolean, newHostId?: string, roomDeleted: boolean }
 */
export function leaveMemberRoom(
  roomId: string, 
  userId: string
): { wasHost: boolean; newHostId?: string; roomDeleted: boolean } {
  const room = rooms.get(roomId);
  if (!room) {
    throw new Error('ROOM_NOT_FOUND');
  }

  const memberIndex = room.members.findIndex(m => m.userId === userId);
  if (memberIndex === -1) {
    throw new Error('MEMBER_NOT_FOUND');
  }

  const wasHost = room.hostId === userId;

  // Remove member
  room.members.splice(memberIndex, 1);

  // Remove from players array if present
  room.players = room.players.filter(p => p.id !== userId);

  // Remove from owner if they were owner
  if (room.ownerId === userId) {
    room.ownerId = room.members[0]?.userId;
  }

  let newHostId: string | undefined;

  // Check if room should be deleted
  if (shouldDeleteRoom(room)) {
    deleteRoom(roomId);
    return { wasHost, roomDeleted: true };
  }

  // Clear team assignment when member count changes
  room.teamAssignment = undefined;

  // If host left, transfer to random remaining member
  if (wasHost) {
    const remainingMembers = room.members.filter(m => m.userId !== userId);
    if (remainingMembers.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingMembers.length);
      newHostId = remainingMembers[randomIndex].userId;
      room.hostId = newHostId;
    } else {
      room.hostId = undefined;
    }
  }

  return { wasHost, newHostId, roomDeleted: false };
}

/**
 * Update room's last activity timestamp
 */
export function updateRoomActivity(roomId: string): void {
  const room = rooms.get(roomId);
  if (room) {
    room.lastActivity = Date.now();
  }
}

/**
 * Check if room should be deleted based on activity and state
 */
export function shouldDeleteRoom(room: Room): boolean {
  // Never delete if game is active
  if (room.inGame) return false;
  
  // Never delete if has members
  if (room.members.length > 0) return false;
  
  // Private rooms get 30 minute grace period for players to return
  if (room.visibility === 'private') {
    const gracePeriod = 30 * 60 * 1000; // 30 minutes
    const timeSinceActivity = Date.now() - (room.lastActivity || 0);
    return timeSinceActivity > gracePeriod;
  }
  
  // Public/matchmaking rooms can be deleted immediately when empty
  return true;
}

/**
 * Delete room from memory
 * Called when room becomes empty
 */
export function deleteRoom(roomId: string): void {
  // Clear turn timer if active
  clearTurnTimer(roomId);
  rooms.delete(roomId);
  // Also clear all reconnect tokens for this room
  clearReconnectTokensForRoom(roomId);
}

/**
 * Cleanup inactive rooms (scheduled job)
 */
export function cleanupInactiveRooms(): number {
  let deletedCount = 0;
  for (const [roomId, room] of rooms.entries()) {
    if (shouldDeleteRoom(room)) {
      console.log(`[Cleanup] Deleting inactive room ${roomId} (visibility: ${room.visibility}, lastActivity: ${new Date(room.lastActivity || 0).toISOString()})`);
      deleteRoom(roomId);
      deletedCount++;
    }
  }
  if (deletedCount > 0) {
    console.log(`[Cleanup] Deleted ${deletedCount} inactive rooms`);
  }
  return deletedCount;
}

/**
 * Get all rooms map (for debugging)
 */
export function getAllRoomsMap(): Map<string, Room> {
  return rooms;
}

/**
 * Count PLAYER role members in room
 */
export function countPlayers(roomId: string): number {
  const room = rooms.get(roomId);
  if (!room) return 0;

  return room.members.filter(m => m.roleInRoom === 'PLAYER').length;
}

/**
 * Check if room can start 1v1 game
 * Requires exactly 2 PLAYER role members
 */
export function canStart1v1(roomId: string): boolean {
  return countPlayers(roomId) === 2;
}

/**
 * Check if room can start 2v2 game
 * Requires exactly 4 PLAYER role members
 */
export function canStart2v2(roomId: string): boolean {
  return countPlayers(roomId) === 4;
}

/**
 * Get user's current room (if any)
 * Returns roomId or null
 */
export function getUserCurrentRoom(userId: string): string | null {
  for (const room of rooms.values()) {
    if (room.members.some(m => m.userId === userId)) {
      return room.id;
    }
  }
  return null;
}

/**
 * Get all PLAYER role members in room
 */
export function getPlayersInRoom(roomId: string): RoomMember[] {
  const room = rooms.get(roomId);
  if (!room) return [];

  return room.members.filter(m => m.roleInRoom === 'PLAYER');
}

/**
 * Check if user is host of room
 */
export function isHost(roomId: string, userId: string): boolean {
  const room = rooms.get(roomId);
  if (!room) return false;

  return room.hostId === userId;
}

/**
 * Get member by userId
 */
export function getMember(roomId: string, userId: string): RoomMember | undefined {
  const room = rooms.get(roomId);
  if (!room) return undefined;

  return room.members.find(m => m.userId === userId);
}

/**
 * Set team assignment for 2v2 party (host only)
 * Validates: 4 unique PLAYER members, 2 per team
 */
export function setTeamAssignment(
  roomId: string,
  team0: string[], // Array of 2 userIds
  team1: string[], // Array of 2 userIds
  requesterId: string
): void {
  const room = rooms.get(roomId);
  if (!room) {
    throw new Error('ROOM_NOT_FOUND');
  }

  // Validate host
  if (room.hostId !== requesterId) {
    throw new Error('NOT_HOST');
  }

  // Validate arrays
  if (!Array.isArray(team0) || !Array.isArray(team1)) {
    throw new Error('INVALID_TEAM_FORMAT');
  }

  if (team0.length !== 2 || team1.length !== 2) {
    throw new Error('INVALID_TEAM_SIZE');
  }

  // Get all PLAYER members
  const players = room.members.filter(m => m.roleInRoom === 'PLAYER');
  
  if (players.length !== 4) {
    throw new Error('NEED_EXACTLY_4_PLAYERS');
  }

  // Check all team members are unique
  const allTeamMembers = [...team0, ...team1];
  const uniqueMembers = new Set(allTeamMembers);
  
  if (uniqueMembers.size !== 4) {
    throw new Error('DUPLICATE_TEAM_MEMBERS');
  }

  // Validate all team members are PLAYER in room
  const playerIds = new Set(players.map(p => p.userId));
  
  for (const userId of allTeamMembers) {
    if (!playerIds.has(userId)) {
      throw new Error('TEAM_MEMBER_NOT_PLAYER');
    }
  }

  // Set team assignment
  room.teamAssignment = { team0, team1 };
}

/**
 * Get current team assignment for room
 */
export function getTeamAssignment(roomId: string): { team0: string[]; team1: string[] } | undefined {
  const room = rooms.get(roomId);
  return room?.teamAssignment;
}

/**
 * Clear team assignment (used when members change)
 */
export function clearTeamAssignment(roomId: string): void {
  const room = rooms.get(roomId);
  if (room) {
    room.teamAssignment = undefined;
  }
}

/**
 * Start turn timer for current player
 * @param roomId Room ID
 * @param playerId Player who needs to play
 * @param onTimeout Callback when timer expires
 * @param duration Timer duration in milliseconds (default 12000ms = 12s)
 */
export function startTurnTimer(
  roomId: string,
  playerId: string,
  onTimeout: () => void,
  duration: number = 12000
): void {
  const room = rooms.get(roomId);
  if (!room || !room.timerEnabled) return;

  // Clear existing timer if any
  clearTurnTimer(roomId);

  const expiresAt = Date.now() + duration;
  const timeoutId = setTimeout(() => {
    // Timer expired - execute timeout callback
    onTimeout();
    // Clear timer reference
    if (room.turnTimer) {
      room.turnTimer = undefined;
    }
  }, duration);

  room.turnTimer = {
    playerId,
    expiresAt,
    timeoutId,
  };
}

/**
 * Clear active turn timer
 */
export function clearTurnTimer(roomId: string): void {
  const room = rooms.get(roomId);
  if (!room || !room.turnTimer) return;

  clearTimeout(room.turnTimer.timeoutId);
  room.turnTimer = undefined;
}

/**
 * Get remaining time for current turn (in milliseconds)
 */
export function getTurnTimeRemaining(roomId: string): number | null {
  const room = rooms.get(roomId);
  if (!room || !room.turnTimer) return null;

  const remaining = room.turnTimer.expiresAt - Date.now();
  return Math.max(0, remaining);
}

