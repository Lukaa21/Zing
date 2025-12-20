import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createAdapter } from 'socket.io-redis';
import Redis from 'ioredis';
import pino from 'pino';
import { createRoom, joinRoom, startGame, getRoom, handleIntent, listRooms, leaveRoom, removePlayerFromAllRooms, getRoomByAccessCode, validateRoomAccess } from './game/roomManager';
import cors from 'cors';

const logger = pino();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
}));
const server = http.createServer(app);

const PORT = process.env.BACKEND_PORT || 4000;

// Simple health endpoint
app.get('/health', (_req: Request, res: Response) => res.status(200).json({ ok: true }));
app.get('/rooms', (_req: Request, res: Response) => res.json(listRooms()));


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

    socket.on('auth', (payload) => {
      const { guestId, name, role } = payload || {};
      // ephemeral auth for MVP
      if (!name) {
        socket.emit('auth_error', { reason: 'name_required' });
        return;
      }
      socket.data.identity = { type: 'guest', id: guestId };
      socket.data.displayName = name;
      socket.data.user = { id: guestId, name, role: role || 'player' };
      socket.join('lobby');
      socket.emit('auth_ok', { id: guestId, name, role });
      io.to('lobby').emit('lobby_update', { time: new Date().toISOString() });
    });

    socket.on('create_room', (payload: any) => {
      const visibility = payload?.visibility || 'public';
      const room = createRoom(visibility);
      // prefer server-side auth name, fallback to payload name if provided
      const creatorName = socket.data.displayName ?? payload?.name ?? 'guest';
      const creatorId = socket.data.identity?.id ?? socket.id;
      
      logger.info({ clientId: socket.id, creatorName, visibility, accessCode: room.accessCode }, 'create_room: creating room and joining creator');
      joinRoom(room, { id: creatorId, name: creatorName, seat: 0, role: socket.data.user?.role ?? 'player', team: 0, hand: [], taken: [] });
      // set owner id to the creator (use same ID as player)
      room.ownerId = creatorId;
      socket.join(room.id);
      // immediately emit room_update so creator sees their entry (include ownerId and access credentials for private rooms)
      io.to(room.id).emit('room_update', { roomId: room.id, players: room.players.map((p) => ({ id: p.id, name: p.name ?? p.id, role: p.role, taken: p.taken })), ownerId: room.ownerId });
      socket.emit('room_created', { roomId: room.id, visibility, accessCode: room.accessCode, inviteToken: room.inviteToken });
      io.emit('rooms_list', listRooms());
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
        
        const useName = socket.data.displayName ?? name ?? 'guest';
        const playerId = guestId || socket.id;
        
        logger.info({ clientId: socket.id, roomId: actualRoomId, guestId, playerId, name, useName, currentPlayers: room.players.map(p => p.id) }, 'join_room: processing join');
        
        // Check if player with this identity already exists in the room
        const existingPlayer = room.players.find((p: any) => p.id === playerId);
        
        if (existingPlayer) {
          // Update existing player
          logger.info({ playerId, currentName: existingPlayer.name, newName: useName }, 'join_room: updating existing player');
          existingPlayer.socketId = socket.id;
          existingPlayer.name = useName;
        } else {
          // Ensure unique name in room
          let finalName = useName;
          let counter = 2;
          while (room.players.some((p: any) => p.name === finalName)) {
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
      } else {
        socket.emit('join_error', { reason: 'room_not_found' });
      }
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

    socket.on('intent_play_card', async ({ roomId, cardId }) => {
      const room = getRoom(roomId);
      if (!room) return;
      const playerId = socket.data.identity?.id ?? socket.id;
      const ev = await handleIntent(room, { type: 'play_card', playerId, cardId });
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
      // Remove player from any rooms they may have been part of and notify rooms
      const playerId = socket.data.identity?.id ?? id;
      const changed = removePlayerFromAllRooms(playerId);
      for (const rid of changed) {
        const room = getRoom(rid);
        if (!room) continue;
        io.to(rid).emit('room_update', { roomId: rid, players: room.players.map((p) => ({ id: p.id, name: p.name, role: p.role, taken: p.taken })) });
      }
    });
  });
})();
