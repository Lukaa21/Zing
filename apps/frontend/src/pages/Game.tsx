import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from '../services/socket';
import { getOrCreateGuestId, getReconnectToken, setReconnectToken, clearReconnectToken } from '../utils/guest';
import RoomScreen from './RoomScreen';
import InGameView from './InGameView';
import { useAuth } from '../context/AuthContext';

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

interface GameProps {
  roomId: string;
  playerName: string;
  inviteToken?: string;
  code?: string;
  onLeave?: () => void;
  onRoomChange?: (newRoomId: string) => void;
  initialRoute?: 'room' | 'game';
}

const Game: React.FC<GameProps> = ({ roomId, playerName, inviteToken, code, onLeave, onRoomChange, initialRoute }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
  const [isMatchmakingTransition, setIsMatchmakingTransition] = useState<boolean>(false);
  const playersRef = React.useRef(players);
  React.useEffect(() => {
    playersRef.current = players;
  }, [players]);

  useEffect(() => {
    const s = connect(playerName, 'player', token || undefined);
    const guestId = getOrCreateGuestId();
    
    // Listen for auth_ok to get the correct ID (either userId or guestId)
    const authOkHandler = (auth: any) => {
      console.log('auth_ok received:', auth);
      setMyId(auth.id);
    };
    
    s.off('auth_ok'); // Remove old handlers
    s.on('auth_ok', authOkHandler);
    
    // Fallback: if already connected, set guestId initially
    if (s.connected) setMyId(guestId);
    
    s.on('connect', () => { console.log('connected to backend'); });
    s.off('game_state');
    s.off('game_event');
    s.off('room_update');
    s.off('join_error');
    s.on('game_state', (sState: any) => { const st = sState?.state || sState; setState(st); setPlayers(st?.players || []);
      // Only try to infer myId from game_state if we don't have it yet
      // Match by guestId only, don't use playerName as it can be outdated
      if (!myId) {
        const meByGuestId = st?.players?.find((p: any) => p.id === guestId);
        if (meByGuestId) {
          setMyId(guestId);
        }
      }
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
      // Use roomId from the event, not from props (props may be stale during transitions)
      if (u.roomId) {
        sessionStorage.setItem('zing_current_room', u.roomId);
        // Also update App state if roomId changed
        if (onRoomChange && u.roomId !== roomId) {
          onRoomChange(u.roomId);
        }
        // Reset matchmaking transition flag once we receive room_update for new room
        setIsMatchmakingTransition(false);
      }
      // Only match by guestId, don't use playerName (can be outdated)
      if (!myId) {
        const meByGuestId = (u.players || []).find((p: any) => p.id === guestId);
        if (meByGuestId) {
          setMyId(guestId);
        }
      }
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

    s.on('match_found', (data: { roomId: string; mode: string; players: any[] }) => {
      console.log('match_found: transitioning from old room to new matchmaking room', data.roomId);
      
      // Set flag to prevent auto-navigation during transition
      setIsMatchmakingTransition(true);
      
      // Clear reconnect token for old room
      clearReconnectToken(roomId, guestId);
      
      // Update current room in sessionStorage
      sessionStorage.setItem('zing_current_room', data.roomId);
      
      // Update App state with new roomId
      if (onRoomChange) {
        onRoomChange(data.roomId);
      }
      
      // Join the new matchmaking room to sync state
      // The room_update event will automatically update the UI with new room data
      s.emit('join_room', { roomId: data.roomId, guestId, name: playerName });
    });

    s.on('rejoin_error', (err: { reason: string; message?: string }) => {
      const errorMsg = err.message || `Failed to rejoin room: ${err.reason}`;
      console.warn('rejoin_error', err);
      // Rejoin failed, clear the token and try normal join_room
      clearReconnectToken(roomId, guestId);
      
      const joinPayload: any = { roomId, guestId, name: playerName };
      if (code && typeof code === 'string') joinPayload.code = code;
      if (inviteToken && typeof inviteToken === 'string') joinPayload.inviteToken = inviteToken;
      
      // After rejoin fails, authenticate then wait for auth_ok before joining
      console.log('Sending auth after rejoin failure');
      const onAuthOkRejoin = () => {
        console.log('Fallback: auth_ok received, now emitting join_room');
        s.emit('join_room', joinPayload);
        s.off('auth_ok', onAuthOkRejoin);
      };
      s.on('auth_ok', onAuthOkRejoin);
      
      s.emit('auth', { token: token || undefined, guestId, name: playerName, role: 'player' });
    });

    // Try to rejoin with stored token first (if available)
    // If rejoin succeeds, auth will be handled by the server
    // If rejoin fails, rejoin_error handler will emit auth + join_room
    if (!hasJoined) {
      const storedToken = getReconnectToken(roomId, guestId);
      if (storedToken) {
        console.log('Game.tsx: attempting rejoin with stored token for guestId', guestId);
        s.emit('rejoin_room', { roomId, guestId, reconnectToken: storedToken });
        setHasJoined(true);
      } else {
        // No stored token, do normal auth + join_room
        // IMPORTANT: Wait for auth_ok before joining to ensure socket.data.identity is set
        console.log('Game.tsx: no reconnect token, doing normal auth + join');
        
        const joinPayload: any = { roomId, guestId, name: playerName };
        if (code && typeof code === 'string') joinPayload.code = code;
        if (inviteToken && typeof inviteToken === 'string') joinPayload.inviteToken = inviteToken;
        
        // Listen for auth_ok once, then emit join_room
        const onAuthOk = () => {
          console.log('Game.tsx: auth_ok received, now emitting join_room with payload:', joinPayload);
          s.emit('join_room', joinPayload);
          s.off('auth_ok', onAuthOk);
        };
        s.on('auth_ok', onAuthOk);
        
        s.emit('auth', { token: token || undefined, guestId, name: playerName, role: 'player' });
        setHasJoined(true);
      }
    }
    setSocket(s);
    // Do not disconnect here; socket is shared across views
    return () => {
      // Clean up all event handlers
      s.off('auth_ok', authOkHandler);
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
    socket.emit('intent_play_card', { roomId, cardId, playerId: me.id });
  };

  const handleStart = () => {
    if (!socket) return;
    setLogs((l) => [`Starting game...`, ...l].slice(0, 200));
    socket.emit('start_game', { roomId });
  };

  // Determine phase: isInGame means handNumber is set and > 0
  const computedInGame = Boolean(state?.handNumber && state?.handNumber > 0);
  // Check if this is a matchmaking match (force InGameView immediately)
  const isMatchmakingMatch = location.state?.isMatchmakingMatch;
  // If `initialRoute` is provided (via router path), let it override the computed state
  // If isMatchmakingMatch is true, force InGameView even before state arrives
  const isInGame = initialRoute ? initialRoute === 'game' : (isMatchmakingMatch || computedInGame);

  // Auto-navigate from /room to /game when game starts
  useEffect(() => {
    // Only navigate if:
    // 1. We're on /room path
    // 2. Game has actually started (computedInGame)
    // 3. NOT during matchmaking transition (which will handle navigation differently)
    if (location.pathname === '/room' && computedInGame && !isMatchmakingTransition) {
      console.log('Game started detected (handNumber:', state?.handNumber, '), navigating to /game');
      navigate('/game', { replace: true });
    }
  }, [computedInGame, location.pathname, navigate, state?.handNumber, isMatchmakingTransition]);

  // Calculate owner status - only use myId comparison to avoid name conflicts
  const isOwner = !!(ownerId && myId && ownerId === myId);

  // Calculate start-enabled (2 or 4 players)
  const isStartEnabled = players.length === 2 || players.length === 4;

  return (
    <div className="game container">
      {joinError && <div className="error-banner">{joinError}</div>}
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
          <RoomScreen
            roomId={roomId}
            myId={myId}
            playerName={playerName}
            initialPlayers={players}
            initialOwnerId={ownerId}
            onLeave={onLeave}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
