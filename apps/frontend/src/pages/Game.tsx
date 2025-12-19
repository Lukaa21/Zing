import React, { useEffect, useState } from 'react';
import Hand from '../components/Hand';
import Card from '../components/Card';
import { connect } from '../services/socket';

function shortCardName(cardId: string) {
  const [suit, rank] = cardId.split('-');
  return `${rank} ${suit}`;
}

function formatTakenSummary(taken: string[]) {
  if (!taken || taken.length === 0) return 'no cards';
  return taken.map(shortCardName).slice(0, 6).join(', ');
}

function formatEvent(ev: any, actorName?: string) {
  if (!ev) return '';
  const actor = actorName || ev.actor || 'unknown';
  switch (ev.type) {
    case 'card_played':
      return `${actor} played ${shortCardName(ev.payload.cardId)}`;
    case 'talon_taken':
      return `${actor} took ${ev.payload.taken.length} cards${ev.payload.zing ? ` (zing +${ev.payload.zing.points})` : ''}`;
    case 'game_started':
      return `Game started`;
    case 'hands_dealt':
      return `New hands dealt${ev.payload?.handNumber ? ` (hand ${ev.payload.handNumber})` : ''}`;
    case 'talon_awarded':
      return `${actor} awarded remaining talon: ${ev.payload?.taken?.map((c: string) => shortCardName(c)).join(', ')}`;
    case 'round_end':
      if (ev.payload) {
        const s = ev.payload.scores || {};
        const teams = ev.payload.teams || {};
        const bonus = ev.payload.bonus || null;
        const teamLines: string[] = [];
        ['team0', 'team1'].forEach((tk, idx) => {
          const t = teams[tk] || { scoringCards: [], zings: 0, totalTaken: 0, totalPoints: s[tk] || 0, players: [] };
          const cards = (t.scoringCards || []).map((c: any) => `${shortCardName(c.card)} (${c.pts})`).join(', ') || 'none';
          const zings = (t.zings || 0) || 0;
          const players = (t.players || []).join(', ') || `team ${idx}`;
          teamLines.push(`${players}: ${t.totalPoints || s[tk] || 0} pts — scoring: ${cards}; zings: ${zings}; taken: ${t.totalTaken || 0}`);
        });
        if (bonus) {
          if (bonus.reason === 'most_cards') teamLines.push(`Bonus: +3 to team ${bonus.awardedToTeam} for most cards`);
          else if (bonus.reason === 'tie_two_clubs') teamLines.push(`Bonus: +3 to team ${bonus.awardedToTeam} (2♣ tiebreaker)`);
        }
        return `Round ended — ${teamLines.join(' | ')}`;
      }
      return `Round ended — scores: ${JSON.stringify(ev.payload?.scores)}`;
    default:
      return `${ev.type}`;
  }
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const Game: React.FC<{ roomId: string; playerName: string; onLeave: () => void }> = ({ roomId, playerName }) => {
  const [socket, setSocket] = useState<any>(null);
  const [state, setState] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
    const [logs, setLogs] = useState<string[]>([]);
    const [myId, setMyId] = useState<string | null>(null);
    const [ownerId, setOwnerId] = useState<string | null>(null);
    const [devMode, setDevMode] = useState<boolean>(false);
    const [controlAs, setControlAs] = useState<string | null>(null);
  const playersRef = React.useRef(players);
  React.useEffect(() => { playersRef.current = players; }, [players]);

  useEffect(() => {
    const s = connect(playerName);
    s.on('connect', () => { console.log('connected to backend'); s.id && setMyId(s.id); });
    // if socket is already connected (reused singleton), set myId immediately
    if (s.id) setMyId((cur) => cur || s.id || null);
    s.off('game_state');
    s.off('game_event');
    s.off('room_update');
    s.on('game_state', (sState: any) => { const st = sState?.state || sState; setState(st); setPlayers(st?.players || []);
      // If this client hasn't captured its socket id yet (or there's a mismatch),
      // try to infer our player id by matching the supplied playerName so hand shows up.
      try {
        const meByName = st?.players?.find((p: any) => p.name === playerName);
        if (meByName && (!s.id || s.id !== meByName.id)) {
          // if we haven't set myId yet, set it to the found id so UI can match our hand
          setMyId((cur) => cur || meByName.id || null);
        }
      } catch (e) { void e; }
    });
    s.on('game_event', (ev: any) => {
      const actorName = playersRef.current?.find((p: any) => p.id === ev.actor)?.name || ev.actor;
      const msg = formatEvent(ev, actorName);
      setLogs((l: string[]) => [msg, ...l].slice(0, 200));
      console.log('event', ev);
    });
    s.on('room_update', (u: any) => {
      console.log('room_update', u);
      setPlayers(u.players || []);
      setOwnerId(u.ownerId || null);
      // Prefer matching by socket id (fast and reliable), then fallback to matching by name
      try {
        const meById = (u.players || []).find((p: any) => p.id === s.id);
        if (meById) {
          setMyId((cur) => cur || meById.id || null);
          return;
        }
        const normalizedName = (playerName || '').toLowerCase().trim();
        const meByName = (u.players || []).find((p: any) => (p.name || '').toLowerCase().trim() === normalizedName);
        if (meByName) {
          setMyId((cur) => cur || meByName.id || null);
        }
      } catch (e) {}
    });

    // announce auth for this client and join the room
    s.emit('auth', { name: playerName, role: 'player' });
    // send name as fallback to avoid races where server hasn't applied auth yet
    s.emit('join_room', { roomId, name: playerName });
    setSocket(s);
    // Do not disconnect here; socket is shared across views
    return () => {
      // keep socket alive (do not disconnect singleton)
      s.disconnect();
    };


  }, []);

  const handlePlay = (cardId: string, _ownerId?: string) => {
    if (!socket) return;
    // Dev mode: if controlAs is set, send intent as that player
    if (devMode && controlAs) {
      socket.emit('intent_play_card_as', { roomId, cardId, asPlayerId: controlAs });
      return;
    }
    // prefer matching by socket id, but fall back to matching by name so the player
    // can still play when there's an id mismatch between socket and game state
    const me = state?.players?.find((p: any) => p.id === myId) || state?.players?.find((p: any) => p.name === playerName);
    if (!me) {
      setLogs((l) => [`You are not recognized in the room (cannot play)`, ...l].slice(0, 200));
      return;
    }
    if (state?.currentTurnPlayerId !== me.id) {
      setLogs((l) => [`Not your turn`, ...l].slice(0, 200));
      return;
    }
    socket.emit('intent_play_card', { roomId, cardId });
  };

  const handleStart = () => {
    if (!socket) return;
    setLogs((l) => [`Starting game...`, ...l].slice(0, 200));
    socket.emit('start_game', { roomId });
  };


  return (
    <div className="game container">
      <h1>Game Room</h1>
      <p>Room: {roomId}</p>
      <p>Player: {players?.find((p:any) => p.id === myId)?.name || state?.players?.find((p:any) => p.id === myId)?.name || playerName || '—'}</p>
      <div className="board">
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
                      <div style={{ fontSize: 12, color: '#222', marginTop: 4 }}>{p.name || p.id}</div>
                      </div>
                      <div style={{ fontSize: 12, color: '#666' }}>{formatTakenSummary(p.taken || [])}</div>
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
                <div><strong>Turn:</strong> {state?.players?.find((p:any) => p.id === state?.currentTurnPlayerId)?.name || '—'}</div>
                <div><strong>Deck:</strong> {state?.deck?.length ?? 0} cards</div>
                <div><strong>Hand:</strong> {state?.handNumber ?? 0}</div>
              </div>
                  <div style={{ marginTop: 8 }}>
                    <label style={{ fontSize: 13 }}>
                      <input type="checkbox" checked={devMode} onChange={(e) => { setDevMode(e.target.checked); if (e.target.checked) setControlAs(myId); else setControlAs(null); }} />{' '}
                      Dev/Test Mode (show all hands & control any player)
                    </label>
                  </div>
            </div>
          </div>
        <div className="player-hand">
          {devMode ? (
            <div>
              <h3>All Hands</h3>
              <div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Control as:</strong>{' '}
                  <select value={controlAs || ''} onChange={(e) => setControlAs(e.target.value || null)}>
                    <option value="">(none)</option>
                    {players.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
                  </select>
                </div>
                {players.map((p) => (
                  <div key={p.id} style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 'bold' }}>{p.name} {p.id === state?.currentTurnPlayerId ? '← turn' : ''}</div>
                    <Hand
                      cards={p.hand || []}
                      onPlay={(id) => handlePlay(id, p.id)}
                      disabled={!(controlAs === p.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3>Your Hand</h3>
                {/* Prefer matching by socket id, but fall back to matching by player name so the hand is visible
                  even when there is an id mismatch immediately after start. */}
              {(() => {
                const me = state?.players?.find((p:any) => p.id === myId) || state?.players?.find((p:any) => p.name === playerName);
                const hand = me?.hand || [];
                const myPlayerId = me?.id;
                return (
                  <Hand
                    cards={hand}
                    onPlay={(id) => handlePlay(id)}
                    disabled={myPlayerId !== state?.currentTurnPlayerId}
                  />
                );
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
                  <li key={idx} style={{ fontSize: 13, color: '#222' }}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
      </div>
      <div className="controls">
        {/* Only the room owner sees the Start button (ownerId provided by server in room_update) */}
        {(() => {
          const ownerMatchesSocket = ownerId && myId && ownerId === myId;
          const ownerMatchesByName = ownerId && (players?.find((p:any) => p.name === playerName)?.id === ownerId);
          const isOwner = !!(ownerMatchesSocket || ownerMatchesByName);
          if (!isOwner) return <div style={{ color: '#666' }}>Waiting for room owner to start the game</div>;
          return <button onClick={() => handleStart()} disabled={!(players.length === 2 || players.length === 4)}>Start Game</button>;
        })()}
      </div>

      
    </div>
  );
};

export default Game;
