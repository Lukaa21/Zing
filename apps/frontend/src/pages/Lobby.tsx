import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const LOBBY_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const Lobby: React.FC<{ onJoin: (roomId: string, name?: string) => void }> = ({ onJoin }) => {
  const [name, setName] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    const s = io(LOBBY_URL);
    s.on('connect', () => console.log('connected to backend'));
    s.on('rooms_list', (r: any) => setRooms(r));
    setSocket(s);
    // initial fetch
    fetch(`${LOBBY_URL}/rooms`).then((r) => r.json()).then((list) => setRooms(list)).catch(console.error);
    return () => s.disconnect();
  }, []);

  const handleCreate = () => {
    if (!socket) return;
    socket.emit('auth', { name, role: 'player' });
    socket.emit('create_room', {});
    socket.on('room_created', (payload: any) => {
      onJoin(payload.roomId, name);
    });
  };

  const handleJoin = (roomId: string) => {
    if (!socket) return;
    socket.emit('auth', { name, role: 'player' });
    socket.emit('join_room', { roomId });
    onJoin(roomId, name);
  };

  return (
    <div className="lobby container">
      <h1>Zing — Lobby</h1>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        <button onClick={handleCreate} disabled={!name}>Create Room</button>
      </div>

      <h2>Open Rooms</h2>
      <ul>
        {rooms.map((r) => (
          <li key={r.id}>
            {r.id} — {r.size}
            <button onClick={() => handleJoin(r.id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
