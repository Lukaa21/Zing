import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { connect } from '../services/socket';
import { getOrCreateGuestId } from '../utils/guest';
import { useAuth } from '../context/AuthContext';
import MatchHistory from '../components/MatchHistory';

type LobbyProps = {
  playerName: string;
  onJoin: (roomId: string, name: string, code?: string, inviteToken?: string, directToGame?: boolean) => void;
  showMatchHistory?: boolean;
  onMatchHistoryClose?: () => void;
};

type AccessCredentials = {
  roomId: string;
  visibility: 'public' | 'private';
  accessCode?: string;
  inviteToken?: string;
};

type MatchmakingMode = '1v1' | '2v2';

const Lobby: React.FC<LobbyProps> = ({ playerName, onJoin, showMatchHistory, onMatchHistoryClose }) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [credentials, setCredentials] = useState<AccessCredentials | null>(null);
  const [joinCode, setJoinCode] = useState<string>('');
  const [joinError, setJoinError] = useState<string>('');

  // Matchmaking state
  const [selectedMode, setSelectedMode] = useState<MatchmakingMode>('1v1');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);

  useEffect(() => {
    const s = connect(playerName || 'guest', 'player', token || undefined);

    // Remove old public room listeners
    s.off('rooms_list');
    s.off('room_created');
    s.off('join_error');

    // Private room creation listener
    s.on(
      'room_created',
      (payload: { roomId: string; visibility?: string; accessCode?: string; inviteToken?: string }) => {
        if (payload.visibility === 'private') {
          setCredentials({
            roomId: payload.roomId,
            visibility: 'private',
            accessCode: payload.accessCode,
            inviteToken: payload.inviteToken,
          });
        }
      }
    );

    // Matchmaking listeners
    s.on('queue_joined', (payload: { mode: MatchmakingMode; position?: number }) => {
      console.log('Joined queue:', payload);
      setIsSearching(true);
      setQueuePosition(payload.position || null);
    });

    s.on('queue_left', () => {
      console.log('Left queue');
      setIsSearching(false);
      setQueuePosition(null);
    });

    s.on('match_found', (payload: { roomId: string; mode: MatchmakingMode; players: any[] }) => {
      console.log('Match found!', payload);
      setIsSearching(false);
      setQueuePosition(null);
      // Navigate directly to game (matchmaking auto-starts)
      onJoin(payload.roomId, playerName, undefined, undefined, true);
    });

    s.on('matchmaking_error', (err: { reason: string }) => {
      console.error('Matchmaking error:', err);
      setIsSearching(false);
      setQueuePosition(null);
      setJoinError(`Matchmaking error: ${err.reason}`);
    });

    s.on('join_error', (err: { reason: string; message?: string }) => {
      setJoinError(err.message || 'Failed to join room');
    });

    setSocket(s);

    return () => {
      // Cleanup listeners when component unmounts
      s.off('room_created');
      s.off('queue_joined');
      s.off('queue_left');
      s.off('match_found');
      s.off('matchmaking_error');
      s.off('join_error');
    };
  }, [playerName, onJoin, token]);

  const handleFindGame = () => {
    if (!socket || !playerName) return;

    const guestId = getOrCreateGuestId();

    // Wait for auth_ok before sending find_game to ensure socket.data.identity is set
    const onAuthOkMatchmaking = () => {
      console.log('Auth complete, now finding game:', selectedMode);
      socket.emit('find_game', { mode: selectedMode });
      socket.off('auth_ok', onAuthOkMatchmaking);
    };

    socket.on('auth_ok', onAuthOkMatchmaking);

    socket.emit('auth', { token: token || undefined, guestId, name: playerName, role: 'player' });
  };

  const handleCancelSearch = () => {
    if (!socket) return;
    socket.emit('cancel_find_game');
  };

  const handleCreatePrivate = () => {
    if (!socket || !playerName) return;

    const guestId = getOrCreateGuestId();
    
    // Wait for auth_ok before creating room to ensure socket.data.identity is set
    const onAuthOkCreate = () => {
      socket.emit('create_private_room', { name: playerName });
      socket.off('auth_ok', onAuthOkCreate);
    };
    socket.on('auth_ok', onAuthOkCreate);
    
    socket.emit('auth', { token: token || undefined, guestId, name: playerName, role: 'player' });
  };

  const handleJoinByCode = () => {
    if (!socket || !joinCode.trim()) {
      setJoinError('Please enter a room ID or code');
      return;
    }
    setJoinError('');

    const guestId = getOrCreateGuestId();
    const input = joinCode.trim();
    let actualRoomId = '';
    const isAccessCode = /^[a-z0-9]{6}$/i.test(input);

    let timeoutId: number | null = null;

    const clearJoinTimeout = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const cleanupJoinListeners = () => {
      socket.off('room_update', handleRoomUpdate);
      socket.off('join_error', handleJoinError);
      socket.off('auth_ok', onAuthOkJoin);
      clearJoinTimeout();
    };

    const handleRoomUpdate = (data: { roomId: string }) => {
      cleanupJoinListeners();
      actualRoomId = data.roomId;
      setJoinCode('');

      if (isAccessCode) {
        onJoin(actualRoomId, playerName, input);
      } else {
        onJoin(actualRoomId, playerName);
      }
    };

    const handleJoinError = (err: { reason: string; message?: string }) => {
      cleanupJoinListeners();
      setJoinError(err.message || 'Failed to join room');
    };

    // Wait for auth_ok before emitting join_room
    const onAuthOkJoin = () => {
      if (isAccessCode) {
        socket.emit('join_room', { code: input, guestId, name: playerName });
      } else {
        socket.emit('join_room', { roomId: input, guestId, name: playerName });
      }
      socket.off('auth_ok', onAuthOkJoin);
    };

    socket.once('room_update', handleRoomUpdate);
    socket.once('join_error', handleJoinError);
    socket.on('auth_ok', onAuthOkJoin);

    socket.emit('auth', { token: token || undefined, guestId, name: playerName, role: 'player' });

    // Timeout fallback
    timeoutId = window.setTimeout(() => {
      setJoinError('Join request timed out. Please try again.');
      cleanupJoinListeners();
    }, 5000);
  };

  const handleJoinFromCredentials = () => {
    if (!credentials || !socket) return;
    setJoinError('');

    const guestId = getOrCreateGuestId();
    socket.emit('auth', { guestId, name: playerName, role: 'player' });

    setCredentials(null);
    onJoin(credentials.roomId, playerName, undefined, credentials.inviteToken);
  };

  const inviteLink = credentials
    ? `${window.location.origin}?room=${credentials.roomId}&invite=${credentials.inviteToken}`
    : '';

  return (
    <div className="lobby container">
      <h1>Zing — Lobby</h1>
      <p className="player-info">
        Playing as: <strong>{playerName}</strong>
      </p>

      {/* MATCHMAKING SECTION */}
      <div className="lobby-section matchmaking-section">
        <h2>Find Game</h2>

        {!isSearching ? (
          <>
            <div className="mode-selector">
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="1v1"
                  checked={selectedMode === '1v1'}
                  onChange={(e) => setSelectedMode(e.target.value as MatchmakingMode)}
                />
                1v1
              </label>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="2v2"
                  checked={selectedMode === '2v2'}
                  onChange={(e) => setSelectedMode(e.target.value as MatchmakingMode)}
                />
                2v2
              </label>
            </div>
            <button onClick={handleFindGame} disabled={!playerName} className="btn-primary btn-find-game">
              Find Game ({selectedMode})
            </button>
          </>
        ) : (
          <div className="searching-status">
            <p className="searching-text">Searching for {selectedMode} match...</p>
            {queuePosition && <p className="queue-position">Position in queue: {queuePosition}</p>}
            <button onClick={handleCancelSearch} className="btn-secondary">
              Cancel Search
            </button>
          </div>
        )}
      </div>

      {/* PRIVATE ROOMS SECTION */}
      <div className="lobby-section">
        <h2>Private Room</h2>
        <button onClick={handleCreatePrivate} disabled={!playerName} className="btn-secondary">
          Create Private Room
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
                <button
                  onClick={() => navigator.clipboard.writeText(credentials.accessCode || '')}
                  className="btn-copy"
                >
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
        <h2>Join Private Room</h2>
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

      {/* MATCH HISTORY MODAL */}
      {showMatchHistory && <MatchHistory onClose={onMatchHistoryClose || (() => {})} />}
    </div>
  );
};

export default Lobby;
