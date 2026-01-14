import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { connect } from '../services/socket';
import { getOrCreateGuestId } from '../utils/guest';
import { useAuth } from '../context/AuthContext';
import MatchHistory from '../components/MatchHistory';
import '../styles/Lobby.css';

type LobbyProps = {
  playerName: string;
  onJoin: (roomId: string, name: string, code?: string, inviteToken?: string, directToGame?: boolean) => void;
  showMatchHistory?: boolean;
  onMatchHistoryClose?: () => void;
  onShowMatchHistory?: () => void;
  onNavigateToFriends?: () => void;
  onShowLeaderboard?: () => void;
  onShowAchievements?: () => void;
  onLogout?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToRegister?: () => void;
  isAuthenticated?: boolean;
};

type AccessCredentials = {
  roomId: string;
  visibility: 'public' | 'private';
  accessCode?: string;
  inviteToken?: string;
};

type MatchmakingMode = '1v1' | '2v2';

const Lobby: React.FC<LobbyProps> = ({ 
  playerName, 
  onJoin, 
  showMatchHistory, 
  onMatchHistoryClose,
  onShowMatchHistory,
  onNavigateToFriends,
  onShowLeaderboard,
  onShowAchievements,
  onLogout,
  onNavigateToLogin,
  onNavigateToRegister,
  isAuthenticated = false
}) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [credentials, setCredentials] = useState<AccessCredentials | null>(null);
  const [joinCode, setJoinCode] = useState<string>('');
  const [joinError, setJoinError] = useState<string>('');

  // Matchmaking state
  const [selectedMode, setSelectedMode] = useState<MatchmakingMode>('1v1');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  
  // User menu state
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

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
    <div className="lobby-container">
      <div className="lobby-content">
        {/* Header */}
        <div className="lobby-header">
          <div className="lobby-header-content">
            <div className="lobby-header-left">
              <h1 className="lobby-title">Zing</h1>
              <p className="lobby-player-info">
                Welcome, <span className="lobby-player-name">{playerName}</span>
              </p>
            </div>
            
            <div className="lobby-header-right">
              {isAuthenticated ? (
                <nav className="lobby-nav">
                  <button
                    className="lobby-nav-btn"
                    onClick={onNavigateToFriends}
                    title="Friends"
                  >
                    <span className="nav-icon">👥</span>
                    <span className="nav-label">Friends</span>
                  </button>
                  <button
                    className="lobby-nav-btn"
                    onClick={onShowMatchHistory}
                    title="Match History"
                  >
                    <span className="nav-icon">📜</span>
                    <span className="nav-label">History</span>
                  </button>
                  <button
                    className="lobby-nav-btn"
                    onClick={onShowLeaderboard}
                    title="Leaderboard"
                  >
                    <span className="nav-icon">📊</span>
                    <span className="nav-label">Leaderboard</span>
                  </button>
                  <button
                    className="lobby-nav-btn"
                    onClick={onShowAchievements}
                    title="Achievements"
                  >
                    <span className="nav-icon">🏆</span>
                    <span className="nav-label">Achievements</span>
                  </button>
                  <button
                    className="lobby-nav-btn lobby-nav-btn-logout"
                    onClick={onLogout}
                    title="Logout"
                  >
                    <span className="nav-icon">🚪</span>
                    <span className="nav-label">Logout</span>
                  </button>
                </nav>
              ) : (
                <nav className="lobby-nav lobby-nav-guest">
                  <button
                    className="lobby-nav-btn lobby-nav-btn-login"
                    onClick={onNavigateToLogin}
                    title="Login"
                  >
                    <span className="nav-icon">🔐</span>
                    <span className="nav-label">Login</span>
                  </button>
                  <button
                    className="lobby-nav-btn lobby-nav-btn-register"
                    onClick={onNavigateToRegister}
                    title="Register"
                  >
                    <span className="nav-icon">✨</span>
                    <span className="nav-label">Register</span>
                  </button>
                </nav>
              )}
            </div>
          </div>
        </div>

        {/* Main Content - 2 Column Grid */}
        <div className="lobby-main-grid">
          {/* Find Game Card */}
          <div className="lobby-card">
            <div className="lobby-card-icon">🎮</div>
            <h2 className="lobby-card-title">Find Game</h2>
            <p className="lobby-card-description">
              Jump into quick matchmaking and compete against other players
            </p>

            {!isSearching ? (
              <>
                {/* Mode Selector */}
                <div className="mode-selector">
                  <label className={`mode-option ${selectedMode === '1v1' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="mode"
                      value="1v1"
                      checked={selectedMode === '1v1'}
                      onChange={(e) => setSelectedMode(e.target.value as MatchmakingMode)}
                    />
                    <span className="mode-option-emoji">⚔️</span>
                    <span className="mode-option-label">1v1</span>
                  </label>
                  <label className={`mode-option ${selectedMode === '2v2' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="mode"
                      value="2v2"
                      checked={selectedMode === '2v2'}
                      onChange={(e) => setSelectedMode(e.target.value as MatchmakingMode)}
                    />
                    <span className="mode-option-emoji">👥</span>
                    <span className="mode-option-label">2v2</span>
                  </label>
                </div>

                <button
                  className="lobby-btn lobby-btn-primary"
                  onClick={handleFindGame}
                  disabled={!playerName}
                >
                  Start Matchmaking
                </button>
              </>
            ) : (
              <div className="searching-status">
                <div className="searching-animation">
                  <div className="searching-spinner"></div>
                </div>
                <p className="searching-text">Finding match...</p>
                {queuePosition && <p className="queue-position">Queue position: {queuePosition}</p>}
                <button
                  className="lobby-btn lobby-btn-secondary"
                  onClick={handleCancelSearch}
                >
                  Cancel Search
                </button>
              </div>
            )}
          </div>

          {/* Private Room Card */}
          <div className="lobby-card">
            <div className="lobby-card-icon">🏠</div>
            <h2 className="lobby-card-title">Private Room</h2>
            <p className="lobby-card-description">
              Create a private room to play with friends
            </p>

            <button
              className="lobby-btn lobby-btn-primary"
              onClick={handleCreatePrivate}
              disabled={!playerName}
            >
              Create Private Room
            </button>
          </div>
        </div>

        {/* Join By Code - Full Width */}
        <div className="lobby-join-section">
          <div className="lobby-join-header">
            <div className="lobby-join-icon">🔑</div>
            <h2 className="lobby-join-title">Join by Room Code</h2>
          </div>
          <div className="join-input-group">
            <input
              type="text"
              className="join-input"
              placeholder="Enter 6-digit room code..."
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoinByCode()}
              maxLength={6}
            />
            <button
              className="lobby-btn lobby-btn-primary join-btn"
              onClick={handleJoinByCode}
              disabled={!joinCode.trim()}
            >
              Join Room
            </button>
          </div>
          {joinError && <div className="lobby-error">{joinError}</div>}
        </div>

        {/* Credentials Modal */}
        {credentials && (
          <div className="credentials-modal">
            <div className="credentials-modal-content">
              <h2 className="credentials-modal-title">Room Created!</h2>
              <p className="credentials-modal-subtitle">
                Share these credentials with your friends to join
              </p>

              <div className="credential-item">
                <label className="credential-label">Access Code</label>
                <div className="credential-row">
                  <input
                    type="text"
                    className="credential-input"
                    value={credentials.accessCode || ''}
                    readOnly
                  />
                  <button
                    className="credential-copy-btn"
                    onClick={() => navigator.clipboard.writeText(credentials.accessCode || '')}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="credential-item">
                <label className="credential-label">Invite Link</label>
                <div className="credential-row">
                  <input
                    type="text"
                    className="credential-input"
                    value={inviteLink}
                    readOnly
                  />
                  <button
                    className="credential-copy-btn"
                    onClick={() => navigator.clipboard.writeText(inviteLink)}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <button
                className="lobby-btn lobby-btn-primary credentials-enter-btn"
                onClick={handleJoinFromCredentials}
              >
                Enter Room
              </button>
            </div>
          </div>
        )}

        {/* Match History Modal */}
        {showMatchHistory && <MatchHistory onClose={onMatchHistoryClose || (() => {})} />}
      </div>
    </div>
  );
};

export default Lobby;
