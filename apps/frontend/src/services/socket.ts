import { io, type Socket } from 'socket.io-client';
import { getOrCreateGuestId } from '../utils/guest';

const BACKEND_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export type Role = 'player' | 'spectator';

let socketInstance: Socket | null = null;
let lastToken: string | undefined = undefined;

export function connect(name: string, role: Role = 'player', token?: string): Socket {
  const guestId = getOrCreateGuestId();
  
  // If token changed, disconnect old socket to clear server-side state
  if (socketInstance && token !== lastToken) {
    console.log('Token changed, disconnecting old socket');
    socketInstance.disconnect();
    socketInstance = null;
  }
  
  lastToken = token;
  
  if (socketInstance && socketInstance.connected) {
    // re-auth with the provided name/role/guestId/token
    socketInstance.emit('auth', { guestId, name, role, token: token || undefined });
    return socketInstance;
  }

  socketInstance = io(BACKEND_URL, { transports: ['websocket'] });

  socketInstance.on('connect', () => {
    socketInstance?.emit('auth', { guestId, name, role, token: token || undefined });
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
