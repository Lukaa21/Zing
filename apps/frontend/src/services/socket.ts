import { io, type Socket } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000';

export type Role = 'player' | 'spectator';

let socketInstance: Socket | null = null;

export function connect(name: string, role: Role = 'player'): Socket {
  if (socketInstance && socketInstance.connected) {
    // re-auth with the provided name/role
    socketInstance.emit('auth', { name, role });
    return socketInstance;
  }

  socketInstance = io(BACKEND_URL, { transports: ['websocket'] });

  socketInstance.on('connect', () => {
    socketInstance?.emit('auth', { name, role });
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
