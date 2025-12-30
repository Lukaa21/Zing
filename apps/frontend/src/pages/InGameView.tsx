import React from 'react';
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
  setDevMode,
  setControlAs,
  onPlay,
}) => {
  return (
    <div className="in-game">
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ minWidth: 240 }}>
          <h3>Players in Room</h3>
          <ul className="players-list">
            {players.map((p) => (
              <li key={p.id} className={p.id === state?.currentTurnPlayerId ? 'current' : ''}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    {p.name} {p.role === 'spectator' ? '(spectator)' : ''} {p.id === state?.currentTurnPlayerId ? ' ← turn' : ''}
                  </div>
                  <div style={{ fontSize: 12, color: '#444' }}>{p.taken?.length || 0} taken</div>
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {!p.taken || p.taken.length === 0 ? 'no cards' : p.taken.map(shortCardName).slice(0, 6).join(', ')}
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
        <h4>Taken Counts</h4>
        <ul>
          {state?.players?.map((p: any) => (
            <li key={p.id}>
              {p.name}: {p.taken?.length || 0}
            </li>
          ))}
        </ul>
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
