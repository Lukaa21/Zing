import { io, type Socket } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000';

export type Role = 'player' | 'spectator';

export function connect(name: string, role: Role = 'player'): Socket {
  const socket = io(BACKEND_URL, { transports: ['websocket'] });

  socket.on('connect', () => {
    socket.emit('auth', { name, role });
  });

  return socket;
}
