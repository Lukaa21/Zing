import React, { useEffect, useState } from 'react';
import Hand from '../components/Hand';
import { io } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const Game: React.FC<{ roomId: string; playerName: string; onLeave: () => void }> = ({ roomId, playerName }) => {
  const [socket, setSocket] = useState<any>(null);
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const s = io(BACKEND_URL, { transports: ['websocket'] });
    s.on('connect', () => console.log('connected to backend'));
    s.on('game_state', (sState: any) => setState(sState.state));
    s.on('game_event', (ev: any) => console.log('event', ev));
    s.on('room_update', (u: any) => console.log('update', u));
    // announce auth for this client
    s.emit('auth', { name: playerName, role: 'player' });
    setSocket(s);
    return () => {
  s.disconnect();
};

  }, []);

  const handlePlay = (cardId: string) => {
    if (!socket) return;
    socket.emit('intent_play_card', { roomId, cardId });
  };

  return (
    <div className="game container">
      <h1>Game Room</h1>
      <p>Room: {roomId}</p>
      <p>Player: {playerName}</p>
      <div className="board">
        <pre>{JSON.stringify(state, null, 2)}</pre>
        <div className="player-hand">
          <h3>Your Hand</h3>
          <Hand
            cards={(state?.players?.find((p:any) => p.name === playerName)?.hand) || []}
            onPlay={(id) => handlePlay(id)}
          />
        </div>
      </div>
      <div className="controls">
        <button onClick={() => socket?.emit('intent_take_talon', { roomId })}>Take Talon</button>
        <button onClick={() => socket?.emit('intent_pass', { roomId })}>Pass</button>
      </div>
    </div>
  );
};

export default Game;
