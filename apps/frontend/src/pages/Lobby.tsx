import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const LOBBY_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

type LobbyProps = {
  onJoin: (roomId: string, name: string) => void;
};

type RoomInfo = {
  id: string;
  size: number;
};

const Lobby: React.FC<LobbyProps> = ({ onJoin }) => {
  const [name, setName] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [rooms, setRooms] = useState<RoomInfo[]>([]);

  useEffect(() => {
    const s = io(LOBBY_URL, { transports: ['websocket'] });

    s.on('connect', () => {
      console.log('connected to backend');
    });

    s.on('rooms_list', (r: RoomInfo[]) => {
      setRooms(r);
    });

    s.on('room_created', (payload: { roomId: string }) => {
      onJoin(payload.roomId, name);
    });

    setSocket(s);

    // initial HTTP fetch
    fetch(`${LOBBY_URL}/rooms`)
      .then((r) => r.json())
      .then((list: RoomInfo[]) => setRooms(list))
      .catch(console.error);

    return () => {
      s.disconnect();
    };
  }, [name, onJoin]);

  const handleCreate = () => {
    if (!socket || !name) return;

    socket.emit('auth', { name, role: 'player' });
    socket.emit('create_room');
  };

  const handleJoin = (roomId: string) => {
    if (!socket || !name) return;

    socket.emit('auth', { name, role: 'player' });
    socket.emit('join_room', { roomId });

    onJoin(roomId, name);
  };

  return (
    <div className="lobby container">
      <h1>Zing — Lobby</h1>

      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button onClick={handleCreate} disabled={!name}>
          Create Room
        </button>
      </div>

      <h2>Open Rooms</h2>
      <ul>
        {rooms.map((r) => (
          <li key={r.id}>
            {r.id} — {r.size}
            <button onClick={() => handleJoin(r.id)} disabled={!name}>
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
