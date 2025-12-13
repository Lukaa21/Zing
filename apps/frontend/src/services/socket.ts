import { io, Socket } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export function connect(name: string, role: string = 'player') {
  const socket: Socket = io(BACKEND_URL, { transports: ['websocket'] });
  socket.on('connect', () => {
    socket.emit('auth', { name, role });
  });
  return socket;
}
