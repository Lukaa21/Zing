import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createAdapter } from 'socket.io-redis';
import Redis from 'ioredis';
import pino from 'pino';
import { createRoom, joinRoom, startGame, getRoom, handleIntent, listRooms, leaveRoom, removePlayerFromAllRooms } from './game/roomManager';
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
      const { name, role } = payload || {};
      // ephemeral auth for MVP
      if (!name) {
        socket.emit('auth_error', { reason: 'name_required' });
        return;
      }
      socket.data.user = { id, name, role: role || 'player' };
      socket.join('lobby');
      socket.emit('auth_ok', { id, name, role });
      io.to('lobby').emit('lobby_update', { time: new Date().toISOString() });
    });

    socket.on('create_room', (payload) => {
      const room = createRoom();
      joinRoom(room, { id: socket.id, name: socket.data.user?.name ?? 'guest', seat: 0, role: socket.data.user?.role ?? 'player', team: 0, hand: [], taken: [] });
      socket.join(room.id);
      socket.emit('room_created', { roomId: room.id });
      io.emit('rooms_list', listRooms());
    });

    socket.on('join_room', ({ roomId }) => {
      socket.join(roomId);
      const room = getRoom(roomId);
      if (room) {
        joinRoom(room, { id: socket.id, name: socket.data.user?.name ?? 'guest', seat: room.players.length, role: socket.data.user?.role ?? 'player', team: 0, hand: [], taken: [] });
        io.to(roomId).emit('room_update', { roomId, players: room.players.map((p) => ({ id: p.id, name: p.name, role: p.role, taken: p.taken })) });
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
      leaveRoom(room, socket.id);
      socket.leave(roomId);
      io.to(roomId).emit('room_update', { roomId, players: room.players.map((p) => ({ id: p.id, name: p.name, role: p.role, taken: p.taken })) });
    });

    socket.on('intent_play_card', async ({ roomId, cardId }) => {
      const room = getRoom(roomId);
      if (!room) return;
      const ev = await handleIntent(room, { type: 'play_card', playerId: socket.id, cardId });
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
      const changed = removePlayerFromAllRooms(id);
      for (const rid of changed) {
        const room = getRoom(rid);
        if (!room) continue;
        io.to(rid).emit('room_update', { roomId: rid, players: room.players.map((p) => ({ id: p.id, name: p.name, role: p.role, taken: p.taken })) });
      }
    });
  });
})();
