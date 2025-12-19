import React from 'react';

function formatTakenSummary(taken: string[]) {
  if (!taken || taken.length === 0) return 'no cards';
  const shortCardName = (cardId: string) => {
    const [suit, rank] = cardId.split('-');
    return `${rank} ${suit}`;
  };
  return taken.map(shortCardName).slice(0, 6).join(', ');
}

interface WaitingRoomViewProps {
  roomId: string;
  players: any[];
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
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ minWidth: 240 }}>
          <h3>Players in Room</h3>
          <ul className="players-list">
            {players.map((p) => (
              <li key={p.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    {p.name} {p.role === 'spectator' ? '(spectator)' : ''} {p.id === ownerId ? '(host)' : ''}
                  </div>
                  <div style={{ fontSize: 12, color: '#444' }}>{p.taken?.length || 0} taken</div>
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>{formatTakenSummary(p.taken || [])}</div>
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
