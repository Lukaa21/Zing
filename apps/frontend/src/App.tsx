import React from 'react';
import LandingPage from './pages/LandingPage';
import GuestNameScreen from './components/GuestNameScreen';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import { useState } from 'react';
import { getGuestName } from './utils/guest';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'guest-name' | 'lobby' | 'game'>('landing');
  const [roomId, setRoomId] = useState<string | null>(null);
  const [name, setName] = useState<string>(getGuestName() || '');
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  React.useEffect(() => {
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
  }, []);

  return (
    <div>
      {view === 'landing' && (
        <LandingPage 
          onPlayAsGuest={() => setView('guest-name')}
          onLogin={() => {}}
          onRegister={() => {}}
        />
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
