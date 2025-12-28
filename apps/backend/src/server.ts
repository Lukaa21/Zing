import './env';
import express, { type Request, type Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createAdapter } from 'socket.io-redis';
import Redis from 'ioredis';
import pino from 'pino';
import { createRoom, joinRoom, startGame, getRoom, handleIntent, leaveRoom, removePlayerFromAllRooms, getRoomByAccessCode, validateRoomAccess, generateAndStoreReconnectToken, validateReconnectToken, getAllRooms } from './game/roomManager';
import { matchmakingManager } from './game/matchmakingManager';
import cors from 'cors';
import authRoutes from './auth/routes';
import friendRoutes from './friends/routes';
import { verifyToken } from './auth/jwt';
import { prisma } from './db/prisma';

const logger = pino();

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    // Accept all localhost origins (5173, 5174, etc.)
    if (!origin || origin.match(/^http:\/\/localhost(:\d+)?$/)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
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


(async function bootstrap() {
  server.listen(PORT, () => {
    logger.info({ port: PORT }, 'Backend server started');
  });

  const io = new Server(server, {
    cors: { origin: '*' }
  });

  // Redis adapter for scaling — if REDIS_URL exists attach adapters
  const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
  const pubClient = new Redis(REDIS_URL);
  const subClient = pubClient.duplicate();
  try {
    await pubClient.ping();
    await subClient.ping();
    io.adapter(createAdapter({ pubClient, subClient } as any));
    logger.info('Redis adapter attached to Socket.IO');
  } catch (e) {
    logger.warn('Could not attach Redis adapter. Running single-node socket server');
  }

  // Setup basic socket handlers
  io.on('connection', (socket) => {
    const { id } = socket;
    logger.info({ clientId: id }, 'Client connected');

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
            socket.join('lobby');
            socket.emit('auth_ok', { id: user.id, username: user.username, type: 'user', role });
            io.to('lobby').emit('lobby_update', { time: new Date().toISOString() });
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
              playerSocket.emit('match_found', {
                roomId: result.room.id,
                mode,
                players: result.room.players.map((p: any) => ({ 
                  id: p.id, 
                  name: p.name, 
                  team: p.team 
                }))
              });
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
              ownerId: result.room.ownerId 
            });
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

    // PRIVATE ROOM CREATION (keep for invite-based private games)
    socket.on('create_private_room', (payload: any) => {
      const room = createRoom('private');
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
      
      io.to(room.id).emit('room_update', { 
        roomId: room.id, 
        players: room.players.map((p) => ({ id: p.id, name: p.name ?? p.id, role: p.role, taken: p.taken })), 
        ownerId: room.ownerId 
      });
      socket.emit('room_created', { 
        roomId: room.id, 
        visibility: 'private', 
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
        }
        
        logger.info({ roomId: actualRoomId, playersAfterJoin: room.players.map((p: any) => ({ id: p.id, name: p.name })) }, 'join_room: emitting room_update');
        io.to(actualRoomId).emit('room_update', { roomId: actualRoomId, players: room.players.map((p: any) => ({ id: p.id, name: p.name ?? p.id, role: p.role, taken: p.taken })), ownerId: room.ownerId });
        
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

    socket.on('rejoin_room', ({ roomId, reconnectToken }: any) => {
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

      // Find player by playerId in the room
      const player = room.players.find((p: any) => p.id === playerId);
      if (!player) {
        logger.error({ roomId, playerId }, 'rejoin_room: player not found in room');
        socket.emit('rejoin_error', { reason: 'player_not_found' });
        return;
      }

      // Update player connection
      logger.info({ roomId, playerId, newSocketId: socket.id }, 'rejoin_room: reconnecting player');
      player.socketId = socket.id;
      player.connected = true;
      socket.join(roomId);
      
      // Set socket identity to the rejoined player (guest identity)
      socket.data.identity = { type: 'guest', id: playerId };
      socket.data.displayName = player.name;
      socket.data.user = { id: playerId, name: player.name, role: player.role || 'player' };
      
      // Send auth_ok to confirm identity
      socket.emit('auth_ok', { id: playerId, name: player.name, role: player.role, type: 'guest' });

      // Send reconnect token again for next refresh
      const newReconnectToken = generateAndStoreReconnectToken(roomId, playerId);
      socket.emit('reconnect_token', { roomId, token: newReconnectToken });

      // Send current game state if available
      if (room.state) {
        socket.emit('game_state', room.state);
      }

      // Notify all players in room
      io.to(roomId).emit('room_update', { 
        roomId, 
        players: room.players.map((p: any) => ({ id: p.id, name: p.name ?? p.id, role: p.role, taken: p.taken, connected: p.connected ?? true })), 
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
      io.to(roomId).emit('room_update', { roomId, players: room.players.map((p) => ({ id: p.id, name: p.name, role: p.role, taken: p.taken })), ownerId: room.ownerId });
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
      if (room.state) io.to(roomId).emit('game_state', room.state);
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
    

    socket.on('disconnect', () => {
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
          ownerId: room.ownerId 
        });
      }
      
      // Set a timer to fully remove player if not reconnected within 120 seconds
      setTimeout(() => {
        const stillDisconnected = changedRooms.some((roomId) => {
          const room = getRoom(roomId);
          const player = room?.players.find((p) => p.id === playerId);
          return player && player.connected === false;
        });
        
        if (stillDisconnected) {
          logger.info({ playerId }, 'disconnect: timeout - fully removing disconnected player');
          removePlayerFromAllRooms(playerId);
          for (const roomId of changedRooms) {
            const room = getRoom(roomId);
            if (!room) continue;
            io.to(roomId).emit('room_update', { 
              roomId, 
              players: room.players.map((p) => ({ id: p.id, name: p.name, role: p.role, taken: p.taken, connected: p.connected ?? true })) 
            });
          }
        }
      }, 120000);
    });
  });
})();
