import React from 'react';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import { useState } from 'react';

const App: React.FC = () => {
  const [view, setView] = useState<'lobby' | 'game'>('lobby');
  const [roomId, setRoomId] = useState<string | null>(null);
  const [name, setName] = useState<string>('');

  return (
    <div>
      {view === 'lobby' && <Lobby onJoin={(id, playerName) => { setRoomId(id); setName(playerName); setView('game'); }} />}
      {view === 'game' && <Game roomId={roomId!} playerName={name} onLeave={() => setView('lobby')} />}
    </div>
  );
};

export default App;
