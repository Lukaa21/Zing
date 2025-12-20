import React, { useEffect, useState } from 'react';
import { connect } from '../services/socket';
import { getOrCreateGuestId, getReconnectToken, setReconnectToken, clearReconnectToken } from '../utils/guest';
import WaitingRoomView from './WaitingRoomView';
import InGameView from './InGameView';

function shortCardName(cardId: string) {
  const [suit, rank] = cardId.split('-');
  return `${rank} ${suit}`;
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

const Game: React.FC<{ roomId: string; playerName: string; inviteToken?: string; code?: string; onLeave: () => void }> = ({ roomId, playerName, inviteToken, code }) => {
  const [socket, setSocket] = useState<any>(null);
  const [state, setState] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [myId, setMyId] = useState<string | null>(null);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [devMode, setDevMode] = useState<boolean>(false);
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [controlAs, setControlAs] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const playersRef = React.useRef(players);
  React.useEffect(() => {
    playersRef.current = players;
  }, [players]);

  useEffect(() => {
    const s = connect(playerName);
    const guestId = getOrCreateGuestId();
    
    s.on('connect', () => { console.log('connected to backend'); setMyId(guestId); });
    // if socket is already connected (reused singleton), set myId immediately
    if (s.connected) setMyId(guestId);
    s.off('game_state');
    s.off('game_event');
    s.off('room_update');
    s.off('join_error');
    s.on('game_state', (sState: any) => { const st = sState?.state || sState; setState(st); setPlayers(st?.players || []);
      // If this client hasn't captured its player id yet (or there's a mismatch),
      // try to infer our player id by matching the supplied playerName so hand shows up.
      try {
        const meByGuestId = st?.players?.find((p: any) => p.id === guestId);
        if (meByGuestId) {
          setMyId(guestId);
          return;
        }
        const meByName = st?.players?.find((p: any) => p.name === playerName);
        if (meByName) {
          setMyId(meByName.id);
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
      // Store current room in sessionStorage for reconnect on refresh
      sessionStorage.setItem('zing_current_room', roomId);
      // Prefer matching by guestId, then fallback to matching by name
      try {
        const meByGuestId = (u.players || []).find((p: any) => p.id === guestId);
        if (meByGuestId) {
          setMyId(guestId);
          return;
        }
        const normalizedName = (playerName || '').toLowerCase().trim();
        const meByName = (u.players || []).find((p: any) => (p.name || '').toLowerCase().trim() === normalizedName);
        if (meByName) {
          setMyId(meByName.id);
        }
      } catch (e) {void e;}
    });

    s.on('join_error', (err: { reason: string; message?: string }) => {
      const errorMsg = err.message || `Failed to join room: ${err.reason}`;
      setJoinError(errorMsg);
      console.error('join_error', err);
    });

    s.on('reconnect_token', (data: { token: string; roomId: string }) => {
      console.log('Received reconnect token for room', data.roomId, 'with guestId', guestId);
      // Store token with guestId as part of the key to avoid conflicts between different players
      // guestId is per-tab unique, so each player has their own token key
      setReconnectToken(data.roomId, data.token, guestId);
    });

    s.on('rejoin_error', (err: { reason: string; message?: string }) => {
      const errorMsg = err.message || `Failed to rejoin room: ${err.reason}`;
      console.warn('rejoin_error', err);
      // Rejoin failed, clear the token and try normal join_room
      clearReconnectToken(roomId, guestId);
      const joinPayload: any = { roomId, guestId, name: playerName };
      if (code) joinPayload.code = code;
      if (inviteToken) joinPayload.inviteToken = inviteToken;
      console.log('Fallback: emitting join_room after rejoin failure');
      s.emit('join_room', joinPayload);
    });

    // announce auth for this client and join the room
    s.emit('auth', { guestId, name: playerName, role: 'player' });
    
    // Try to rejoin with stored token first (if available)
    if (!hasJoined) {
      const storedToken = getReconnectToken(roomId, guestId);
      if (storedToken) {
        console.log('Game.tsx: attempting rejoin with stored token for guestId', guestId);
        s.emit('rejoin_room', { roomId, guestId, reconnectToken: storedToken });
        setHasJoined(true);
      } else {
        // No stored token, do normal join_room
        const joinPayload: any = { roomId, guestId, name: playerName };
        if (code) joinPayload.code = code;
        if (inviteToken) joinPayload.inviteToken = inviteToken;
        console.log('Game.tsx: emitting join_room with payload:', joinPayload);
        s.emit('join_room', joinPayload);
        setHasJoined(true);
      }
    }
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

  // Determine phase: isInGame means handNumber is set and > 0
  const isInGame = Boolean(state?.handNumber && state?.handNumber > 0);

  // Calculate owner status - only use myId comparison to avoid name conflicts
  const isOwner = !!(ownerId && myId && ownerId === myId);

  // Calculate start-enabled (2 or 4 players)
  const isStartEnabled = players.length === 2 || players.length === 4;

  return (
    <div className="game container">
      <h1>Game Room</h1>
      {joinError && <div className="error-banner">{joinError}</div>}
      <p>Room: {roomId}</p>
      <p>Player: {players?.find((p: any) => p.id === myId)?.name || state?.players?.find((p: any) => p.id === myId)?.name || playerName || '—'}</p>
      <div className="board">
        {isInGame ? (
          <InGameView
            state={state}
            players={state?.players || players}
            myId={myId}
            playerName={playerName}
            logs={logs}
            devMode={devMode}
            controlAs={controlAs}
            setDevMode={setDevMode}
            setControlAs={setControlAs}
            onPlay={handlePlay}
          />
        ) : (
          <WaitingRoomView
            roomId={roomId}
            players={players}
            myId={myId}
            ownerId={ownerId}
            playerName={playerName}
            onStart={handleStart}
            isOwner={isOwner}
            isStartEnabled={isStartEnabled}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
