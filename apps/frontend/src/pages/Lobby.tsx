import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { connect } from '../services/socket';
import { getOrCreateGuestId } from '../utils/guest';

const LOBBY_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

type LobbyProps = {
  playerName: string;
  onJoin: (roomId: string, name: string, code?: string, inviteToken?: string) => void;
};

type RoomInfo = {
  id: string;
  size: number;
};

type AccessCredentials = {
  roomId: string;
  visibility: 'public' | 'private';
  accessCode?: string;
  inviteToken?: string;
};

const Lobby: React.FC<LobbyProps> = ({ playerName, onJoin }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [credentials, setCredentials] = useState<AccessCredentials | null>(null);
  const [joinCode, setJoinCode] = useState<string>('');
  const [joinError, setJoinError] = useState<string>('');

  useEffect(() => {
    const s = connect(playerName || 'guest');

    s.off('rooms_list');
    s.off('room_created');
    s.off('join_error');
    s.on('rooms_list', (r: RoomInfo[]) => {
      setRooms(r);
    });

    s.on('room_created', (payload: { roomId: string; visibility?: string; accessCode?: string; inviteToken?: string }) => {
      if (payload.visibility === 'private') {
        // Show credentials modal for private rooms
        setCredentials({
          roomId: payload.roomId,
          visibility: 'private',
          accessCode: payload.accessCode,
          inviteToken: payload.inviteToken
        });
      } else {
        onJoin(payload.roomId, playerName);
      }
    });

    s.on('join_error', (err: { reason: string; message?: string }) => {
      setJoinError(err.message || 'Failed to join room');
    });

    setSocket(s);

    // initial HTTP fetch
    fetch(`${LOBBY_URL}/rooms`)
      .then((r) => r.json())
      .then((list: RoomInfo[]) => setRooms(list))
      .catch(console.error);

    // Do not disconnect here; keep the shared socket alive across views
  }, [playerName, onJoin]);

  const handleCreate = () => {
    if (!socket || !playerName) return;

    const guestId = getOrCreateGuestId();
    socket.emit('auth', { guestId, name: playerName, role: 'player' });
    // pass visibility and name in payload
    socket.emit('create_room', { name: playerName, visibility });
  };

  const handleJoin = (roomId: string) => {
    if (!socket || !playerName) return;
    setJoinError('');

    const guestId = getOrCreateGuestId();
    socket.emit('auth', { guestId, name: playerName, role: 'player' });
    // Game.tsx will emit join_room when it mounts - just trigger navigation here
    onJoin(roomId, playerName);
  };

  const handleJoinByCode = () => {
    if (!socket || !joinCode.trim()) {
      setJoinError('Please enter a room ID or code');
      return;
    }
    setJoinError('');

    const guestId = getOrCreateGuestId();
    socket.emit('auth', { guestId, name: playerName, role: 'player' });

    const input = joinCode.trim();
    // Store this so we know we're waiting for join response
    let actualRoomId = '';
    let joinCode_value = '';
    let isAccessCode = /^[a-z0-9]{6}$/i.test(input);

    // One-time listener to handle join response
    const handleRoomUpdate = (data: { roomId: string }) => {
      actualRoomId = data.roomId;
      socket.off('room_update', handleRoomUpdate);
      socket.off('join_error', handleJoinError);
      setJoinCode('');
      // Prosleđi code ili samo roomId zavisno od toga što je korišten
      if (isAccessCode) {
        onJoin(actualRoomId, playerName, input); // input je code
      } else {
        onJoin(actualRoomId, playerName); // input je roomId
      }
    };

    const handleJoinError = (err: { reason: string; message?: string }) => {
      setJoinError(err.message || 'Failed to join room');
      socket.off('room_update', handleRoomUpdate);
      socket.off('join_error', handleJoinError);
    };

    socket.once('room_update', handleRoomUpdate);
    socket.once('join_error', handleJoinError);

    // Send join request
    if (isAccessCode) {
      socket.emit('join_room', { code: input, guestId, name: playerName });
    } else {
      socket.emit('join_room', { roomId: input, guestId, name: playerName });
    }

    // Safety timeout - if no response in 5 seconds, show error
    setTimeout(() => {
      socket.off('room_update', handleRoomUpdate);
      socket.off('join_error', handleJoinError);
      if (!actualRoomId) {
        setJoinError('Join request timed out. Please try again.');
      }
    }, 5000);
  };

  const handleJoinFromCredentials = () => {
    if (!credentials || !socket) return;
    setJoinError('');

    const guestId = getOrCreateGuestId();
    socket.emit('auth', { guestId, name: playerName, role: 'player' });
    // Don't emit join_room here - let Game.tsx do it when it mounts with inviteToken prop
    
    setCredentials(null);
    onJoin(credentials.roomId, playerName, undefined, credentials.inviteToken);
  };

  const inviteLink = credentials
    ? `${window.location.origin}?room=${credentials.roomId}&invite=${credentials.inviteToken}`
    : '';

  return (
    <div className="lobby container">
      <h1>Zing — Lobby</h1>

      <div className="lobby-section">
        <h2>Create Room</h2>
        <p>Playing as: <strong>{playerName}</strong></p>
        
        <div className="visibility-toggle">
          <label>
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={visibility === 'public'}
              onChange={(e) => setVisibility(e.target.value as 'public')}
            />
            Public
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={visibility === 'private'}
              onChange={(e) => setVisibility(e.target.value as 'private')}
            />
            Private
          </label>
        </div>

        <button onClick={handleCreate} disabled={!playerName} className="btn-primary">
          Create Room
        </button>
      </div>

      {credentials && (
        <div className="credentials-modal">
          <div className="modal-content">
            <h2>Private Room Created!</h2>
            <p>Share these with your friends:</p>
            
            <div className="credential-item">
              <label>Access Code:</label>
              <div className="credential-row">
                <input type="text" readOnly value={credentials.accessCode || ''} />
                <button onClick={() => navigator.clipboard.writeText(credentials.accessCode || '')} className="btn-copy">
                  Copy
                </button>
              </div>
            </div>

            <div className="credential-item">
              <label>Invite Link:</label>
              <div className="credential-row">
                <input type="text" readOnly value={inviteLink} />
                <button onClick={() => navigator.clipboard.writeText(inviteLink)} className="btn-copy">
                  Copy
                </button>
              </div>
            </div>

            <button onClick={handleJoinFromCredentials} className="btn-primary">
              Enter Room
            </button>
          </div>
        </div>
      )}

      <div className="lobby-section">
        <h2>Join Room</h2>
        <div className="join-by-code">
          <input
            type="text"
            placeholder="Enter room ID or code (e.g., vpq6rc)"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleJoinByCode()}
          />
          <button onClick={handleJoinByCode} className="btn-secondary">
            Join
          </button>
        </div>
        {joinError && <p className="error">{joinError}</p>}
      </div>

      <div className="lobby-section">
        <h2>Open Rooms</h2>
        <ul>
          {rooms.map((r) => (
            <li key={r.id}>
              {r.id} — {r.size} {r.size === 1 ? 'player' : 'players'}
              <button onClick={() => handleJoin(r.id)} disabled={!playerName} className="btn-secondary">
                Join
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lobby;