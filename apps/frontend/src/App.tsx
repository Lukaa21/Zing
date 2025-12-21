import React from 'react';
import LandingPage from './pages/LandingPage';
import GuestNameScreen from './components/GuestNameScreen';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import { useState } from 'react';
import { getGuestName } from './utils/guest';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { authUser, logout, isLoading } = useAuth();
  const [view, setView] = useState<'landing' | 'login' | 'register' | 'guest-name' | 'lobby' | 'game'>('landing');
  const [roomId, setRoomId] = useState<string | null>(null);
  const [name, setName] = useState<string>(getGuestName() || '');
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

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
    
    // If we have pending invite and now we have a name (after auth or guest name entry), join the game
    if (pendingRoom && pendingToken && name) {
      sessionStorage.removeItem('zing_pending_invite_room');
      sessionStorage.removeItem('zing_pending_invite_token');
      sessionStorage.removeItem('zing_pending_invite_name');
      
      setRoomId(pendingRoom);
      setInviteToken(pendingToken);
      setView('game');
      return;
    }
    
    // If invite link and we're already in this room (refresh case), rejoin directly
    if (r && i && storedRoomId === r) {
      setRoomId(r);
      setInviteToken(i);
      
      // Use existing name from authenticated user or localStorage
      const existingName = authUser?.displayName || getGuestName();
      if (existingName) {
        setName(existingName);
        setView('game');
      } else {
        // Shouldn't happen (refresh without name), but fallback to name screen
        setView('guest-name');
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
      setView('landing');
      return;
    }
    
    // Legacy: room + name query params
    if (r && n) {
      setRoomId(r);
      setName(n);
      setView('game');
      return;
    }

    // If we have a roomId stored in sessionStorage (from previous game session), rejoin
    if (storedRoomId) {
      setRoomId(storedRoomId);
      setView('game');
    }
  }, [isLoading, authUser, name]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {view === 'landing' && (
        <LandingPage 
          onPlayAsGuest={() => setView('guest-name')}
          onLogin={() => setView('login')}
          onRegister={() => setView('register')}
        />
      )}
      {view === 'login' && (
        <>
          <LoginForm onSuccess={(user) => {
            setName(user.displayName);
            // Check if there's a pending invite - if not, go to lobby
            const pendingRoom = sessionStorage.getItem('zing_pending_invite_room');
            if (!pendingRoom) {
              setView('lobby');
            }
            // If there is pending invite, useEffect will handle navigation to game
          }} />
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button onClick={() => setView('landing')} style={{ marginRight: 10 }}>Back</button>
            <span>Don't have an account? <button onClick={() => setView('register')}>Register</button></span>
          </div>
        </>
      )}
      {view === 'register' && (
        <>
          <RegisterForm onSuccess={(user) => {
            setName(user.displayName);
            // Check if there's a pending invite - if not, go to lobby
            const pendingRoom = sessionStorage.getItem('zing_pending_invite_room');
            if (!pendingRoom) {
              setView('lobby');
            }
            // If there is pending invite, useEffect will handle navigation to game
          }} />
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button onClick={() => setView('landing')} style={{ marginRight: 10 }}>Back</button>
            <span>Already have an account? <button onClick={() => setView('login')}>Login</button></span>
          </div>
        </>
      )}
      {view === 'guest-name' && (
        <GuestNameScreen 
          onConfirm={(guestName) => {
            setName(guestName);
            // Check if there's a pending invite - if not, go to lobby
            const pendingRoom = sessionStorage.getItem('zing_pending_invite_room');
            if (!pendingRoom) {
              setView('lobby');
            }
            // If there is pending invite, useEffect will handle navigation to game
          }}
        />
      )}
      {view === 'lobby' && (
        <>
          {authUser && (
            <div style={{ textAlign: 'right', padding: 10 }}>
              <span>{authUser.displayName}</span>
              <button onClick={() => {
                logout();
                setView('landing');
              }} style={{ marginLeft: 10 }}>Logout</button>
            </div>
          )}
          <Lobby 
            playerName={name}
            onJoin={(id, playerName, joinCode, joinInviteToken) => { 
              setRoomId(id); 
              setName(playerName);
              setCode(joinCode || null);
              setInviteToken(joinInviteToken || null);
              setView('game'); 
            }} 
          />
        </>
      )}
      {view === 'game' && (
        <Game 
          roomId={roomId!} 
          playerName={name}
          inviteToken={inviteToken || undefined}
          code={code || undefined}
          onLeave={() => {
            // Clear stored roomId when leaving game
            sessionStorage.removeItem('zing_current_room');
            setView('lobby');
          }}
        />
      )}
    </div>
  );
};

export default App;
