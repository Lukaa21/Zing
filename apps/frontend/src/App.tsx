import React from 'react';
import LandingPage from './pages/LandingPage';
import GuestNameScreen from './components/GuestNameScreen';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import FriendsPage from './pages/FriendsPage';
import Achievements from './components/Achievements';
import Leaderboard from './components/Leaderboard';
import { useState } from 'react';
import { getGuestName } from './utils/guest';
import { useAuth } from './context/AuthContext';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const { authUser, logout, forceGuestMode, isLoading } = useAuth();
  const navigate = useNavigate();
  // Initialize roomId from sessionStorage if available (for refresh during active game)
  const [roomId, setRoomId] = useState<string | null>(() => {
    return sessionStorage.getItem('zing_current_room') || null;
  });
  // Initialize name immediately to avoid empty string -> actual name transition
  const [name, setName] = useState<string>(() => {
    // Don't auto-set name if there's a pending invite (let user choose identity)
    const pendingRoom = sessionStorage.getItem('zing_pending_invite_room');
    if (pendingRoom) return '';
    return getGuestName() || '';
  });
  const [inviteToken, setInviteToken] = useState<string | null>(() => {
    return sessionStorage.getItem('zing_current_invite_token') || null;
  });
  const [code, setCode] = useState<string | null>(() => {
    return sessionStorage.getItem('zing_current_code') || null;
  });
  const [showMatchHistory, setShowMatchHistory] = useState<boolean>(false);
  const [showAchievements, setShowAchievements] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  // Sync state with sessionStorage when navigating (e.g., after accepting invite)
  const location = useLocation();
  React.useEffect(() => {
    const storedRoomId = sessionStorage.getItem('zing_current_room');
    const storedInviteToken = sessionStorage.getItem('zing_current_invite_token');
    const storedCode = sessionStorage.getItem('zing_current_code');
    
    if (storedRoomId && storedRoomId !== roomId) {
      console.log('[APP] Syncing roomId from sessionStorage:', storedRoomId);
      setRoomId(storedRoomId);
    }
    if (storedInviteToken && storedInviteToken !== inviteToken) {
      console.log('[APP] Syncing inviteToken from sessionStorage:', storedInviteToken);
      setInviteToken(storedInviteToken);
    }
    if (storedCode && storedCode !== code) {
      console.log('[APP] Syncing code from sessionStorage:', storedCode);
      setCode(storedCode);
    }
  }, [location.pathname]); // Re-run when route changes

  React.useEffect(() => {
    if (isLoading) return;
    
    const qp = new URLSearchParams(window.location.search);
    const r = qp.get('room');
    const i = qp.get('invite');
    const n = qp.get('name');
    
    // Check if we have a roomId stored in sessionStorage (refresh during active game)
    const storedRoomId = sessionStorage.getItem('zing_current_room');
    
    // Check if there's a pending invite that hasn't been processed yet
    const pendingRoom = sessionStorage.getItem('zing_pending_invite_room');
    const pendingToken = sessionStorage.getItem('zing_pending_invite_token');
    
    // If user is authenticated and name is not set, use their username
    if (!name && authUser?.username && !pendingRoom && !r) {
      setName(authUser.username);
    }

    // If we have pending invite and now we have a name (after auth or guest name entry), join the game
    if (pendingRoom && pendingToken && name) {
      console.log('[App.tsx] Processing pending invite:', { pendingRoom, pendingToken: pendingToken.slice(0, 8) + '...', name });
      
      sessionStorage.removeItem('zing_pending_invite_room');
      sessionStorage.removeItem('zing_pending_invite_token');
      sessionStorage.removeItem('zing_pending_invite_name');
      
      // Store in current session for persistence
      sessionStorage.setItem('zing_current_room', pendingRoom);
      sessionStorage.setItem('zing_current_invite_token', pendingToken);
      
      setRoomId(pendingRoom);
      setInviteToken(pendingToken);
      navigate('/game');
      return;
    }
    
    // If invite link and we're already in this room (refresh case), rejoin directly
    if (r && i && storedRoomId === r) {
      setRoomId(r);
      setInviteToken(i);
      
      // Ensure invite token is stored in sessionStorage for persistence
      sessionStorage.setItem('zing_current_invite_token', i);
      
      // Use existing name from authenticated user or localStorage
      const existingName = authUser?.username || getGuestName();
      if (existingName) {
        setName(existingName);
        navigate('/game');
      } else {
        // Shouldn't happen (refresh without name), but fallback to name screen
        navigate('/guest-name');
      }
      return;
    }
    
    // If invite link but NOT a refresh (new visit), go to landing to choose auth method
    if (r && i && !storedRoomId && !pendingRoom) {
      // Store invite link parameters so we can use them after auth choice
      sessionStorage.setItem('zing_pending_invite_room', r);
      sessionStorage.setItem('zing_pending_invite_token', i);
      if (n) {
        sessionStorage.setItem('zing_pending_invite_name', n);
      }
      // Go to landing page to let user choose: guest, login, or register
      navigate('/');
      return;
    }
    
    // Legacy: room + name query params
    if (r && n) {
      setRoomId(r);
      setName(n);
      navigate('/game');
      return;
    }

    // If we have a roomId stored in sessionStorage (from previous game session), rejoin
    if (storedRoomId) {
      setRoomId(storedRoomId);
      
      // Also restore inviteToken if present in sessionStorage
      const storedInviteToken = sessionStorage.getItem('zing_current_invite_token');
      if (storedInviteToken) {
        setInviteToken(storedInviteToken);
      }
      
      navigate('/game');
    }
  }, [isLoading, authUser, name, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Routes>
      <Route path="/" element={
        <LandingPage 
          onPlayAsGuest={() => {
            // Force guest mode for this tab and clear auth state immediately
            forceGuestMode();
            navigate('/guest-name');
          }}
          onLogin={() => navigate('/login')}
          onRegister={() => navigate('/register')}
        />
      } />

      <Route path="/login" element={
        <LoginForm onSuccess={(user) => {
          setName(user.username);
          const pendingRoom = sessionStorage.getItem('zing_pending_invite_room');
          if (!pendingRoom) {
            navigate('/lobby');
          }
          // If pending invite exists, useEffect will route to /game
        }} />
      } />

      <Route path="/register" element={
        <RegisterForm onSuccess={(user) => {
          setName(user.username);
          const pendingRoom = sessionStorage.getItem('zing_pending_invite_room');
          if (!pendingRoom) {
            navigate('/lobby');
          }
          // If pending invite exists, useEffect will route to /game
        }} />
      } />

      <Route path="/guest-name" element={
        <GuestNameScreen 
          onConfirm={(guestName) => {
            setName(guestName);
            const pendingRoom = sessionStorage.getItem('zing_pending_invite_room');
            if (!pendingRoom) {
              navigate('/lobby');
            }
            // If pending invite exists, useEffect will route to /game
          }}
        />
      } />

      <Route path="/lobby" element={
        <>
          <Lobby 
            playerName={name}
            showMatchHistory={showMatchHistory}
            onMatchHistoryClose={() => setShowMatchHistory(false)}
            onShowMatchHistory={() => setShowMatchHistory(true)}
            isAuthenticated={!!authUser}
            onNavigateToFriends={() => navigate('/friends')}
            onShowLeaderboard={() => setShowLeaderboard(true)}
            onShowAchievements={() => setShowAchievements(true)}
            onNavigateToLogin={() => navigate('/login')}
            onNavigateToRegister={() => navigate('/register')}
            onLogout={() => {
              logout();
              navigate('/');
            }}
            onJoin={(id, playerName, joinCode, joinInviteToken, directToGame) => { 
              setRoomId(id); 
              setName(playerName);
              setCode(joinCode || null);
              setInviteToken(joinInviteToken || null);
              // Store roomId, code, and inviteToken for refresh recovery
              sessionStorage.setItem('zing_current_room', id);
              if (joinCode) {
                sessionStorage.setItem('zing_current_code', joinCode);
              } else {
                sessionStorage.removeItem('zing_current_code');
              }
              if (joinInviteToken) {
                sessionStorage.setItem('zing_current_invite_token', joinInviteToken);
              } else {
                sessionStorage.removeItem('zing_current_invite_token');
              }
              // Pass state flag for matchmaking to force InGameView immediately
              navigate(directToGame ? '/game' : '/room', directToGame ? { state: { isMatchmakingMatch: true } } : undefined); 
            }} 
          />
        </>
      } />

      <Route path="/friends" element={<FriendsPage />} />

      <Route path="/game" element={
        <Game 
          key="game-view"
          roomId={roomId!} 
          playerName={name}
          inviteToken={inviteToken || sessionStorage.getItem('zing_current_invite_token') || undefined}
          code={code || sessionStorage.getItem('zing_current_code') || undefined}
          onRoomChange={(newRoomId) => {
            setRoomId(newRoomId);
            sessionStorage.setItem('zing_current_room', newRoomId);
          }}
          onLeave={() => {
            // Clear stored roomId, code, and inviteToken when leaving game
            sessionStorage.removeItem('zing_current_room');
            sessionStorage.removeItem('zing_current_code');
            sessionStorage.removeItem('zing_current_invite_token');
            navigate('/lobby');
          }}
        />
      } />
      <Route path="/room" element={
        <Game 
          key="room-view"
          roomId={roomId!}
          playerName={name}
          inviteToken={inviteToken || sessionStorage.getItem('zing_current_invite_token') || undefined}
          code={code || sessionStorage.getItem('zing_current_code') || undefined}
          initialRoute="room"
          onRoomChange={(newRoomId) => {
            setRoomId(newRoomId);
            sessionStorage.setItem('zing_current_room', newRoomId);
          }}
          onLeave={() => {
            sessionStorage.removeItem('zing_current_room');
            sessionStorage.removeItem('zing_current_code');
            sessionStorage.removeItem('zing_current_invite_token');
            navigate('/lobby');
          }}
        />
      } />
    </Routes>
    
    {/* Achievements Modal */}
    {showAchievements && authUser && (
      <Achievements
        userId={authUser.id}
        token={localStorage.getItem('auth_token') || ''}
        onClose={() => setShowAchievements(false)}
      />
    )}
    
    {/* Leaderboard Modal */}
    {showLeaderboard && authUser && (
      <Leaderboard
        token={localStorage.getItem('auth_token') || ''}
        currentUserId={authUser.id}
        onClose={() => setShowLeaderboard(false)}
      />
    )}
    </>
  );
};


export default App;
