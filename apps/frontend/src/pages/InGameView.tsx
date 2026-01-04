import React, { useState, useEffect } from 'react';
import Hand from '../components/Hand';
import Card from '../components/Card';

function shortCardName(cardId: string) {
  const [suit, rank] = cardId.split('-');
  return `${rank} ${suit}`;
}

interface InGameViewProps {
  state: any;
  players: any[];
  myId: string | null;
  playerName: string;
  logs: string[];
  devMode: boolean;
  isSpectator?: boolean;
  controlAs: string | null;
  timerDuration?: number; // Total timer duration in ms
  timerExpiresAt?: number; // Timestamp when timer expires
  setDevMode: (v: boolean) => void;
  setControlAs: (id: string | null) => void;
  onPlay: (cardId: string, ownerId?: string) => void;
}

const InGameView: React.FC<InGameViewProps> = ({
  state,
  players,
  myId,
  playerName,
  logs,
  devMode,
  isSpectator = false,
  controlAs,
  timerDuration,
  timerExpiresAt,
  setDevMode,
  setControlAs,
  onPlay,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  // Update timer countdown
  useEffect(() => {
    if (!timerExpiresAt) {
      setTimeRemaining(null);
      return;
    }

    const updateTimer = () => {
      const remaining = timerExpiresAt - Date.now();
      setTimeRemaining(Math.max(0, remaining));
    };

    updateTimer(); // Initial update
    const interval = setInterval(updateTimer, 100); // Update every 100ms for smooth countdown

    return () => clearInterval(interval);
  }, [timerExpiresAt]);

  // Format timer display: show decimals only when < 4 seconds
  const timerSeconds = timeRemaining !== null 
    ? (timeRemaining >= 4000 
        ? Math.floor(timeRemaining / 1000).toString() 
        : (timeRemaining / 1000).toFixed(1))
    : null;

  return (
    <div className="in-game">
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ minWidth: 240 }}>
          <h3>Players in Room</h3>
          <ul className="players-list">
            {players.map((p) => (
              <li key={p.id} className={p.id === state?.currentTurnPlayerId ? 'current' : ''}>
                <div>
                  {p.name} {p.role === 'spectator' ? '(spectator)' : ''} {p.id === state?.currentTurnPlayerId ? ' ← turn' : ''}
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 12 }}>
            <h4>Talon</h4>
            <div className="talon-row">
              {state?.talon?.length ? (
                state.talon.map((c: string, i: number) => (
                  <div key={i} style={{ marginLeft: i === 0 ? 0 : -48 }}>
                    <Card id={c} />
                  </div>
                ))
              ) : (
                <em>empty</em>
              )}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div>
              <strong>Turn:</strong> {state?.players?.find((p: any) => p.id === state?.currentTurnPlayerId)?.name || '—'}
            </div>
            <div>
              <strong>Deck:</strong> {state?.deck?.length ?? 0} cards
            </div>
            <div>
              <strong>Hand:</strong> {state?.handNumber ?? 0}
            </div>
            {timerSeconds !== null && (
              <div style={{ 
                marginLeft: 'auto',
                padding: '0.5rem 1rem',
                backgroundColor: Number(timerSeconds) <= 3 ? '#ff4444' : '#4CAF50',
                color: 'white',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                ⏱️ {timerSeconds}s
              </div>
            )}
          </div>
          <div style={{ marginTop: 8 }}>
            <label style={{ fontSize: 13 }}>
              <input
                type="checkbox"
                checked={devMode}
                onChange={(e) => {
                  setDevMode(e.target.checked);
                  if (e.target.checked) setControlAs(myId);
                  else setControlAs(null);
                }}
              />
              {' '}
              Dev/Test Mode (show all hands & control any player)
            </label>
          </div>
        </div>
      </div>
      <div className="player-hand" style={{ marginTop: 12 }}>
        {devMode ? (
          <div>
            <h3>All Hands</h3>
            <div>
              <div style={{ marginBottom: 8 }}>
                <strong>Control as:</strong>{' '}
                <select value={controlAs || ''} onChange={(e) => setControlAs(e.target.value || null)}>
                  <option value="">(none)</option>
                  {players.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              {players.map((p) => (
                <div key={p.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 'bold' }}>
                    {p.name} {p.id === state?.currentTurnPlayerId ? '← turn' : ''}
                  </div>
                  <Hand cards={p.hand || []} onPlay={(id) => onPlay(id, p.id)} disabled={!(controlAs === p.id)} />
                </div>
              ))}
            </div>
          </div>
        ) : isSpectator ? (
          <div>
            <h3>All Hands (Spectator View)</h3>
            <div>
              {state?.players?.filter((p: any) => p.role !== 'spectator').map((p: any) => (
                <div key={p.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 'bold' }}>
                    {p.name} {p.id === state?.currentTurnPlayerId ? '← turn' : ''}
                  </div>
                  <Hand cards={p.hand || []} onPlay={(id) => onPlay(id, p.id)} disabled={true} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3>Your Hand</h3>
            {(() => {
              const me = state?.players?.find((p: any) => p.id === myId) || state?.players?.find((p: any) => p.name === playerName);
              const hand = me?.hand || [];
              const myPlayerId = me?.id;
              return <Hand cards={hand} onPlay={(id) => onPlay(id)} disabled={myPlayerId !== state?.currentTurnPlayerId} />;
            })()}
          </div>
        )}
      </div>
      <div style={{ marginTop: 12 }}>
        <h4>Team Scores</h4>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '1.1rem' }}>
          <div style={{ 
            padding: '0.5rem 1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            Team 0: {state?.scores?.team0 || 0} pts
          </div>
          <div style={{ 
            padding: '0.5rem 1rem',
            backgroundColor: '#2196F3',
            color: 'white',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            Team 1: {state?.scores?.team1 || 0} pts
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <h4>Move Log</h4>
        <div style={{ maxHeight: 240, overflow: 'auto', background: '#fff', padding: 8, borderRadius: 6 }}>
          <ul style={{ margin: 0, paddingLeft: 8 }}>
            {logs.map((l, idx) => (
              <li key={idx} style={{ fontSize: 13, color: '#222' }}>
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InGameView;
