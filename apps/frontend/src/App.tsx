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
    
    // If invite link: this is a NEW user in this browser, don't use cached name
    if (r && i) {
      setRoomId(r);
      setInviteToken(i);
      if (n) {
        setName(n);
        setView('game');
      } else {
        // New user via invite link - go to name screen, don't use cached name from localStorage
        setView('guest-name');
      }
      return;
    }
    
    // Legacy: room + name query params
    if (r && n) {
      setRoomId(r);
      setName(n);
      setView('game');
      return;
    }

    // Check if we have a roomId stored in sessionStorage (from previous game session)
    const storedRoomId = sessionStorage.getItem('zing_current_room');
    if (storedRoomId) {
      setRoomId(storedRoomId);
      setView('game');
    }
  }, [isLoading]);

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
          <LoginForm onSuccess={() => {
            setName(authUser?.displayName || '');
            setView('lobby');
          }} />
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button onClick={() => setView('landing')} style={{ marginRight: 10 }}>Back</button>
            <span>Don't have an account? <button onClick={() => setView('register')}>Register</button></span>
          </div>
        </>
      )}
      {view === 'register' && (
        <>
          <RegisterForm onSuccess={() => {
            setName(authUser?.displayName || '');
            setView('lobby');
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
            // If we have an invite token, jump to game after name entry
            if (inviteToken && roomId) {
              setView('game');
            } else {
              setView('lobby');
            }
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
