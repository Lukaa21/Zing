import { io, type Socket } from 'socket.io-client';
import { getOrCreateGuestId } from '../utils/guest';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000';

export type Role = 'player' | 'spectator';

let socketInstance: Socket | null = null;

export function connect(name: string, role: Role = 'player'): Socket {
  const guestId = getOrCreateGuestId();
  
  if (socketInstance && socketInstance.connected) {
    // re-auth with the provided name/role/guestId
    socketInstance.emit('auth', { guestId, name, role });
    return socketInstance;
  }

  socketInstance = io(BACKEND_URL, { transports: ['websocket'] });

  socketInstance.on('connect', () => {
    socketInstance?.emit('auth', { guestId, name, role });
  });

  return socketInstance;
}

export function getSocket(): Socket | null {
  return socketInstance;
}

export function disconnect(): void {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}
