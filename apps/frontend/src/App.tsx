import React from 'react';
import LandingPage from './pages/LandingPage';
import GuestNameScreen from './components/GuestNameScreen';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import FriendsPage from './pages/FriendsPage';
import { useState } from 'react';
import { getGuestName } from './utils/guest';
import { useAuth } from './context/AuthContext';
import { Routes, Route, useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const { authUser, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  // Initialize roomId from sessionStorage if available (for refresh during active game)
  const [roomId, setRoomId] = useState<string | null>(() => {
    return sessionStorage.getItem('zing_current_room') || null;
  });
  // Don't initialize name from localStorage yet - let user explicitly choose identity
  // This prevents invited players from getting the room creator's name
  const [name, setName] = useState<string>('');
  const [inviteToken, setInviteToken] = useState<string | null>(() => {
    return sessionStorage.getItem('zing_current_invite_token') || null;
  });
  const [code, setCode] = useState<string | null>(() => {
    return sessionStorage.getItem('zing_current_code') || null;
  });
  const [showMatchHistory, setShowMatchHistory] = useState<boolean>(false);

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
    
    // Initialize name from authUser or localStorage if no pending invite
    // This prevents invited players from inheriting the room creator's guest name
    if (!name && !pendingRoom && !r) {
      const existingName = authUser?.username || getGuestName();
      if (existingName) {
        setName(existingName);
      }
    }

    // If we have pending invite and now we have a name (after auth or guest name entry), join the game
    if (pendingRoom && pendingToken && name) {
      sessionStorage.removeItem('zing_pending_invite_room');
      sessionStorage.removeItem('zing_pending_invite_token');
      sessionStorage.removeItem('zing_pending_invite_name');
      
      setRoomId(pendingRoom);
      setInviteToken(pendingToken);
      navigate('/game');
      return;
    }
    
    // If invite link and we're already in this room (refresh case), rejoin directly
    if (r && i && storedRoomId === r) {
      setRoomId(r);
      setInviteToken(i);
      
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
      navigate('/game');
    }
  }, [isLoading, authUser, name, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={
        <LandingPage 
          onPlayAsGuest={() => {
            logout(); // Clear any existing auth token
            navigate('/guest-name');
          }}
          onLogin={() => navigate('/login')}
          onRegister={() => navigate('/register')}
        />
      } />

      <Route path="/login" element={
        <>
          <LoginForm onSuccess={(user) => {
            setName(user.username);
            const pendingRoom = sessionStorage.getItem('zing_pending_invite_room');
            if (!pendingRoom) {
              navigate('/lobby');
            }
            // If pending invite exists, useEffect will route to /game
          }} />
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button onClick={() => navigate('/')} style={{ marginRight: 10 }}>Back</button>
            <span>Don't have an account? <button onClick={() => navigate('/register')}>Register</button></span>
          </div>
        </>
      } />

      <Route path="/register" element={
        <>
          <RegisterForm onSuccess={(user) => {
            setName(user.username);
            const pendingRoom = sessionStorage.getItem('zing_pending_invite_room');
            if (!pendingRoom) {
              navigate('/lobby');
            }
            // If pending invite exists, useEffect will route to /game
          }} />
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button onClick={() => navigate('/')} style={{ marginRight: 10 }}>Back</button>
            <span>Already have an account? <button onClick={() => navigate('/login')}>Login</button></span>
          </div>
        </>
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
          {authUser && (
            <div style={{ textAlign: 'right', padding: 10 }}>
              <span>{authUser.username}</span>
              <button onClick={() => navigate('/friends')} style={{ marginLeft: 10 }}>Friends</button>
              <button onClick={() => setShowMatchHistory(true)} style={{ marginLeft: 10 }}>Match History</button>
              <button onClick={() => {
                logout();
                navigate('/');
              }} style={{ marginLeft: 10 }}>Logout</button>
            </div>
          )}
          <Lobby 
            playerName={name}
            showMatchHistory={showMatchHistory}
            onMatchHistoryClose={() => setShowMatchHistory(false)}
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
          inviteToken={inviteToken || undefined}
          code={code || undefined}
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
          inviteToken={inviteToken || undefined}
          code={code || undefined}
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
  );
};

export default App;
