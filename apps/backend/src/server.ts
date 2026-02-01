import './env';
import express, { type Request, type Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import pino from 'pino';
import { createRoom, joinRoom, startGame, getRoom, handleIntent, leaveRoom, removePlayerFromAllRooms, getRoomByAccessCode, validateRoomAccess, generateAndStoreReconnectToken, validateReconnectToken, getAllRooms, addMemberToRoom, setMemberRole, kickMember, leaveMemberRoom, countPlayers, canStart1v1, canStart2v2, getUserCurrentRoom, isHost, RoomRole, deleteRoom, setTeamAssignment, getTeamAssignment, getPlayersInRoom, startTurnTimer, clearTurnTimer, getTurnTimeRemaining, saveMatchHistory, cleanupInactiveRooms, Room } from './game/roomManager';
import { matchmakingManager } from './game/matchmakingManager';
import { InviteService } from './services/InviteService';
import * as inviteRepo from './services/inviteRepository';
import cors from 'cors';
import authRoutes from './auth/routes';
import friendRoutes, { setActiveUsers } from './friends/routes';
import matchRoutes from './matches/routes';
import achievementRoutes from './achievements/routes';
import leaderboardRoutes from './leaderboard/routes';
import { scheduleLeaderboardUpdates } from './leaderboard/service';
import { verifyToken } from './auth/jwt';
import { prisma } from './db/prisma';

const logger = pino();

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      /^http:\/\/localhost(:\d+)?$/,           // localhost development
      'https://www.igrajzing.me',               // production domain
      'https://igrajzing.me',                   // production domain (www-less)
      'https://zing-frontend.vercel.app',       // Vercel preview/production
    ];
    
    if (!origin) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      callback(null, true);
    } else if (allowedOrigins.some(allowed => 
      typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
const server = http.createServer(app);

const PORT = process.env.BACKEND_PORT || 4000;

// Simple health endpoint
app.get('/health', (_req: Request, res: Response) => res.status(200).json({ ok: true }));

// Auth routes
app.use('/api/auth', authRoutes);

// Friend routes
app.use('/api/friends', friendRoutes);

// Match history routes
app.use('/api/matches', matchRoutes);

// Achievement routes
app.use('/api/achievements', achievementRoutes);

// Leaderboard routes
app.use('/api/leaderboard', leaderboardRoutes);

// Track active users globally
const activeUsers = new Set<string>();

// Pass activeUsers to friends routes
setActiveUsers(activeUsers);

(async function bootstrap() {
  server.listen(PORT, () => {
    logger.info({ port: PORT }, 'Backend server started');
  });
  
  // Schedule leaderboard updates
  scheduleLeaderboardUpdates();
  
  // Schedule periodic cleanup of inactive private rooms (every 10 minutes)
  setInterval(() => {
    const deletedCount = cleanupInactiveRooms();
    if (deletedCount > 0) {
      logger.info({ deletedCount }, 'Cleaned up inactive private rooms');
    }
  }, 10 * 60 * 1000); // 10 minutes

  const io = new Server(server, {
    cors: { origin: '*' }
  });

  // Initialize InviteService with dependencies
  const inviteService = new InviteService({
    roomExists: (roomId) => getRoom(roomId) !== undefined,
    getUserCurrentRoom: (userId) => getUserCurrentRoom(userId),
    areFriends: async (userId1, userId2) => {
      const friendship = await prisma.friendship.findFirst({
        where: {
          OR: [
            { requesterId: userId1, addresseeId: userId2, status: 'ACCEPTED' },
            { requesterId: userId2, addresseeId: userId1, status: 'ACCEPTED' },
          ],
        },
      });
      return !!friendship;
    },
  });

  // Setup basic socket handlers
  io.on('connection', (socket) => {
    const { id } = socket;
    logger.info({ clientId: id }, 'Client connected');

    /**
     * Helper function to start turn timer with auto-play on timeout
     */
    const startTurnTimerWithAutoPlay = (roomId: string) => {
      const room = getRoom(roomId);
      if (!room || !room.state || !room.timerEnabled || !room.state.currentTurnPlayerId) return;
      
      // Don't start timer if game is already over
      if (room.state.matchOver) return;

      const playerId = room.state.currentTurnPlayerId;
      startTurnTimer(roomId, playerId, async () => {
        // Timer expired - auto-play first card
        logger.info({ roomId, playerId: room.state?.currentTurnPlayerId }, 'Turn timer expired - auto-playing first card');
        
        const currentPlayer = room.state?.players.find(p => p.id === room.state?.currentTurnPlayerId);
        if (currentPlayer && currentPlayer.hand.length > 0) {
          const firstCard = currentPlayer.hand[0];
          const autoEv = await handleIntent(room, { type: 'play_card', playerId: currentPlayer.id, cardId: firstCard });
          if (Array.isArray(autoEv)) {
            for (const e of autoEv) io.to(roomId).emit('game_event', e);
          } else if (autoEv) {
            io.to(roomId).emit('game_event', autoEv);
          }
          if (room.state) {
            io.to(roomId).emit('game_state', room.state);
            // Start timer for next player only if game is not over
            if (!room.state.matchOver) {
              startTurnTimerWithAutoPlay(roomId);
            }
          }
        }
      }, 12000, (expiresAt) => {
        io.to(roomId).emit('turn_timer_started', {
          playerId,
          duration: 12000,
          expiresAt,
        });
      });
    };

    /**
     * Helper function to emit timer event with delay
     * Ensures all clients received game_state before timer event
     */
    const emitTimerEventDelayed = (roomId: string, delay = 100) => {
      setTimeout(() => {
        const room = getRoom(roomId);
        if (room?.state?.currentTurnPlayerId && room.timerEnabled && !room.state.matchOver) {
          io.to(roomId).emit('turn_timer_started', { 
            playerId: room.state.currentTurnPlayerId,
            duration: 12000,
            expiresAt: Date.now() + 12000
          });
        }
      }, delay);
    };

    socket.on('auth', async (payload) => {
      const { token, guestId, name, role } = payload || {};
      
      // Try to authenticate with token first
      if (token) {
        const decoded = verifyToken(token);
        if (decoded) {
          // Load user from database
          const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
          });
          if (user) {
            socket.data.identity = { type: 'user', id: user.id };
            socket.data.displayName = user.username;
            socket.data.user = { id: user.id, email: user.email, username: user.username, role: role || 'player' };
            // Mark user as active
            activeUsers.add(user.id);
            socket.join('lobby');
            socket.emit('auth_ok', { id: user.id, username: user.username, type: 'user', role });
            io.to('lobby').emit('lobby_update', { time: new Date().toISOString() });
            // Broadcast user online status
            io.emit('user_online', { userId: user.id });
            return;
          }
        }
      }
      
      // Fallback to guest auth
      if (!name) {
        socket.emit('auth_error', { reason: 'name_required' });
        return;
      }
      socket.data.identity = { type: 'guest', id: guestId };
      socket.data.displayName = name;
      socket.data.user = { id: guestId, name, role: role || 'player' };
      socket.join('lobby');
      socket.emit('auth_ok', { id: guestId, name, role, type: 'guest' });
      io.to('lobby').emit('lobby_update', { time: new Date().toISOString() });
    });

    socket.on('disconnect', () => {
      // Remove user from active set
      if (socket.data.identity?.type === 'user') {
        const userId = socket.data.identity.id;
        activeUsers.delete(userId);
        // Broadcast user offline status
        io.emit('user_offline', { userId });
      }
      logger.info({ clientId: id }, 'Client disconnected');
    });

    // MATCHMAKING EVENTS
    socket.on('find_game', async (payload: any) => {
      const mode = payload?.mode as '1v1' | '2v2';
      if (!mode || (mode !== '1v1' && mode !== '2v2')) {
        socket.emit('matchmaking_error', { reason: 'invalid_mode' });
        return;
      }

      let playerName = socket.data.displayName ?? 'guest';
      const playerId = socket.data.identity?.id ?? socket.id;
      
      // Add Guest- prefix for non-authenticated users
      if (socket.data.identity?.type !== 'user' && !playerName.startsWith('Guest-')) {
        playerName = `Guest-${playerName}`;
      }

      logger.info({ clientId: socket.id, playerId, playerName, mode }, 'find_game: player joining queue');

      try {
        const result = await matchmakingManager.addToQueue(mode, playerId, playerName, socket.id);

        if (result.matched && result.room && result.players) {
          // Match found! Notify all matched players
          logger.info({ 
            roomId: result.room.id, 
            mode, 
            players: result.players.map(p => p.playerName) 
          }, 'find_game: match formed, notifying players');

          for (const player of result.players) {
            const playerSocket = io.sockets.sockets.get(player.socketId);
            if (playerSocket) {
              playerSocket.join(result.room.id);
              
              // Generate reconnect token for the new matchmaking room
              const reconnectToken = generateAndStoreReconnectToken(result.room.id, player.playerId);
              
              playerSocket.emit('match_found', {
                roomId: result.room.id,
                mode,
                players: result.room.players.map((p: any) => ({ 
                  id: p.id, 
                  name: p.name, 
                  team: p.team 
                }))
              });
              
              // Send reconnect token for the matchmaking room
              playerSocket.emit('reconnect_token', { roomId: result.room.id, token: reconnectToken });
            }
          }

          // Emit initial game state to all players in the room
          if (result.room.state) {
            io.to(result.room.id).emit('game_state', { state: result.room.state });
            
            // Emit hands_dealt event so clients know game has started
            const dealt: Record<string, string[]> = {};
            for (const p of result.room.state.players) {
              dealt[p.id] = [...p.hand];
            }
            io.to(result.room.id).emit('game_event', { 
              type: 'hands_dealt', 
              actor: undefined, 
              payload: { dealt, handNumber: result.room.state.handNumber } 
            });
            
            io.to(result.room.id).emit('room_update', { 
              roomId: result.room.id, 
              players: result.room.players.map((p: any) => ({ 
                id: p.id, 
                name: p.name, 
                role: p.role, 
                taken: p.taken 
              })), 
              ownerId: result.room.ownerId,
              accessCode: result.room.accessCode,
              inviteToken: result.room.inviteToken
            });

            // Start turn timer for first player (matchmaking rooms always have timer)
            startTurnTimerWithAutoPlay(result.room.id);
            
            // Emit timer event with delay to ensure all clients received game_state
            emitTimerEventDelayed(result.room.id);
          }
        } else {
          // Added to queue, waiting for more players
          socket.emit('queue_joined', { mode, position: matchmakingManager.getPlayerQueueStatus(playerId).position });
        }
      } catch (error) {
        logger.error({ error }, 'find_game: error during matchmaking');
        socket.emit('matchmaking_error', { reason: 'server_error' });
      }
    });

    socket.on('cancel_find_game', () => {
      const playerId = socket.data.identity?.id ?? socket.id;
      logger.info({ clientId: socket.id, playerId }, 'cancel_find_game: removing from queue');
      
      matchmakingManager.removeFromQueue(playerId);
      socket.emit('queue_left', {});
    });

    /**
     * Cancel party matchmaking (for 2v2 random)
     * Payload: { roomId: string }
     */
    socket.on('cancel_party_queue', ({ roomId }: { roomId: string }) => {
      const userId = socket.data.identity?.id;
      
      if (!userId) {
        socket.emit('room_error', { reason: 'NOT_AUTHENTICATED' });
        return;
      }

      // Validate host (only host can cancel matchmaking)
      if (!isHost(roomId, userId)) {
        socket.emit('room_error', { reason: 'NOT_HOST', message: 'Only host can cancel matchmaking' });
        return;
      }

      const wasInQueue = matchmakingManager.removePartyFromQueue(roomId);
      
      if (wasInQueue) {
        // Reset inGame flag when leaving queue
        const room = getRoom(roomId);
        if (room) {
          room.inGame = false;
        }
        
        io.to(roomId).emit('queue_left', { 
          message: 'Matchmaking zaustavljen od strane domaćina' 
        });
        logger.info({ roomId, hostId: userId }, '');
      } else {
        socket.emit('room_error', { reason: 'NOT_IN_QUEUE', message: 'Party is not in matchmaking queue' });
      }
    });

    // PRIVATE ROOM CREATION (keep for invite-based private games)
    socket.on('create_private_room', (payload: any) => {
      const timerEnabled = false; // Default to false, host can toggle later
      const room = createRoom('private', undefined, timerEnabled);
      let creatorName = socket.data.displayName ?? payload?.name ?? 'guest';
      const creatorId = socket.data.identity?.id ?? socket.id;
      
      // Add Guest- prefix for non-authenticated users
      if (socket.data.identity?.type !== 'user' && !creatorName.startsWith('Guest-')) {
        creatorName = `Guest-${creatorName}`;
      }
      
      logger.info({ clientId: socket.id, creatorName, accessCode: room.accessCode }, 'create_private_room: creating private room');
      
      let finalName = creatorName;
      let counter = 2;
      while (room.players.some((p: any) => p.name === finalName)) {
        finalName = `${creatorName}#${counter}`;
        counter++;
      }
      
      joinRoom(room, { id: creatorId, name: finalName, seat: 0, role: socket.data.user?.role ?? 'player', team: 0, hand: [], taken: [] });
      room.ownerId = creatorId;
      socket.join(room.id);
      
      // First emit room_created so frontend navigates to RoomScreen
      socket.emit('room_created', { 
        roomId: room.id, 
        visibility: 'private', 
        accessCode: room.accessCode, 
        inviteToken: room.inviteToken,
        timerEnabled: room.timerEnabled
      });
      
      // Then emit room_update with player data so frontend receives it after navigation
      io.to(room.id).emit('room_update', { 
        roomId: room.id, 
        players: room.players.map((p) => ({ id: p.id, name: p.name ?? p.id, role: p.role, taken: p.taken })), 
        ownerId: room.ownerId,
        timerEnabled: room.timerEnabled,
        accessCode: room.accessCode,
        inviteToken: room.inviteToken
      });
    });

    socket.on('join_room', ({ roomId, code, inviteToken, guestId, name }: any) => {
      logger.info({ clientId: socket.id, roomId, code, inviteToken: inviteToken?.slice(0, 8) + '...', guestId }, 'join_room: received');
      // If code provided without roomId, try to find room by access code

      let actualRoomId = roomId;
      if (!actualRoomId && code) {
        const foundRoom = getRoomByAccessCode(code);
        if (foundRoom) {
          actualRoomId = foundRoom.id;
        }
      }
      
      if (!actualRoomId) {
        socket.emit('join_error', { reason: 'invalid_room' });
        return;
      }
      
      socket.join(actualRoomId);
      const room = getRoom(actualRoomId);
      if (room) {
        logger.info({ 
          clientId: socket.id, 
          roomId: actualRoomId, 
          visibility: room.visibility,
          roomAccessCode: room.accessCode,
          roomInviteToken: room.inviteToken?.slice(0, 8) + '...',
          providedCode: code,
          providedInviteToken: inviteToken?.slice(0, 8) + '...' 
        }, 'join_room: checking access');
        
        // Validate access for private rooms
        if (!validateRoomAccess(room, code, inviteToken)) {
          logger.error({ 
            clientId: socket.id, 
            roomId: actualRoomId, 
            visibility: room.visibility,
            code,
            inviteToken: inviteToken?.slice(0, 8) + '...' 
          }, 'join_room: access denied');
          socket.emit('join_error', { reason: 'access_denied', message: 'Invalid code or token' });
          return;
        }
        
        logger.info({ clientId: socket.id, roomId: actualRoomId }, 'join_room: access granted');
        
        // Get player name and add Guest- prefix for non-authenticated users
        let useName = socket.data.displayName ?? name ?? 'guest';
        if (socket.data.identity?.type !== 'user' && !useName.startsWith('Guest-')) {
          useName = `Guest-${useName}`;
        }
        
        // Use socket.data.identity.id for authenticated users, otherwise guestId, otherwise socket.id
        const playerId = socket.data.identity?.id ?? guestId ?? socket.id;
        
        logger.info({ clientId: socket.id, roomId: actualRoomId, guestId, playerId, name, useName, currentPlayers: room.players.map(p => p.id) }, 'join_room: processing join');
        
        // Check if player with this identity already exists in the room
        const existingPlayer = room.players.find((p: any) => p.id === playerId);
        
        if (existingPlayer) {
          // Update existing player - but preserve any existing name modifications (like duplicates with #2 suffix)
          logger.info({ playerId, currentName: existingPlayer.name, newName: useName }, 'join_room: updating existing player');
          existingPlayer.socketId = socket.id;
          // Only update name if the existing name is exactly the same as what they originally requested
          // If it was modified (e.g., had a suffix added), keep it
          if (existingPlayer.name === useName) {
            existingPlayer.name = useName;
          }
          // If names differ, it means this player was given a suffix (like #2), so keep that
          
          // Also update member in members array to ensure socketId is synced
          const isAuthenticated = socket.data.identity?.type === 'user';
          addMemberToRoom(room, playerId, existingPlayer.name, socket.id, isAuthenticated);
        } else {
          // Ensure unique name in room
          let finalName = useName;
          let counter = 2;
          const existingNames = room.players.map((p: any) => p.name);
          logger.info({ playerId, useName, existingNames }, 'join_room: checking for duplicate names');
          while (room.players.some((p: any) => p.name === finalName)) {
            logger.info({ playerId, finalName, existingNames }, 'join_room: name collision detected');
            finalName = `${useName}#${counter}`;
            counter++;
          }
          
          logger.info({ playerId, finalName }, 'join_room: adding new player');
          joinRoom(room, { 
            id: playerId, 
            name: finalName, 
            seat: room.players.length, 
            role: socket.data.user?.role ?? 'player', 
            team: 0, 
            hand: [], 
            taken: [] 
          });
          
          // Also add to members array for invite system tracking
          const isAuthenticated = socket.data.identity?.type === 'user';
          addMemberToRoom(room, playerId, finalName, socket.id, isAuthenticated);
        }
        
        logger.info({ roomId: actualRoomId, playersAfterJoin: room.players.map((p: any) => ({ id: p.id, name: p.name })) }, 'join_room: emitting room_update');
        io.to(actualRoomId).emit('room_update', { roomId: actualRoomId, players: room.players.map((p: any) => ({ id: p.id, name: p.name ?? p.id, role: p.role, taken: p.taken })), ownerId: room.ownerId, accessCode: room.accessCode, inviteToken: room.inviteToken, timerEnabled: room.timerEnabled });
        
        // If game has already started (e.g., matchmaking auto-start), send game state to this player
        if (room.state) {
          socket.emit('game_state', room.state);
        }
        
        // Generate and send reconnect token to client
        const reconnectToken = generateAndStoreReconnectToken(actualRoomId, playerId);
        socket.emit('reconnect_token', { roomId: actualRoomId, token: reconnectToken });
      } else {
        socket.emit('join_error', { reason: 'room_not_found' });
      }
    });

    socket.on('rejoin_room', async ({ roomId, reconnectToken }: any) => {
      logger.info({ clientId: socket.id, roomId, reconnectToken: reconnectToken?.slice(0, 8) + '...' }, 'rejoin_room: attempting rejoin');
      
      const room = getRoom(roomId);
      if (!room) {
        logger.error({ roomId }, 'rejoin_room: room not found');
        socket.emit('rejoin_error', { reason: 'room_not_found' });
        return;
      }

      // Validate reconnect token
      const playerId = validateReconnectToken(reconnectToken, roomId);
      if (!playerId) {
        logger.error({ roomId, reconnectToken: reconnectToken?.slice(0, 8) + '...' }, 'rejoin_room: invalid or expired token');
        socket.emit('rejoin_error', { reason: 'invalid_token' });
        return;
      }

      // Find member by playerId in the room (check members first, fallback to legacy players)
      const member = room.members?.find((m: any) => m.userId === playerId);
      const player = room.players.find((p: any) => p.id === playerId);
      
      if (!member && !player) {
        logger.error({ roomId, playerId }, 'rejoin_room: player not found in room');
        socket.emit('rejoin_error', { reason: 'player_not_found' });
        return;
      }

      // Update member/player connection
      logger.info({ roomId, playerId, newSocketId: socket.id }, 'rejoin_room: reconnecting player');
      
      if (member) {
        member.socketId = socket.id;
      }
      if (player) {
        player.socketId = socket.id;
        player.connected = true;
      }
      
      socket.join(roomId);
      
      // Get name from member or player
      const playerName = member?.name || player?.name || 'Player';
      const playerRole = player?.role || 'player';
      
      // Determine identity type: check if this playerId corresponds to an authenticated user
      let identityType: 'user' | 'guest' = 'guest';
      try {
        const user = await prisma.user.findUnique({ where: { id: playerId } });
        if (user) {
          identityType = 'user';
        }
      } catch (err) {
        // If lookup fails, default to 'guest'
      }
      
      // Set socket identity to the rejoined player
      socket.data.identity = { type: identityType, id: playerId };
      socket.data.displayName = playerName;
      socket.data.user = { id: playerId, name: playerName, role: playerRole };
      
      // Send auth_ok to confirm identity
      socket.emit('auth_ok', { id: playerId, name: playerName, role: playerRole, type: identityType });

      // Send reconnect token again for next refresh
      const newReconnectToken = generateAndStoreReconnectToken(roomId, playerId);
      socket.emit('reconnect_token', { roomId, token: newReconnectToken });

      // Send current game state if available
      if (room.state) {
        socket.emit('game_state', room.state);
      }

      // Notify all players in room (include both members and legacy players)
      io.to(roomId).emit('room_update', { 
        roomId, 
        players: room.players.map((p: any) => ({ id: p.id, name: p.name ?? p.id, role: p.role, taken: p.taken, connected: p.connected ?? true })),
        members: room.members?.map(m => ({
          userId: m.userId,
          name: m.name,
          roleInRoom: m.roleInRoom,
          joinedAt: m.joinedAt,
        })) || [],
        hostId: room.hostId,
        accessCode: room.accessCode,
        inviteToken: room.inviteToken,
        ownerId: room.ownerId 
      });

      logger.info({ roomId, playerId }, 'rejoin_room: player successfully rejoined');
    });

    socket.on('start_game', async ({ roomId }) => {
      const room = getRoom(roomId);
      if (!room) return;
      try {
        const state = await startGame(room);
        // emit initial hands_dealt event so clients show initial deal in logs
        const dealt: Record<string, string[]> = {};
        for (const p of state.players) dealt[p.id] = [...p.hand];
        io.to(roomId).emit('game_event', { type: 'hands_dealt', actor: undefined, payload: { dealt, handNumber: state.handNumber } });
        io.to(roomId).emit('game_state', state);
      } catch (err: any) {
        socket.emit('start_rejected', { reason: err.message });
      }
    });

    socket.on('leave_room', ({ roomId }) => {
      const room = getRoom(roomId);
      if (!room) return;
      const playerId = socket.data.identity?.id ?? socket.id;
      leaveRoom(room, playerId);
      socket.leave(roomId);
      io.to(roomId).emit('room_update', { roomId, players: room.players.map((p) => ({ id: p.id, name: p.name, role: p.role, taken: p.taken })), ownerId: room.ownerId, accessCode: room.accessCode, inviteToken: room.inviteToken, timerEnabled: room.timerEnabled });
    });

    socket.on('intent_play_card', async ({ roomId, cardId, playerId }) => {
      const room = getRoom(roomId);
      if (!room) return;
      // Use playerId from client if provided, otherwise find player by socketId, fallback to identity
      const player = room.players.find((p: any) => p.socketId === socket.id);
      const actualPlayerId = playerId ?? player?.id ?? socket.data.identity?.id ?? socket.id;
      const ev = await handleIntent(room, { type: 'play_card', playerId: actualPlayerId, cardId });
      if (Array.isArray(ev)) {
        for (const e of ev) io.to(roomId).emit('game_event', e);
      } else if (ev) {
        io.to(roomId).emit('game_event', ev);
      }
      // emit updated full state so clients have current view
      if (room.state) {
        io.to(roomId).emit('game_state', room.state);
        
        // Start timer for next player's turn if timer enabled
        startTurnTimerWithAutoPlay(roomId);
      }
    });

    // Dev-only: allow playing a card as another player (for manual multi-player testing)
    const DEV_TEST = process.env.DEV_TEST_MODE === 'true' || process.env.NODE_ENV !== 'production';
    socket.on('intent_play_card_as', async ({ roomId, cardId, asPlayerId }) => {
      if (!DEV_TEST) {
        socket.emit('error', { reason: 'dev_mode_disabled' });
        return;
      }
      const room = getRoom(roomId);
      if (!room) return;
      const ev = await handleIntent(room, { type: 'play_card', playerId: asPlayerId, cardId });
      if (Array.isArray(ev)) {
        for (const e of ev) io.to(roomId).emit('game_event', e);
      } else if (ev) {
        io.to(roomId).emit('game_event', ev);
      }
      if (room.state) io.to(roomId).emit('game_state', room.state);
    });
    
    // ============================================
    // SURRENDER & REMATCH Socket Handlers
    // ============================================
    
    /**
     * Player votes to surrender
     * In 2v2, both team members must vote to surrender
     */
    socket.on('vote_surrender', async ({ roomId }: { roomId: string }) => {
      const room = getRoom(roomId);
      if (!room || !room.state || room.state.matchOver) {
        socket.emit('error', { reason: 'game_not_active' });
        return;
      }
      
      const player = room.players.find((p: any) => p.socketId === socket.id);
      const playerId = player?.id ?? socket.data.identity?.id ?? socket.id;
      
      // Check if player is in this game
      const gamePlayer = room.state.players.find(p => p.id === playerId);
      if (!gamePlayer) {
        socket.emit('error', { reason: 'not_in_game' });
        return;
      }
      
      // Load or initialize surrender votes from database
      try {
        const gameRecord = await prisma.game.findUnique({
          where: { id: room.state.id }
        });
        
        if (!gameRecord) {
          socket.emit('error', { reason: 'game_not_found' });
          return;
        }
        
        const surrenderVotes = gameRecord.surrenderVotes || [];
        
        // Add vote if not already voted
        if (!surrenderVotes.includes(playerId)) {
          surrenderVotes.push(playerId);
          
          await prisma.game.update({
            where: { id: room.state.id },
            data: { surrenderVotes }
          });
        }
        
        // Check if team has fully surrendered
        const playerTeam = gamePlayer.team;
        const teamPlayers = room.state.players.filter(p => p.team === playerTeam);
        const teamVotes = surrenderVotes.filter((vid: string) => teamPlayers.some(p => p.id === vid));
        
        if (teamVotes.length === teamPlayers.length) {
          // Team has surrendered! End game
          const winnerTeam = playerTeam === 0 ? 1 : 0;
          
          // Set scores: winner gets 101, loser gets current score
          const finalScores = {
            team0: playerTeam === 0 ? room.state.scores.team0 : 101,
            team1: playerTeam === 1 ? room.state.scores.team1 : 101
          };
          
          room.state.scores = finalScores;
          room.state.matchOver = true;
          
          // Stop any active turn timer
          clearTurnTimer(roomId);
          
          // Emit surrender event
          io.to(roomId).emit('game_event', {
            type: 'team_surrendered',
            payload: { team: playerTeam, winnerTeam, finalScores }
          });
          
          io.to(roomId).emit('game_state', room.state);
          
          // Calculate zings from current round (if any) and add to match total
          const matchZings = (room as any)._matchZings || { team0: 0, team1: 0 };
          const roundZings = (room.state as any)._roundZings || { team0: 0, team1: 0 };
          
          // Track zing counts (number of zings, not points) for achievements
          const matchZingsCount = (room as any)._matchZingsCount || { team0: 0, team1: 0 };
          const roundZingsCount = (room.state as any)._roundZingsCount || { team0: 0, team1: 0 };
          
          // Add current round zings to match total (for points display)
          const totalZings = {
            team0: matchZings.team0 + (roundZings.team0 || 0),
            team1: matchZings.team1 + (roundZings.team1 || 0)
          };
          
          // Add current round zing counts to match total (for achievements)
          const totalZingsCount = {
            team0: matchZingsCount.team0 + (roundZingsCount.team0 || 0),
            team1: matchZingsCount.team1 + (roundZingsCount.team1 || 0)
          };
          
          await saveMatchHistory(room, winnerTeam, finalScores, totalZings, totalZingsCount);
          
          // Mark room as not in game anymore (game is over)
          room.inGame = false;
          
        } else {
          // Notify only team members that one member wants to surrender
          // Find all players in the same team and send them the notification
          const teamPlayerIds = teamPlayers.map(p => p.id);
          const teamMembers = room.members.filter(m => teamPlayerIds.includes(m.userId));
          
          for (const member of teamMembers) {
            if (member.socketId) {
              io.to(member.socketId).emit('surrender_vote_added', {
                playerId,
                team: playerTeam,
                votesNeeded: teamPlayers.length,
                currentVotes: teamVotes.length
              });
            }
          }
        }
        
      } catch (error) {
        console.error('Error handling surrender vote:', error);
        socket.emit('error', { reason: 'surrender_failed' });
      }
    });
    
    /**
     * Player votes for rematch
     * All players must vote for rematch
     */
    socket.on('vote_rematch', async ({ roomId }: { roomId: string }) => {
      const room = getRoom(roomId);
      if (!room || !room.state || !room.state.matchOver) {
        socket.emit('error', { reason: 'game_not_ended' });
        return;
      }
      
      const player = room.players.find((p: any) => p.socketId === socket.id);
      const playerId = player?.id ?? socket.data.identity?.id ?? socket.id;
      
      // Check if player is in this game
      const gamePlayer = room.state.players.find(p => p.id === playerId);
      if (!gamePlayer) {
        socket.emit('error', { reason: 'not_in_game' });
        return;
      }
      
      try {
        const gameRecord = await prisma.game.findUnique({
          where: { id: room.state.id }
        });
        
        if (!gameRecord) {
          socket.emit('error', { reason: 'game_not_found' });
          return;
        }
        
        const rematchVotes = gameRecord.rematchVotes || [];
        
        // Add vote if not already voted
        if (!rematchVotes.includes(playerId)) {
          rematchVotes.push(playerId);
          
          await prisma.game.update({
            where: { id: room.state.id },
            data: { rematchVotes }
          });
        }
        
        // Notify all players of vote
        io.to(roomId).emit('rematch_vote_added', {
          playerId,
          votesNeeded: room.state.players.length,
          currentVotes: rematchVotes.length
        });
        
        // Check if all players voted
        if (rematchVotes.length === room.state.players.length) {
          // All voted! Start rematch
          logger.info({ roomId }, 'All players voted for rematch, starting new game');
          
          // Clear old game state but keep players
          room.state = undefined;
          room.seq = 0;
          
          // Start new game with same players
          try {
            await startGame(room);
            io.to(roomId).emit('game_state', room.state);
            io.to(roomId).emit('game_event', { type: 'rematch_started', payload: {} });
            
            // Start turn timer for first player if timer enabled
            startTurnTimerWithAutoPlay(roomId);
            
            // Emit timer event with delay to ensure all clients received game_state
            emitTimerEventDelayed(roomId);
          } catch (error) {
            console.error('Error starting rematch:', error);
            io.to(roomId).emit('error', { reason: 'rematch_failed' });
          }
        }
        
      } catch (error) {
        console.error('Error handling rematch vote:', error);
        socket.emit('error', { reason: 'rematch_failed' });
      }
    });
    
    /**
     * Player exits game (leaves room after game ends)
     */
    socket.on('exit_game', async ({ roomId }: { roomId: string }) => {
      const room = getRoom(roomId);
      if (!room) {
        socket.emit('error', { reason: 'room_not_found' });
        return;
      }
      
      const player = room.players.find((p: any) => p.socketId === socket.id);
      const playerId = player?.id ?? socket.data.identity?.id ?? socket.id;
      
      // Return player to original room if they came from one
      const originalRoomId = room.playerOriginalRooms?.get(playerId);
      
      if (originalRoomId && originalRoomId !== roomId) {
        // Player came from a different private room (e.g., party matchmaking), return them there
        const originalRoom = getRoom(originalRoomId);
        
        if (originalRoom) {
          // Get player info from matchmaking room BEFORE leaving
          const member = room.members.find(m => m.userId === playerId);
          const playerName = member?.name || room.players.find((p: any) => p.id === playerId)?.name || 'Unknown';
          const isAuthenticated = member?.isAuthenticated || false;
          
          // Remove from matchmaking room (only if still a member)
          socket.leave(roomId);
          const isMember = room.members.some(m => m.userId === playerId);
          if (isMember) {
            try {
              leaveMemberRoom(roomId, playerId);
            } catch (error: any) {
              logger.warn({ roomId, playerId, error: error.message }, 'Failed to leave matchmaking room (player may have already left)');
            }
          }
          
          // Rejoin original room
          addMemberToRoom(originalRoom, playerId, playerName, socket.id, isAuthenticated);
          
          // Sync room.players with room.members (remove ghost players from matchmaking)
          originalRoom.players = originalRoom.members.map((m, idx) => {
            const existingPlayer = originalRoom.players.find(p => p.id === m.userId);
            return existingPlayer || {
              id: m.userId,
              name: m.name,
              seat: idx,
              role: m.roleInRoom === 'PLAYER' ? 'player' : 'spectator',
              team: 0,
              hand: [],
              taken: [],
              socketId: m.socketId,
              connected: true,
            };
          });
          
          socket.join(originalRoomId);
          socket.emit('returned_to_room', { roomId: originalRoomId, room: originalRoom });
          
          // Notify all members in original room with updated player list (including this player)
          io.to(originalRoomId).emit('room_update', {
            roomId: originalRoomId,
            players: originalRoom.players.map((p: any) => ({ 
              id: p.id, 
              name: p.name ?? p.id, 
              role: p.role, 
              taken: p.taken 
            })),
            ownerId: originalRoom.ownerId,
            accessCode: originalRoom.accessCode,
            inviteToken: originalRoom.inviteToken,
            timerEnabled: originalRoom.timerEnabled
          });
          
          logger.info({ roomId, originalRoomId, playerId }, 'Player returned to original private room');
          
          // Clean up matchmaking room if empty
          if (room.members.length === 0) {
            room.inGame = false; // Allow deletion now
            deleteRoom(roomId);
          }
          
          return;
        } else {
          // Original room was deleted, send to lobby
          logger.warn({ roomId, originalRoomId, playerId }, 'Original room no longer exists, sending to lobby');
          socket.leave(roomId);
          const isMember = room.members.some(m => m.userId === playerId);
          if (isMember) {
            try {
              leaveMemberRoom(roomId, playerId);
            } catch (error: any) {
              logger.warn({ roomId, playerId, error: error.message }, 'Failed to leave room');
            }
          }
          socket.emit('left_room', { roomId });
          
          // Clean up matchmaking room if empty
          if (room.members.length === 0) {
            room.inGame = false;
            deleteRoom(roomId);
          }
          
          return;
        }
      }
      
      // Game started in this room (1v1 or 2v2_party in private room)
      // Just end the game but keep players in the room
      if (room.visibility === 'private' && room.state) {
        // Clear game state but keep room intact
        room.state = undefined;
        room.inGame = false;
        
        // Notify room that game ended
        io.to(roomId).emit('game_exited', { roomId });
        socket.emit('stayed_in_room', { roomId, room });
        
        // Send room_update with current timer setting so frontend UI syncs correctly
        io.to(roomId).emit('room_update', {
          roomId: room.id,
          players: room.players.map((p: any) => ({ 
            id: p.id, 
            name: p.name ?? p.id, 
            role: p.role, 
            taken: p.taken 
          })),
          members: room.members?.map(m => ({
            userId: m.userId,
            name: m.name,
            roleInRoom: m.roleInRoom,
            joinedAt: m.joinedAt,
          })) || [],
          hostId: room.hostId,
          ownerId: room.ownerId,
          accessCode: room.accessCode,
          inviteToken: room.inviteToken,
          timerEnabled: room.timerEnabled
        });
        
        logger.info({ roomId, playerId }, 'Player exited game, staying in private room');
        return;
      }
      
      // Public room or no game state - leave normally
      socket.leave(roomId);
      const isMember = room.members.some(m => m.userId === playerId);
      if (isMember) {
        try {
          leaveMemberRoom(roomId, playerId);
        } catch (error: any) {
          logger.warn({ roomId, playerId, error: error.message }, 'Failed to leave room');
        }
      }
      socket.emit('left_room', { roomId });
      
      // Clean up room if empty
      if (room.members.length === 0) {
        room.inGame = false;
        deleteRoom(roomId);
      }
    });
    
    // ============================================
    // TASK 4: Invite System Socket Handlers
    // ============================================

    /**
     * Send invite to friend (creates room if sender not in one)
     * Payload: { friendId: string }
     */
    socket.on('send_invite', async ({ friendId }: { friendId: string }) => {
      const senderId = socket.data.identity?.id;
      
      if (!senderId || socket.data.identity?.type !== 'user') {
        socket.emit('invite_error', { reason: 'NOT_AUTHENTICATED', message: 'Must be logged in to send invites' });
        return;
      }

      try {
        // Check if sender is already in a room
        let roomId = getUserCurrentRoom(senderId);
        let isNewRoom = false;

        // If sender not in room, create new private room
        if (!roomId) {
          const newRoom = createRoom('private', senderId);
          roomId = newRoom.id;
          isNewRoom = true;

          // Add sender as member (host)
          const isAuthenticated = socket.data.identity?.type === 'user';
          addMemberToRoom(newRoom, senderId, socket.data.displayName || 'Player', socket.id, isAuthenticated);
          
          // Join socket to room
          socket.join(roomId);

          // Emit room created to sender
          socket.emit('room_created', {
            roomId: newRoom.id,
            visibility: newRoom.visibility,
            accessCode: newRoom.accessCode,
            inviteToken: newRoom.inviteToken,
          });

          // Emit room update to sender
          socket.emit('room_update', {
            roomId: newRoom.id,
            members: newRoom.members.map(m => ({
              userId: m.userId,
              name: m.name,
              roleInRoom: m.roleInRoom,
              joinedAt: m.joinedAt,
            })),
            hostId: newRoom.hostId,
            ownerId: newRoom.ownerId,
            accessCode: newRoom.accessCode,
            inviteToken: newRoom.inviteToken
          });
        }

        // Send invite via InviteService
        const invite = await inviteService.sendInvite({
          roomId,
          inviterId: senderId,
          inviteeId: friendId,
          metadata: { isNewRoom },
        });

        // Find receiver's socket
        const receiverSocket = Array.from(io.sockets.sockets.values()).find(
          (s) => s.data.identity?.id === friendId
        );

        // Emit invite to receiver if online
        if (receiverSocket) {
          receiverSocket.emit('invite_received', {
            inviteId: invite.id,
            roomId: invite.roomId,
            inviterId: invite.inviterId,
            inviterUsername: invite.inviter.username,
            expiresAt: invite.expiresAt.toISOString(),
            createdAt: invite.createdAt.toISOString(),
          });
        }

        // Confirm to sender
        socket.emit('invite_sent', {
          inviteId: invite.id,
          inviteeId: friendId,
          roomId,
        });

        logger.info({ senderId, friendId, inviteId: invite.id, roomId }, 'Invite sent successfully');

      } catch (error: any) {
        logger.error({ senderId, friendId, error: error.message }, 'send_invite error');
        
        socket.emit('invite_error', {
          reason: error.code || 'UNKNOWN_ERROR',
          message: error.message,
        });
      }
    });

    /**
     * Accept invite
     * Payload: { inviteId: string }
     */
    socket.on('accept_invite', async ({ inviteId }: { inviteId: string }) => {
      const userId = socket.data.identity?.id;
      
      if (!userId || socket.data.identity?.type !== 'user') {
        socket.emit('invite_error', { reason: 'NOT_AUTHENTICATED', message: 'Must be logged in' });
        return;
      }

      try {
        // First, leave current room if in one
        const currentRoomId = getUserCurrentRoom(userId);
        if (currentRoomId) {
          const currentRoom = getRoom(currentRoomId);
          if (currentRoom) {
            logger.info({ userId, currentRoomId, inviteId }, 'accept_invite: leaving current room');
            
            // Leave current room
            leaveMemberRoom(currentRoomId, userId);
            socket.leave(currentRoomId);
            
            // Notify current room members
            io.to(currentRoomId).emit('room_update', {
              roomId: currentRoomId,
              players: currentRoom.players.map((p: any) => ({ 
                id: p.id, 
                name: p.name ?? p.id, 
                role: p.role, 
                taken: p.taken,
                connected: p.connected ?? true 
              })),
              accessCode: currentRoom.accessCode,
              inviteToken: currentRoom.inviteToken,
              members: currentRoom.members.map(m => ({
                userId: m.userId,
                name: m.name,
                roleInRoom: m.roleInRoom,
                joinedAt: m.joinedAt,
              })),
              hostId: currentRoom.hostId,
              ownerId: currentRoom.ownerId,
            });
          }
        }

        // Accept invite via service (validates everything)
        const acceptedInvite = await inviteService.acceptInvite({
          inviteId,
          inviteeId: userId,
        });

        const room = getRoom(acceptedInvite.roomId);
        if (!room) {
          socket.emit('invite_error', { reason: 'ROOM_NOT_FOUND', message: 'Room no longer exists' });
          return;
        }

        // Add invitee as member
        const isAuthenticated = socket.data.identity?.type === 'user';
        addMemberToRoom(room, userId, socket.data.displayName || 'Player', socket.id, isAuthenticated);
        
        // Debug: log room state after adding member
        logger.info({ 
          roomId: acceptedInvite.roomId, 
          userId,
          membersCount: room.members.length,
          playersCount: room.players.length,
          members: room.members.map(m => m.userId),
          players: room.players.map(p => p.id)
        }, 'accept_invite: added member to room');

        // Join socket to room
        socket.join(acceptedInvite.roomId);

        // Generate reconnect token for the invitee
        const reconnectToken = generateAndStoreReconnectToken(acceptedInvite.roomId, userId);

        // Emit acceptance confirmation to invitee
        socket.emit('invite_accepted', {
          inviteId,
          roomId: acceptedInvite.roomId,
          reconnectToken,
          inviteToken: room.inviteToken, // Send room invite token for joining
        });

        // Emit room update to all members
        io.to(acceptedInvite.roomId).emit('room_update', {
          roomId: room.id,
          players: room.players.map((p: any) => ({ 
            id: p.id, 
            name: p.name ?? p.id, 
            role: p.role, 
            taken: p.taken,
            connected: p.connected ?? true 
          })),
          accessCode: room.accessCode,
          inviteToken: room.inviteToken,
          members: room.members.map(m => ({
            userId: m.userId,
            name: m.name,
            roleInRoom: m.roleInRoom,
            joinedAt: m.joinedAt,
          })),
          hostId: room.hostId,
          ownerId: room.ownerId,
        });

        // Notify inviter that their invite was accepted
        const inviterSocket = Array.from(io.sockets.sockets.values()).find(
          (s) => s.data.identity?.id === acceptedInvite.inviterId
        );
        if (inviterSocket) {
          inviterSocket.emit('invite_was_accepted', {
            inviteId,
            inviteeId: userId,
            inviteeUsername: socket.data.displayName,
            roomId: acceptedInvite.roomId,
          });
        }

        logger.info({ userId, inviteId, roomId: acceptedInvite.roomId }, 'Invite accepted');

      } catch (error: any) {
        logger.error({ userId, inviteId, error: error.message, code: error.code }, 'accept_invite error');
        
        socket.emit('invite_error', {
          reason: error.code || 'UNKNOWN_ERROR',
          message: error.message,
        });
      }
    });

    /**
     * Decline invite
     * Payload: { inviteId: string }
     */
    socket.on('decline_invite', async ({ inviteId }: { inviteId: string }) => {
      const userId = socket.data.identity?.id;
      
      if (!userId || socket.data.identity?.type !== 'user') {
        socket.emit('invite_error', { reason: 'NOT_AUTHENTICATED', message: 'Must be logged in' });
        return;
      }

      try {
        const declinedInvite = await inviteService.declineInvite({
          inviteId,
          inviteeId: userId,
        });

        // Confirm to decliner
        socket.emit('invite_declined', { inviteId });

        // Notify inviter
        const inviterSocket = Array.from(io.sockets.sockets.values()).find(
          (s) => s.data.identity?.id === declinedInvite.inviterId
        );
        if (inviterSocket) {
          inviterSocket.emit('invite_was_declined', {
            inviteId,
            inviteeId: userId,
            inviteeUsername: socket.data.displayName,
          });
        }

        logger.info({ userId, inviteId }, 'Invite declined');

      } catch (error: any) {
        logger.error({ userId, inviteId, error: error.message }, 'decline_invite error');
        
        socket.emit('invite_error', {
          reason: error.code || 'UNKNOWN_ERROR',
          message: error.message,
        });
      }
    });

    /**
     * Get pending invites for current user
     */
    socket.on('get_pending_invites', async () => {
      const userId = socket.data.identity?.id;
      
      if (!userId || socket.data.identity?.type !== 'user') {
        socket.emit('pending_invites', { invites: [] });
        return;
      }

      try {
        const invites = await inviteService.getPendingInvitesForUser(userId);
        
        socket.emit('pending_invites', {
          invites: invites.map(inv => ({
            inviteId: inv.id,
            roomId: inv.roomId,
            inviterId: inv.inviterId,
            inviterUsername: inv.inviter.username,
            expiresAt: inv.expiresAt.toISOString(),
            createdAt: inv.createdAt.toISOString(),
          })),
        });

      } catch (error: any) {
        logger.error({ userId, error: error.message }, 'get_pending_invites error');
        socket.emit('pending_invites', { invites: [] });
      }
    });

    socket.on('get_room_pending_invites', async (payload: { roomId: string }) => {
      
      if (!payload.roomId) {
        socket.emit('room_pending_invites', { invitees: [] });
        return;
      }

      try {
        const invites = await inviteService.getPendingInvitesByRoom(payload.roomId);
        
        socket.emit('room_pending_invites', {
          invitees: invites.map(inv => inv.inviteeId),
        });
      } catch (error: any) {
        socket.emit('room_pending_invites', { invitees: [] });
      }
    });

    /**
     * Set member role (host only)
     * Payload: { roomId: string, targetUserId: string, role: 'PLAYER' | 'SPECTATOR' }
     */
    socket.on('set_member_role', ({ roomId, targetUserId, role }: { roomId: string; targetUserId: string; role: RoomRole }) => {
      const requesterId = socket.data.identity?.id;
      
      if (!requesterId) {
        socket.emit('room_error', { reason: 'NOT_AUTHENTICATED' });
        return;
      }

      try {
        const updatedMember = setMemberRole(roomId, targetUserId, role, requesterId);
        const room = getRoom(roomId);

        // Emit role change to all room members
        io.to(roomId).emit('role_changed', {
          userId: updatedMember.userId,
          newRole: updatedMember.roleInRoom,
        });
        
        // Emit room_update to sync frontend state with updated roles
        if (room) {
          io.to(roomId).emit('room_update', {
            roomId: room.id,
            players: room.players.map(p => ({
              id: p.id,
              name: p.name,
              role: p.role,
              taken: p.taken || []
            })),
            ownerId: room.ownerId,
            accessCode: room.accessCode,
            inviteToken: room.inviteToken
          });
        }

        logger.info({ roomId, targetUserId, role, requesterId }, 'Member role changed');

      } catch (error: any) {
        logger.error({ roomId, targetUserId, role, error: error.message }, 'set_member_role error');
        socket.emit('room_error', { reason: error.message });
      }
    });

    /**
     * Toggle timer setting (host only)
     * Payload: { roomId: string, enabled: boolean }
     */
    socket.on('toggle_timer', ({ roomId, enabled }: { roomId: string; enabled: boolean }) => {
      const requesterId = socket.data.identity?.id;
      
      if (!requesterId) {
        socket.emit('room_error', { reason: 'NOT_AUTHENTICATED' });
        return;
      }

      const room = getRoom(roomId);
      if (!room) {
        socket.emit('room_error', { reason: 'ROOM_NOT_FOUND' });
        return;
      }

      // Check if requester is host
      if (room.hostId !== requesterId && room.ownerId !== requesterId) {
        socket.emit('room_error', { reason: 'NOT_HOST' });
        return;
      }

      // Update timer setting
      room.timerEnabled = enabled;

      // Broadcast update to all room members
      io.to(roomId).emit('room_update', {
        roomId: room.id,
        timerEnabled: enabled,
        members: room.members?.map(m => ({
          userId: m.userId,
          name: m.name,
          roleInRoom: m.roleInRoom,
          joinedAt: m.joinedAt,
        })) || [],
        hostId: room.hostId,
        ownerId: room.ownerId,
        accessCode: room.accessCode,
        inviteToken: room.inviteToken
      });

      logger.info({ roomId, enabled, requesterId }, 'Timer setting toggled');
    });

    /**
     * Kick member from room (host only)
     * Payload: { roomId: string, targetUserId: string }
     */
    socket.on('kick_member', async ({ roomId, targetUserId }: { roomId: string; targetUserId: string }) => {
      const requesterId = socket.data.identity?.id;
      
      if (!requesterId) {
        socket.emit('room_error', { reason: 'NOT_AUTHENTICATED' });
        return;
      }

      try {
        const kickedMember = kickMember(roomId, targetUserId, requesterId);

        // Find kicked user's socket and notify them
        const kickedSocket = Array.from(io.sockets.sockets.values()).find(
          (s) => s.data.identity?.id === targetUserId
        );
        if (kickedSocket) {
          kickedSocket.leave(roomId);
          kickedSocket.emit('you_were_kicked', { roomId });
        }

        // Notify room about kick
        io.to(roomId).emit('member_kicked', {
          userId: kickedMember.userId,
          name: kickedMember.name,
        });

        // Remove party from matchmaking queue (kicked member means party is incomplete)
        const wasInQueue = matchmakingManager.removePartyFromQueue(roomId);
        if (wasInQueue) {
          // Notify remaining members that matchmaking was cancelled
          io.to(roomId).emit('queue_cancelled', { 
            reason: 'MEMBER_KICKED',
            message: 'Matchmaking zaustavljen - član je izbačen iz sobe'
          });
        }

        // Check if room was deleted (no members left)
        const room = getRoom(roomId);
        if (!room) {
          // Room was deleted, cancel all pending invites
          const cancelledInvites = await inviteService.cancelInvitesByRoomDeletion(roomId);
          
          // Notify invitees that room was deleted
          for (const inv of cancelledInvites) {
            const inviteeSocket = Array.from(io.sockets.sockets.values()).find(
              (s) => s.data.identity?.id === inv.inviteeId
            );
            if (inviteeSocket) {
              inviteeSocket.emit('invite_cancelled', {
                inviteId: inv.id,
                reason: 'ROOM_DELETED',
              });
            }
          }

          logger.info({ roomId }, 'Room deleted after kick (no members left)');
        }

        logger.info({ roomId, targetUserId, requesterId }, 'Member kicked');

      } catch (error: any) {
        logger.error({ roomId, targetUserId, error: error.message }, 'kick_member error');
        socket.emit('room_error', { reason: error.message });
      }
    });

    /**
     * Leave room
     * Payload: { roomId: string }
     */
    socket.on('leave_room_member', async ({ roomId }: { roomId: string }) => {
      const userId = socket.data.identity?.id;
      
      if (!userId) {
        socket.emit('room_error', { reason: 'NOT_AUTHENTICATED' });
        return;
      }

      try {
        const result = leaveMemberRoom(roomId, userId);

        // Leave socket room
        socket.leave(roomId);

        // Confirm to leaver
        socket.emit('room_left', { roomId });

        // Remove party from matchmaking queue if in queue
        const wasInQueue = matchmakingManager.removePartyFromQueue(roomId);
        if (wasInQueue) {
          // Notify remaining members that matchmaking was cancelled
          io.to(roomId).emit('queue_cancelled', { 
            reason: 'MEMBER_LEFT',
            message: 'Matchmaking zaustavljen - član je napustio sobu'
          });
        }

        if (result.roomDeleted) {
          // Room was deleted, cancel all pending invites
          const cancelledInvites = await inviteService.cancelInvitesByRoomDeletion(roomId);
          
          // Notify invitees
          for (const inv of cancelledInvites) {
            const inviteeSocket = Array.from(io.sockets.sockets.values()).find(
              (s) => s.data.identity?.id === inv.inviteeId
            );
            if (inviteeSocket) {
              inviteeSocket.emit('invite_cancelled', {
                inviteId: inv.id,
                reason: 'ROOM_DELETED',
              });
            }
          }

          logger.info({ roomId, userId }, 'Room deleted after leave (no members left)');
        } else {
          // Notify remaining members
          io.to(roomId).emit('member_left', { userId });

          // If host changed, notify room
          if (result.wasHost && result.newHostId) {
            io.to(roomId).emit('host_changed', {
              newHostId: result.newHostId,
            });
          }

          // Emit updated room state
          const room = getRoom(roomId);
          if (room) {
            io.to(roomId).emit('room_update', {
              roomId: room.id,
              members: room.members.map(m => ({
                userId: m.userId,
                name: m.name,
                roleInRoom: m.roleInRoom,
                joinedAt: m.joinedAt,
              })),
              hostId: room.hostId,
              ownerId: room.ownerId,
              accessCode: room.accessCode,
              inviteToken: room.inviteToken
            });
          }
        }

        logger.info({ roomId, userId, wasHost: result.wasHost, newHostId: result.newHostId }, 'Member left room');

      } catch (error: any) {
        logger.error({ roomId, userId, error: error.message }, 'leave_room_member error');
        socket.emit('room_error', { reason: error.message });
      }
    });

    // ============================================
    // TASK 6: Host Start Game Actions
    // ============================================

    /**
     * Start 1v1 game (host only, requires exactly 2 PLAYERS)
     * Payload: { roomId: string }
     */
    socket.on('start_1v1', async ({ roomId }: { roomId: string }) => {
      const userId = socket.data.identity?.id;
      
      if (!userId) {
        socket.emit('start_error', { reason: 'NOT_AUTHENTICATED', message: 'User ID not found' });
        return;
      }

      try {
        const room = getRoom(roomId);
        if (!room) {
          socket.emit('start_error', { reason: 'ROOM_NOT_FOUND', message: 'Room not found' });
          return;
        }

        // Validate host
        if (!isHost(roomId, userId)) {
          socket.emit('start_error', { reason: 'NOT_HOST', message: 'Only host can start the game' });
          return;
        }

        // Validate player count
        if (!canStart1v1(roomId)) {
          const playerCount = countPlayers(roomId);
          socket.emit('start_error', { 
            reason: 'INVALID_PLAYER_COUNT', 
            message: `Need exactly 2 players to start 1v1 (currently ${playerCount} players)` 
          });
          return;
        }

        // Start game using existing logic
        room.mode = '1v1';
        const state = await startGame(room);
        
        // Emit hands_dealt event
        const dealt: Record<string, string[]> = {};
        for (const p of state.players) dealt[p.id] = [...p.hand];
        io.to(roomId).emit('game_event', { 
          type: 'hands_dealt', 
          actor: undefined, 
          payload: { dealt, handNumber: state.handNumber } 
        });

        // Emit game state
        io.to(roomId).emit('game_state', state);
        
        // Emit game started event
        io.to(roomId).emit('game_started', { 
          mode: '1v1',
          roomId 
        });

        // Start turn timer for first player if timer enabled
        startTurnTimerWithAutoPlay(roomId);
        
        // Emit timer event with delay to ensure all clients received game_state
        emitTimerEventDelayed(roomId);

        logger.info({ roomId, hostId: userId }, '1v1 game started');

      } catch (error: any) {
        logger.error({ roomId, error: error.message }, 'start_1v1 error');
        socket.emit('start_error', { 
          reason: 'START_FAILED', 
          message: error.message 
        });
      }
    });

    /**
     * Start 2v2 random matchmaking (host only, requires exactly 2 PLAYERS)
     * Duo party enters regular 2v2 matchmaking queue
     * Payload: { roomId: string }
     */
    socket.on('start_2v2_random', async ({ roomId }: { roomId: string }) => {
      const userId = socket.data.identity?.id;
      
      if (!userId) {
        socket.emit('start_error', { reason: 'NOT_AUTHENTICATED', message: 'User ID not found' });
        return;
      }

      try {
        const room = getRoom(roomId);
        if (!room) {
          socket.emit('start_error', { reason: 'ROOM_NOT_FOUND', message: 'Room not found' });
          return;
        }

        // Validate host
        if (!isHost(roomId, userId)) {
          socket.emit('start_error', { reason: 'NOT_HOST', message: 'Only host can start matchmaking' });
          return;
        }

        // Validate player count (need exactly 2 PLAYERS)
        const playerCount = countPlayers(roomId);
        if (playerCount !== 2) {
          socket.emit('start_error', { 
            reason: 'INVALID_PLAYER_COUNT', 
            message: `Need exactly 2 players for 2v2 random (currently ${playerCount} players)` 
          });
          return;
        }

        // Get PLAYER members only (not spectators)
        const players = room.members?.filter(m => m.roleInRoom === 'PLAYER') || [];

        if (players.length !== 2) {
          socket.emit('start_error', { 
            reason: 'INVALID_PLAYER_COUNT', 
            message: 'Could not find 2 players in room' 
          });
          return;
        }

        // Ensure all players have active socket connections
        const activePlayers = players.filter(p => p.socketId !== undefined);
        if (activePlayers.length !== 2) {
          socket.emit('start_error', { 
            reason: 'PLAYERS_NOT_CONNECTED', 
            message: 'All players must be connected to start matchmaking' 
          });
          return;
        }

        // Add party to matchmaking queue
        const result = await matchmakingManager.addPartyToQueue(
          '2v2',
          activePlayers.map(p => ({
            playerId: p.userId,
            playerName: p.name,
            socketId: p.socketId!, // Now guaranteed to be defined
          })),
          roomId,
          room.hostId // Pass original host ID for achievement tracking
        );

        if (result.matched && result.room && result.players) {
          // Match found immediately! Delete current room and move to matchmaking room
          logger.info({ 
            oldRoomId: roomId,
            newRoomId: result.room.id,
            players: result.players.map(p => p.playerName) 
          }, '2v2 random: match found immediately');

          // Cancel all pending invites for the old room
          const cancelledInvites = await inviteService.cancelInvitesByRoomDeletion(roomId);
          
          // Notify invitees that room was deleted
          for (const inv of cancelledInvites) {
            const inviteeSocket = Array.from(io.sockets.sockets.values()).find(
              (s) => s.data.identity?.id === inv.inviteeId
            );
            if (inviteeSocket) {
              inviteeSocket.emit('invite_cancelled', {
                inviteId: inv.id,
                reason: 'ROOM_DELETED',
              });
            }
          }

          // Notify all matched players
          for (const player of result.players) {
            // Find current active socket for this player by playerId (not using cached socketId)
            const playerSocket = Array.from(io.sockets.sockets.values()).find(
              (s) => s.data.identity?.id === player.playerId
            );
            
            if (playerSocket) {
              // Leave old room
              playerSocket.leave(roomId);
              // Join new matchmaking room
              playerSocket.join(result.room.id);
              
              // Generate new reconnect token for the new room
              const reconnectToken = generateAndStoreReconnectToken(result.room.id, player.playerId);
              
              playerSocket.emit('match_found', {
                roomId: result.room.id,
                mode: '2v2',
                players: result.room.players.map((p: any) => ({ 
                  id: p.id, 
                  name: p.name, 
                  team: p.team 
                }))
              });
              
              // Send new reconnect token for the matchmaking room
              playerSocket.emit('reconnect_token', { roomId: result.room.id, token: reconnectToken });
            }
          }

          // Emit game state to new room
          if (result.room.state) {
            io.to(result.room.id).emit('game_state', { state: result.room.state });
            
            const dealt: Record<string, string[]> = {};
            for (const p of result.room.state.players) {
              dealt[p.id] = [...p.hand];
            }
            io.to(result.room.id).emit('game_event', { 
              type: 'hands_dealt', 
              actor: undefined, 
              payload: { dealt, handNumber: result.room.state.handNumber } 
            });
            
            io.to(result.room.id).emit('room_update', { 
              roomId: result.room.id, 
              players: result.room.players.map((p: any) => ({ 
                id: p.id, 
                name: p.name, 
                role: p.role, 
                taken: p.taken 
              })), 
              ownerId: result.room.ownerId,
              accessCode: result.room.accessCode,
              inviteToken: result.room.inviteToken
            });

            // Start turn timer for first player (matchmaking rooms always have timer)
            startTurnTimerWithAutoPlay(result.room.id);
            
            // Emit timer event with delay to ensure all clients received game_state
            emitTimerEventDelayed(result.room.id);
          }

          // Mark the old room as empty but keep it alive for players to return to
          // Remove all members from old room (they're now in matchmaking room)
          room.members = [];
          room.players = [];
          room.inGame = true; // Keep room protected from deletion
          
          logger.info({ oldRoomId: roomId, newRoomId: result.room.id }, 'Emptied original room but kept it alive for return');
          
        } else {
          // Added to queue, waiting for another party
          // Mark room as in-game to protect it from deletion while in queue
          room.inGame = true;
          
          io.to(roomId).emit('queue_joined', { 
            mode: '2v2',
            message: 'Searching for another team...'
          });
        }

        logger.info({ roomId, hostId: userId, playerCount }, '2v2 random matchmaking initiated');

      } catch (error: any) {
        logger.error({ roomId, error: error.message }, 'start_2v2_random error');
        socket.emit('start_error', { 
          reason: 'MATCHMAKING_FAILED', 
          message: error.message 
        });
      }
    });

    // ============================================
    // TASK 7: 2v2 Party (Manual Team Selection)
    // ============================================

    /**
     * Set team assignment for 2v2 party (host only)
     * Payload: { roomId: string, team0: string[], team1: string[] }
     */
    socket.on('set_team_assignment', ({ roomId, team0, team1 }: { roomId: string; team0: string[]; team1: string[] }) => {
      const userId = socket.data.identity?.id;
      
      if (!userId) {
        socket.emit('team_error', { reason: 'NOT_AUTHENTICATED', message: 'User ID not found' });
        return;
      }

      try {
        // Validate and set team assignment
        setTeamAssignment(roomId, team0, team1, userId);

        // Emit team assignment update to all room members
        io.to(roomId).emit('teams_updated', {
          roomId,
          teams: {
            team0,
            team1
          }
        });

        logger.info({ roomId, hostId: userId, team0, team1 }, 'Team assignment set');

      } catch (error: any) {
        logger.error({ roomId, error: error.message }, 'set_team_assignment error');
        socket.emit('team_error', { 
          reason: error.message || 'TEAM_ASSIGNMENT_FAILED', 
          message: error.message 
        });
      }
    });

    /**
     * Start 2v2 party game with custom team assignment (host only)
     * Requires exactly 4 PLAYERS and valid team assignment
     * Payload: { roomId: string }
     */
    socket.on('start_2v2_party', async ({ roomId }: { roomId: string }) => {
      const userId = socket.data.identity?.id;
      
      if (!userId) {
        socket.emit('start_error', { reason: 'NOT_AUTHENTICATED', message: 'User ID not found' });
        return;
      }

      try {
        const room = getRoom(roomId);
        if (!room) {
          socket.emit('start_error', { reason: 'ROOM_NOT_FOUND', message: 'Room not found' });
          return;
        }

        // Validate host
        if (!isHost(roomId, userId)) {
          socket.emit('start_error', { reason: 'NOT_HOST', message: 'Only host can start the game' });
          return;
        }

        // Validate player count (need exactly 4 PLAYERS)
        if (!canStart2v2(roomId)) {
          const playerCount = countPlayers(roomId);
          socket.emit('start_error', { 
            reason: 'INVALID_PLAYER_COUNT', 
            message: `Need exactly 4 players to start 2v2 party (currently ${playerCount} players)` 
          });
          return;
        }

        // Get team assignment
        const teamAssignment = getTeamAssignment(roomId);
        
        if (!teamAssignment) {
          socket.emit('start_error', { 
            reason: 'NO_TEAM_ASSIGNMENT', 
            message: 'Teams must be assigned before starting 2v2 party game' 
          });
          return;
        }

        // Get PLAYER members
        const players = getPlayersInRoom(roomId);
        
        if (players.length !== 4) {
          socket.emit('start_error', { 
            reason: 'INVALID_PLAYER_COUNT', 
            message: 'Need exactly 4 PLAYER members' 
          });
          return;
        }

        // Ensure room.players array is populated with the 4 PLAYER members
        // (for game start logic)
        room.players = players.map((member, idx) => ({
          id: member.userId,
          name: member.name,
          seat: idx,
          role: 'player',
          team: 0, // Will be overridden by startGame with customTeams
          hand: [],
          taken: [],
          socketId: member.socketId,
        }));

        // Start game with custom team assignment
        room.mode = '2v2';
        const state = await startGame(room, { 
          customTeams: teamAssignment 
        });

        // Emit hands_dealt event
        const dealt: Record<string, string[]> = {};
        for (const p of state.players) dealt[p.id] = [...p.hand];
        io.to(roomId).emit('game_event', { 
          type: 'hands_dealt', 
          actor: undefined, 
          payload: { dealt, handNumber: state.handNumber } 
        });

        // Emit game state
        io.to(roomId).emit('game_state', state);
        
        // Emit game started event with team info
        io.to(roomId).emit('game_started', { 
          mode: '2v2_party',
          roomId,
          teams: {
            team0: teamAssignment.team0,
            team1: teamAssignment.team1
          }
        });

        // Start turn timer for first player if timer enabled
        startTurnTimerWithAutoPlay(roomId);
        
        // Emit timer event with delay to ensure all clients received game_state
        emitTimerEventDelayed(roomId);

        logger.info({ 
          roomId, 
          hostId: userId, 
          teams: teamAssignment 
        }, '2v2 party game started with custom teams');

      } catch (error: any) {
        logger.error({ roomId, error: error.message }, 'start_2v2_party error');
        socket.emit('start_error', { 
          reason: 'START_FAILED', 
          message: error.message 
        });
      }
    });

    socket.on('disconnect', async () => {
      logger.info({ clientId: id }, 'Client disconnected');
      const playerId = socket.data.identity?.id ?? id;
      const changedRooms: string[] = [];
      
      // Remove from matchmaking queue immediately
      matchmakingManager.removeFromQueue(playerId);
      
      // Find all rooms containing this player and mark as disconnected
      const allRooms = getAllRooms();
      for (const room of allRooms) {
        const player = room.players.find((p) => p.id === playerId);
        if (player) {
          logger.info({ roomId: room.id, playerId, socketId: socket.id }, 'disconnect: marking player as disconnected');
          player.connected = false;
          changedRooms.push(room.id);
        }
      }
      
      // Notify all affected rooms about disconnection
      for (const roomId of changedRooms) {
        const room = getRoom(roomId);
        if (!room) continue;
        io.to(roomId).emit('room_update', { 
          roomId, 
          players: room.players.map((p) => ({ id: p.id, name: p.name, role: p.role, taken: p.taken, connected: p.connected ?? true })), 
          ownerId: room.ownerId,
          accessCode: room.accessCode,
          inviteToken: room.inviteToken
        });
      }
      
      // Set a timer to fully remove player if not reconnected within 30 minutes (1800 seconds)
      // This gives players enough time to stay in lobby without starting the game
      setTimeout(async () => {
        const stillDisconnected = changedRooms.some((roomId) => {
          const room = getRoom(roomId);
          const player = room?.players.find((p) => p.id === playerId);
          return player && player.connected === false;
        });
        
        if (stillDisconnected) {
          logger.info({ playerId }, 'disconnect: timeout - fully removing disconnected player');
          
          // Remove from old player tracking
          removePlayerFromAllRooms(playerId);
          
          // Also remove from member tracking and handle room deletion
          for (const roomId of changedRooms) {
            const room = getRoom(roomId);
            if (!room) continue;
            
            try {
              // Use leaveMemberRoom for proper cleanup
              const result = leaveMemberRoom(roomId, playerId);
              
              if (result.roomDeleted) {
                // Room was deleted, cancel all pending invites
                const cancelledInvites = await inviteService.cancelInvitesByRoomDeletion(roomId);
                
                // Notify invitees that room was deleted
                for (const inv of cancelledInvites) {
                  const inviteeSocket = Array.from(io.sockets.sockets.values()).find(
                    (s) => s.data.identity?.id === inv.inviteeId
                  );
                  if (inviteeSocket) {
                    inviteeSocket.emit('invite_cancelled', {
                      inviteId: inv.id,
                      reason: 'ROOM_DELETED',
                    });
                  }
                }
                
                logger.info({ roomId, playerId }, 'disconnect: room deleted (no members left)');
              } else {
                // Emit update to remaining members
                io.to(roomId).emit('room_update', { 
                  roomId, 
                  players: room.players.map((p) => ({ id: p.id, name: p.name, role: p.role, taken: p.taken, connected: p.connected ?? true })),
                  members: room.members?.map(m => ({
                    userId: m.userId,
                    name: m.name,
                    roleInRoom: m.roleInRoom,
                    joinedAt: m.joinedAt,
                  })),
                  hostId: room.hostId,
                  ownerId: room.ownerId,
                  accessCode: room.accessCode,
                  inviteToken: room.inviteToken
                });
                
                // If host changed, notify
                if (result.wasHost && result.newHostId) {
                  io.to(roomId).emit('host_changed', {
                    newHostId: result.newHostId,
                  });
                }
              }
            } catch (error: any) {
              logger.error({ roomId, playerId, error: error.message }, 'disconnect: error during member leave');
            }
          }
        }
      }, 1800000); // 30 minutes in milliseconds
    });
  });
})();
