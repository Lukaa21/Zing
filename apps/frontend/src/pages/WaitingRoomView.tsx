import React from 'react';

interface Player { id: string; name: string; seat?: number; role?: string; team?: number }

interface WaitingRoomViewProps {
  roomId: string;
  players: Player[];
  myId: string | null;
  ownerId: string | null;
  playerName: string;
  onStart: () => void;
  isOwner: boolean;
  isStartEnabled: boolean;
}

const WaitingRoomView: React.FC<WaitingRoomViewProps> = ({
  roomId,
  players,
  myId,
  ownerId,
  playerName,
  onStart,
  isOwner,
  isStartEnabled,
}) => {
  return (
    <div className="waiting-room">
      <h1>Game Room</h1>
      <p>Room: {roomId}</p>
      <p>Player: {players?.find((p: any) => p.id === myId)?.name || playerName || '—'}</p>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ minWidth: 240 }}>
          <h3>Players in Room</h3>
          <ul className="players-list">
            {players.map((p: Player) => (
              <li key={p.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    {p.name} {p.role === 'spectator' ? '(spectator)' : ''} {p.id === ownerId ? '(host)' : ''}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {isOwner ? (
            <div>
              <button onClick={onStart} disabled={!isStartEnabled}>
                Start Game
              </button>
              {!isStartEnabled && (
                <div style={{ color: '#666', marginTop: 8 }}>Need 2 or 4 players to start</div>
              )}
            </div>
          ) : (
            <div style={{ color: '#666' }}>Waiting for room owner to start the game</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitingRoomView;
