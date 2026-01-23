import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { connect } from '../services/socket';
import { getOrCreateGuestId } from '../utils/guest';
import { useAuth } from '../context/AuthContext';
import MatchHistory from '../components/MatchHistory';
import { getFriendRequests } from '../services/friends';
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
  const [joinCode, setJoinCode] = useState<string>('');
  const [joinError, setJoinError] = useState<string>('');

  // Matchmaking state
  const [selectedMode, setSelectedMode] = useState<MatchmakingMode>('1v1');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  
  // User menu state
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  
  // Rules modal state
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);

  // Notification state
  const [hasFriendRequests, setHasFriendRequests] = useState<boolean>(false);
  const [hasRoomInvites, setHasRoomInvites] = useState<boolean>(false);
  const hasNotifications = hasFriendRequests || hasRoomInvites;

  // Fetch friend requests count for notifications (polling every 10s)
  useEffect(() => {
    if (!isAuthenticated || !token) {
      setHasFriendRequests(false);
      return;
    }

    const checkFriendRequests = async () => {
      try {
        const { requests } = await getFriendRequests(token);
        setHasFriendRequests(requests.length > 0);
      } catch (err) {
        console.error('Failed to check friend requests:', err);
      }
    };

    checkFriendRequests();
    
    // Check every 10 seconds
    const interval = setInterval(checkFriendRequests, 10000);
    
    return () => clearInterval(interval);
  }, [isAuthenticated, token]);

  useEffect(() => {
    const s = connect(playerName || 'guest', 'player', token || undefined);

    // Remove old public room listeners
    s.off('rooms_list');
    s.off('room_created');
    s.off('join_error');

    // Private room creation listener - auto-join immediately
    s.on(
      'room_created',
      (payload: { roomId: string; visibility?: string; accessCode?: string; inviteToken?: string }) => {
        if (payload.visibility === 'private') {
          // Save credentials to sessionStorage so RoomScreen can display them
          sessionStorage.setItem('zing_room_access_code', payload.accessCode || '');
          sessionStorage.setItem('zing_room_invite_token', payload.inviteToken || '');
          
          // Auto-join the room immediately
          const guestId = getOrCreateGuestId();
          s.emit('auth', { guestId, name: playerName, role: 'player', token: token || undefined });
          onJoin(payload.roomId, playerName, undefined, payload.inviteToken);
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

    // Real-time room invite listeners (only for authenticated users)
    if (isAuthenticated && token) {
      const handlePendingInvites = (data: { invites: any[] }) => {
        setHasRoomInvites(data.invites.length > 0);
      };

      const handleInviteReceived = () => {
        // Immediately show badge and refresh list
        setHasRoomInvites(true);
        s.emit('get_pending_invites');
      };

      const handleInviteStatusChanged = () => {
        // Refresh list when invite is accepted/declined
        s.emit('get_pending_invites');
      };

      s.on('pending_invites', handlePendingInvites);
      s.on('invite_received', handleInviteReceived);
      s.on('invite_accepted', handleInviteStatusChanged);
      s.on('invite_declined', handleInviteStatusChanged);

      // Request pending invites immediately
      s.emit('get_pending_invites');
    }

    setSocket(s);

    return () => {
      // Cleanup all listeners when component unmounts
      s.off('room_created');
      s.off('queue_joined');
      s.off('queue_left');
      s.off('match_found');
      s.off('matchmaking_error');
      s.off('join_error');
      s.off('pending_invites');
      s.off('invite_received');
      s.off('invite_accepted');
      s.off('invite_declined');
    };
  }, [playerName, onJoin, token, isAuthenticated]);

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
      setJoinError(err.message || 'Ne postoji soba za uneseni kod');
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

  return (
    <div className="lobby-container">
      <div className="lobby-content">
        {/* Header */}
        <div className="lobby-header">
          <div className="lobby-header-content">
            <div className="lobby-header-left">
              <h1 className="lobby-title">Zing</h1>
              <p className="lobby-player-info">
                Dobrodošao, <span className="lobby-player-name">{playerName}</span>
              </p>
            </div>
            
            <div className="lobby-header-right">
              <nav className="lobby-nav">
                <button
                  className="lobby-nav-btn"
                  onClick={() => setShowRulesModal(true)}
                  title="Pravila"
                >
                  <span className="nav-icon">📖</span>
                  <span className="nav-label">Pravila</span>
                </button>
                <button
                  className="lobby-nav-btn"
                  onClick={isAuthenticated ? onNavigateToFriends : onNavigateToRegister}
                  title="Prijatelji"
                >
                  <span className="nav-icon">
                    👥
                    {hasNotifications && <span className="nav-notification-badge"></span>}
                  </span>
                  <span className="nav-label">Prijatelji</span>
                </button>
                <button
                  className="lobby-nav-btn"
                  onClick={isAuthenticated ? onShowMatchHistory : onNavigateToRegister}
                  title="Istorija"
                >
                  <span className="nav-icon">📜</span>
                  <span className="nav-label">Istorija</span>
                </button>
                <button
                  className="lobby-nav-btn"
                  onClick={isAuthenticated ? onShowLeaderboard : onNavigateToRegister}
                  title="Rang Lista"
                >
                  <span className="nav-icon">📊</span>
                  <span className="nav-label">Rang Lista</span>
                </button>
                <button
                  className="lobby-nav-btn"
                  onClick={isAuthenticated ? onShowAchievements : onNavigateToRegister}
                  title="Dostignuća"
                >
                  <span className="nav-icon">🏆</span>
                  <span className="nav-label">Dostignuća</span>
                </button>
                {isAuthenticated ? (
                  <button
                    className="lobby-nav-btn lobby-nav-btn-logout"
                    onClick={onLogout}
                    title="Odjavi se"
                  >
                    <span className="nav-icon">🚪</span>
                    <span className="nav-label">Odjavi se</span>
                  </button>
                ) : (
                  <>
                    <button
                      className="lobby-nav-btn lobby-nav-btn-login"
                      onClick={onNavigateToLogin}
                      title="Prijava"
                    >
                      <span className="nav-icon">🔐</span>
                      <span className="nav-label">Prijava</span>
                    </button>
                    <button
                      className="lobby-nav-btn lobby-nav-btn-register"
                      onClick={onNavigateToRegister}
                      title="Registracija"
                    >
                      <span className="nav-icon">✨</span>
                      <span className="nav-label">Registracija</span>
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content - 2 Column Grid */}
        <div className="lobby-main-grid">
          {/* Find Game Card */}
          <div className="lobby-card">
            <div className="lobby-card-icon">🎮</div>
            <h2 className="lobby-card-title">Pronađi Igru</h2>
            <p className="lobby-card-description">
              Brzo uđi u matchmaking i takmiči se protiv drugih igrača
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
                  Pokreni Matchmaking
                </button>
              </>
            ) : (
              <div className="searching-status">
                <div className="searching-animation">
                  <div className="searching-spinner"></div>
                </div>
                <p className="searching-text">Tražim protivnika...</p>
                {queuePosition && <p className="queue-position">Pozicija u redu: {queuePosition}</p>}
                <button
                  className="lobby-btn lobby-btn-secondary"
                  onClick={handleCancelSearch}
                >
                  Otkaži Pretragu
                </button>
              </div>
            )}
          </div>

          {/* Private Room Card */}
          <div className="lobby-card">
            <div className="lobby-card-icon">🏠</div>
            <h2 className="lobby-card-title">Privatna Soba</h2>
            <p className="lobby-card-description">
              Napravi privatnu sobu za igru sa prijateljima
            </p>

            <button
              className="lobby-btn lobby-btn-primary"
              onClick={handleCreatePrivate}
              disabled={!playerName}
            >
              Napravi Privatnu Sobu
            </button>
          </div>
        </div>

        {/* Join By Code - Full Width */}
        <div className="lobby-join-section">
          <div className="lobby-join-header">
            <div className="lobby-join-icon">🔑</div>
            <h2 className="lobby-join-title">Pridruži se Koristeći Kod</h2>
          </div>
          <div className="join-input-group">
            <input
              type="text"
              className="join-input"
              placeholder="Unesi 6-cifreni kod sobe..."
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
              Pridruži se Sobi
            </button>
          </div>
          {joinError && <div className="lobby-error">{joinError}</div>}
        </div>

        {/* Match History Modal */}
        {showMatchHistory && <MatchHistory onClose={onMatchHistoryClose || (() => undefined)} />}
        
        {/* Rules Modal */}
        {showRulesModal && (
          <div className="rules-modal-overlay" onClick={() => setShowRulesModal(false)}>
            <div className="rules-modal" onClick={(e) => e.stopPropagation()}>
              <div className="rules-modal-header">
                <h2>📖 Pravilnik Igre "Zing"</h2>
                <button className="rules-modal-close" onClick={() => setShowRulesModal(false)}>×</button>
              </div>
              <div className="rules-modal-content">
                <p className="rules-intro">
                  "Zing" je dinamična kartaška igra za dva ili četiri igrača (u timovima). Igra se standardnim špilom od 52 karte bez džokera. Pobjednik je strana koja prva akumulira 101 ili više poena kroz seriju partija.
                </p>

                <section className="rules-section">
                  <h3>1. PRIPREMA IGRE I DIJELJENJE</h3>
                  
                  <h4>Sječenje špila:</h4>
                  <p>Igrač koji ne dijeli (u 2v2 verziji igrač desno od djelitelja) sječe promiješani špil.</p>
                  
                  <h4>Postavka talona (Adut karta i početni talon):</h4>
                  <p>Jedna karta sa dna polovine špila koja je odsječena okreće se licem nagore. To je karta koja u poslednjoj ruci ide djelitelju.</p>
                  
                  <h4>Početni talon:</h4>
                  <p>Četiri karte sa dna iste polovine špila ređaju se jedna pored druge na centar stola, okrenute licem nagore.</p>
                  
                  <h4>Podjela karata:</h4>
                  <p>Djelitelj dijeli po 4 karte svakom igraču.</p>
                  
                  <h4>Dopuna ruku:</h4>
                  <p>Kada svi igrači potroše svoje 4 karte, djelitelj dijeli novih 4 dok se špil ne isprazni. Posljednja karta u špilu (ona koja je od početka bila licem nagore) pripada djelitelju.</p>
                </section>

                <section className="rules-section">
                  <h3>2. TOK IGRE I MEHANIKA NOŠENJA</h3>
                  
                  <h4>Redoslijed poteza:</h4>
                  <p>Prvi igra igrač lijevo od djelitelja. U varijanti 2v2, igrači se smjenjuju unakrsno (Tim A → Tim B).</p>
                  
                  <h4>Pravila nošenja:</h4>
                  <ul>
                    <li>Igrač baca jednu kartu na talon.</li>
                    <li>Ako je bačena karta iste vrijednosti (npr. 8 na 8) kao karta koja je trenutno na vrhu talona, igrač nosi cijeli talon.</li>
                    <li>Žandar (J) nosi cijeli talon bez obzira na to koja je karta na vrhu.</li>
                  </ul>
                  
                  <h4>Prazan talon:</h4>
                  <p>Ako igrač odnese talon, sljedeći igrač mora baciti kartu na prazan prostor, čime započinje novi talon.</p>
                </section>

                <section className="rules-section">
                  <h3>3. ZING</h3>
                  <p>Zing se događa kada na talonu postoji samo jedna karta, a sljedeći igrač je odnese.</p>
                  <ul>
                    <li>Običan Zing donosi 10 poena.</li>
                    <li>Zing Žandarom na Žandara (J na J) donosi 20 poena.</li>
                  </ul>
                  <p><strong>Napomena:</strong> Ako se karta odnese Žandarom, a nije u pitanju J na J situacija, to se ne računa kao Zing.</p>
                </section>

                <section className="rules-section">
                  <h3>4. BODOVANJE</h3>
                  <p>Nakon što se sve karte iz špila odigraju, timovi broje poene iz svojih ponesenih karata:</p>
                  
                  <h4>Vrijednost karata:</h4>
                  <table className="rules-table">
                    <tbody>
                      <tr>
                        <td>10 Karo (♦)</td>
                        <td>2 poena</td>
                      </tr>
                      <tr>
                        <td>A, K, Q, J, 10 (ostali znaci)</td>
                        <td>1 poen</td>
                      </tr>
                      <tr>
                        <td>Dvojka Tref (♣)</td>
                        <td>1 poen</td>
                      </tr>
                      <tr>
                        <td>Karte 2-9</td>
                        <td>0 poena</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <h4>Dodatni bodovi:</h4>
                  <ul>
                    <li><strong>Većina karata:</strong> Tim koji je sakupio više od polovine ukupnog broja karata (27 ili više) dobija dodatna 3 poena.</li>
                    <li>U slučaju izjednačenog broja karata (26:26), 3 poena dobija tim koji posjeduje 2 tref (♣).</li>
                    <li><strong>Zingovi:</strong> Svaki običan Zing se računa kao 10 poena, a J na J kao 20.</li>
                  </ul>
                </section>

                <section className="rules-section">
                  <h3>5. POBJEDA</h3>
                  <p>Partije se igraju dok jedan tim ne dostigne 101 poen.</p>
                  
                  <h4>Produžeci:</h4>
                  <p>Ako oba tima pređu 101 poen u istoj partiji, granica pobjede se pomjera na 151, zatim 201, i tako dalje.</p>
                  
                  <h4>Konačna pobjeda:</h4>
                  <p>Pobjeđuje tim koji u trenutku završetka partije ima više od granice (npr. 101), dok je protivnički tim ostao ispod te granice.</p>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobby;
