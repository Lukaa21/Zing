import 'dotenv/config';
import express from 'express';
import http from 'http';
import { instrument } from '@socket.io/admin-ui';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createAdapter } from 'socket.io-redis';
import Redis from 'ioredis';
import pino from 'pino';
import { createRoom, joinRoom, startGame, getRoom, handleIntent, listRooms } from './game/roomManager';
import { v4 as uuid } from 'uuid';

const logger = pino();

const app = express();
const server = http.createServer(app);

const PORT = process.env.BACKEND_PORT || 4000;

// Simple health endpoint
app.get('/health', (_, res) => res.json({ ok: true }));
app.get('/rooms', (_, res) => res.json(listRooms()));

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
      joinRoom(room, { id: socket.id, name: socket.data.user?.name ?? 'guest', seat: 0, role: socket.data.user?.role ?? 'player', hand: [], taken: [] });
      socket.join(room.id);
      socket.emit('room_created', { roomId: room.id });
      io.emit('rooms_list', listRooms());
    });

    socket.on('join_room', ({ roomId }) => {
      socket.join(roomId);
      const room = getRoom(roomId);
      if (room) {
        joinRoom(room, { id: socket.id, name: socket.data.user?.name ?? 'guest', seat: room.players.length, role: socket.data.user?.role ?? 'player', hand: [], taken: [] });
        io.to(roomId).emit('room_update', { roomId, players: room.players.map((p) => ({ id: p.id, name: p.name, role: p.role })) });
      }
    });

    socket.on('start_game', async ({ roomId }) => {
      const room = getRoom(roomId);
      if (!room) return;
      const state = await startGame(room);
      io.to(roomId).emit('game_state', { state });
    });

    socket.on('intent_play_card', async ({ roomId, cardId }) => {
      const room = getRoom(roomId);
      if (!room) return;
      const ev = await handleIntent(room, { type: 'play_card', playerId: socket.id, cardId });
      if (ev) io.to(roomId).emit('game_event', ev);
    });

    socket.on('intent_take_talon', async ({ roomId }) => {
      const room = getRoom(roomId);
      if (!room) return;
      const ev = await handleIntent(room, { type: 'take_talon', playerId: socket.id });
      if (ev) io.to(roomId).emit('game_event', ev);
    });

    socket.on('disconnect', () => {
      logger.info({ clientId: id }, 'Client disconnected');
    });
  });
})();
