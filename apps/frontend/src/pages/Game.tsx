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

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

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
  
  // Debug: Log props to see what's being passed
  console.log('[Game.tsx] Props received:', { roomId, playerName, inviteToken: inviteToken ? `${inviteToken.slice(0, 8)}...` : 'none', code });
  
  const [socket, setSocket] = useState<any>(null);
  const [state, setState] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [myId, setMyId] = useState<string | null>(null);
  const [guestId, setGuestId] = useState<string>('');
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [devMode, setDevMode] = useState<boolean>(false);
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [controlAs, setControlAs] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [isMatchmakingTransition, setIsMatchmakingTransition] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number | undefined>(undefined);
  const [timerExpiresAt, setTimerExpiresAt] = useState<number | undefined>(undefined);
  // Talon pause state (1.5s visual pause when talon is taken)
  const [isTalonPause, setIsTalonPause] = useState<boolean>(false);
  const [pausedTalonTopCard, setPausedTalonTopCard] = useState<string | null>(null);
  const isTalonPauseRef = React.useRef<boolean>(false);
  React.useEffect(() => { isTalonPauseRef.current = isTalonPause; }, [isTalonPause]);
  const talonPauseTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  // Buffer for a turn_timer_started received during pause
  const bufferedTimerRef = React.useRef<{ duration: number; expiresAt?: number } | null>(null);
  const [surrenderVotes, setSurrenderVotes] = useState<any>(null);
  const [rematchVotes, setRematchVotes] = useState<any>(null);
  const [roundRecap, setRoundRecap] = useState<{ payload: any; expiresAt: number } | null>(null);
  const roundRecapTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const isRoundRecapRef = React.useRef<boolean>(false);
  React.useEffect(() => { isRoundRecapRef.current = !!roundRecap; }, [roundRecap]);

  // When match ends, suppress showing the round recap modal (we show match end instead)
  const suppressRecapRef = React.useRef<boolean>(false);
  const suppressRecapTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // (no round-start client buffer; server controls recap pause)

  const playersRef = React.useRef(players);
  React.useEffect(() => {
    playersRef.current = players;
  }, [players]);

  const stateRef = React.useRef(state);
  React.useEffect(() => {
    stateRef.current = state;
  }, [state]);
  
  // Prevent double socket initialization in React Strict Mode
  const hasInitializedRef = React.useRef(false);
  
  // Track game ID to detect when a new game starts (after rematch)
  const prevGameIdRef = React.useRef<string | null>(null);
  
  // Reset votes when a new game starts
  React.useEffect(() => {
    if (state?.id) {
      // If game ID changed, it's a new game - reset votes
      if (prevGameIdRef.current && prevGameIdRef.current !== state.id) {
        console.log('New game detected (ID changed), resetting votes');
        setSurrenderVotes(null);
        setRematchVotes(null);
      }
      prevGameIdRef.current = state.id;
    }
  }, [state?.id]);

  useEffect(() => {
    // In React Strict Mode (dev), useEffect runs twice. Prevent double initialization.
    if (hasInitializedRef.current) {
      console.log('[Game.tsx] useEffect already initialized, skipping (Strict Mode)');
      return;
    }
    hasInitializedRef.current = true;
    
    const s = connect(playerName, 'player', token || undefined);
    const currentGuestId = getOrCreateGuestId();
    setGuestId(currentGuestId);
    let actualPlayerId: string | null = null;
    
    // Listen for auth_ok to get the correct ID (either userId or guestId)
    const authOkHandler = (auth: any) => {
      console.log('auth_ok received:', auth);
      actualPlayerId = auth.id;
      setMyId(auth.id);
    };
    
    s.off('auth_ok'); // Remove old handlers
    s.on('auth_ok', authOkHandler);
    
    // Fallback: if already connected, set guestId initially
    if (s.connected) setMyId(currentGuestId);
    
    s.on('connect', () => { console.log('connected to backend'); });
    s.off('game_state');
    s.off('game_event');
    s.off('room_update');
    s.off('join_error');
    s.on('game_state', (sState: any) => { 
      const st = sState?.state || sState; 
      console.log('game_state received:', st);
      setState(st); 
      // DON'T overwrite players from room_update - it contains spectators which game_state doesn't have
      // setPlayers(st?.players || []);
      // Only try to infer myId from game_state if we don't have it yet
      // Match by guestId only, don't use playerName as it can be outdated
      if (!myId) {
        const meByGuestId = st?.players?.find((p: any) => p.id === currentGuestId);
        if (meByGuestId) {
          setMyId(currentGuestId);
        }
      }
    });
    s.on('game_event', (ev: any) => {
      // Find actor name from room players OR game state players (as backup)
      let actorName = playersRef.current?.find((p: any) => p.id === ev.actor)?.name;
      
      if (!actorName && stateRef.current?.players) {
        actorName = stateRef.current.players.find((p: any) => p.id === ev.actor)?.name;
      }
      
      actorName = actorName || 'Player';

      const msg = formatEvent(ev, actorName);
      setLogs((l: string[]) => [msg, ...l].slice(0, 200));
      console.log('event', ev);
      console.log('[Game] game_event raw:', ev);
      console.log('[Game] game_event type=', ev.type);
      // Talon taken pause handling (show last played card for 1.5s and disable plays)
      if (ev.type === 'talon_taken') {
        try {
          const taken: string[] = ev.payload?.taken || [];
          const lastPlayed = taken.length > 0 ? taken[taken.length - 1] : null;

          // Buffer current timer (if any) and clear it to pause
          if (timerDuration || timerExpiresAt) {
            bufferedTimerRef.current = { duration: timerDuration || 0, expiresAt: timerExpiresAt };
            setTimerDuration(undefined);
            setTimerExpiresAt(undefined);
          }

          // Start talon pause
          if (talonPauseTimerRef.current) {
            clearTimeout(talonPauseTimerRef.current);
            talonPauseTimerRef.current = null;
          }

          setIsTalonPause(true);
          setPausedTalonTopCard(lastPlayed);

          talonPauseTimerRef.current = setTimeout(() => {
            setIsTalonPause(false);
            setPausedTalonTopCard(null);

            // Restore buffered timer (start it afresh from now)
            const buffered = bufferedTimerRef.current;
            if (buffered) {
              setTimerDuration(buffered.duration);
              setTimerExpiresAt(Date.now() + (buffered.duration || 0));
              bufferedTimerRef.current = null;
            }

            if (talonPauseTimerRef.current) {
              clearTimeout(talonPauseTimerRef.current);
              talonPauseTimerRef.current = null;
            }
          }, 1500);
        } catch (err) {
          console.error('Error handling talon_taken pause:', err);
        }
      }

      // When a card is played, reset the UI timer immediately so it doesn't stick at 0.0
      if (ev.type === 'card_played') {
        console.log('[Game] clearing frontend timer due to card_played event');
        // clear displayed timer — server will emit the next turn_timer_started when appropriate
        setTimerDuration(undefined);
        setTimerExpiresAt(undefined);
        // also clear any buffered timers to avoid stale values
        bufferedTimerRef.current = null;
      }

      // Round recap handling (show recap modal for 9s) — but suppress if match ends
      if (ev.type === 'round_end') {
        try {
          const payload = ev.payload || {};
          const recapDuration = 9000; // 9 seconds
          const expiresAt = Date.now() + recapDuration;

          // Clear any existing recap timer
          if (roundRecapTimerRef.current) {
            clearTimeout(roundRecapTimerRef.current);
            roundRecapTimerRef.current = null;
          }

          // Show recap after a short delay so a following `match_end` event
          // can suppress it (end of whole game). This avoids briefly showing
          // a round recap when the game actually ended.
          const showRecap = () => {
            if (suppressRecapRef.current) return;
            setRoundRecap({ payload, expiresAt });
            isRoundRecapRef.current = true;
            roundRecapTimerRef.current = setTimeout(() => {
              setRoundRecap(null);
              isRoundRecapRef.current = false;
              roundRecapTimerRef.current = null;
              // If a timer was buffered during recap, restore it now
              const buffered = bufferedTimerRef.current;
              if (buffered) {
                setTimerDuration(buffered.duration);
                setTimerExpiresAt(Date.now() + (buffered.duration || 0));
                bufferedTimerRef.current = null;
              }
            }, recapDuration);
          };

          setTimeout(showRecap, 120);
        } catch (err) {
          console.error('Error handling round_end recap:', err);
        }
      }

      // If the whole match ended, suppress showing the round recap modal
      if (ev.type === 'match_end') {
        // Mark suppression so a delayed round recap won't show
        suppressRecapRef.current = true;
        if (suppressRecapTimerRef.current) {
          clearTimeout(suppressRecapTimerRef.current);
          suppressRecapTimerRef.current = null;
        }
        // Keep suppressed for a short window, then reset
        suppressRecapTimerRef.current = setTimeout(() => {
          suppressRecapRef.current = false;
          if (suppressRecapTimerRef.current) {
            clearTimeout(suppressRecapTimerRef.current);
            suppressRecapTimerRef.current = null;
          }
        }, 3000);

        // If recap is already visible, clear it immediately
        if (roundRecapTimerRef.current) {
          clearTimeout(roundRecapTimerRef.current);
          roundRecapTimerRef.current = null;
        }
        if (isRoundRecapRef.current) {
          setRoundRecap(null);
          isRoundRecapRef.current = false;
        }
      }

      // hands_dealt handled by server; no client-side round-start buffer
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
        const meByGuestId = (u.players || []).find((p: any) => p.id === currentGuestId);
        if (meByGuestId) {
          setMyId(currentGuestId);
        }
      }
    });

    s.on('join_error', (err: { reason: string; message?: string }) => {
      const errorMsg = err.message || `Failed to join room: ${err.reason}`;
      setJoinError(errorMsg);
      console.error('join_error', err);
    });

    s.on('reconnect_token', (data: { token: string; roomId: string }) => {
      console.log('Received reconnect token for room', data.roomId, 'with guestId', currentGuestId);
      // Store token with guestId as part of the key to avoid conflicts between different players
      // guestId is per-tab unique, so each player has their own token key
      setReconnectToken(data.roomId, data.token, currentGuestId);
    });

    s.on('turn_timer_started', (data: { playerId: string; duration: number; expiresAt: number }) => {
      console.log('[Game] turn_timer_started received', data, 'isTalonPause=', isTalonPauseRef.current, 'isRoundRecap=', isRoundRecapRef.current);
      // Buffer timer if talon pause or recap is active; otherwise apply immediately
      if (isTalonPauseRef.current) {
        bufferedTimerRef.current = { duration: data.duration, expiresAt: data.expiresAt };
        console.log('[Game] buffered due to talon pause', bufferedTimerRef.current);
      } else if (isRoundRecapRef.current) {
        bufferedTimerRef.current = { duration: data.duration, expiresAt: data.expiresAt };
        console.log('[Game] buffered due to recap', bufferedTimerRef.current);
      } else {
        console.log('[Game] applying timer to UI', { duration: data.duration, expiresAt: data.expiresAt });
        setTimerDuration(data.duration);
        setTimerExpiresAt(data.expiresAt);
      }
    });

    s.on('match_found', (data: { roomId: string; mode: string; players: any[] }) => {
      console.log('match_found: transitioning from old room to new matchmaking room', data.roomId);
      
      // Set flag to prevent auto-navigation during transition
      setIsMatchmakingTransition(true);
      
      // Clear reconnect token for old room (always use currentGuestId as that's the key)
      clearReconnectToken(roomId, currentGuestId);
      
      // Update current room in sessionStorage
      sessionStorage.setItem('zing_current_room', data.roomId);
      
      // Update App state with new roomId
      if (onRoomChange) {
        onRoomChange(data.roomId);
      }
      
      // Join the new matchmaking room to sync state
      // The room_update event will automatically update the UI with new room data
      s.emit('join_room', { roomId: data.roomId, guestId: currentGuestId, name: playerName });
    });

    s.on('rejoin_error', (err: { reason: string; message?: string }) => {
      const errorMsg = err.message || `Failed to rejoin room: ${err.reason}`;
      console.warn('rejoin_error', err);
      // Rejoin failed, clear the token and try normal join_room (always use currentGuestId as that's the key)
      clearReconnectToken(roomId, currentGuestId);
      
      const joinPayload: any = { roomId, guestId: currentGuestId, name: playerName };
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
      
      s.emit('auth', { token: token || undefined, guestId: currentGuestId, name: playerName, role: 'player' });
    });

    // Wait a bit for auth_ok to arrive, then try to rejoin or join normally
    if (!hasJoined) {
      setTimeout(() => {
        // Always use currentGuestId for reconnect token (that's the key it's stored with)
        const storedToken = getReconnectToken(roomId, currentGuestId);
        if (storedToken) {
          console.log('Game.tsx: attempting rejoin with stored token for guestId', currentGuestId);
          s.emit('rejoin_room', { roomId, guestId: currentGuestId, reconnectToken: storedToken });
          setHasJoined(true);
        } else {
          // No stored token, do normal auth + join_room
          // IMPORTANT: Wait for auth_ok before joining to ensure socket.data.identity is set
          console.log('Game.tsx: no reconnect token, doing normal auth + join');
        
        const joinPayload: any = { roomId, guestId: currentGuestId, name: playerName };
        if (code && typeof code === 'string') joinPayload.code = code;
        if (inviteToken && typeof inviteToken === 'string') joinPayload.inviteToken = inviteToken;
        
        // Listen for auth_ok once, then emit join_room
        const onAuthOk = () => {
          console.log('Game.tsx: auth_ok received, now emitting join_room with payload:', joinPayload);
          s.emit('join_room', joinPayload);
          s.off('auth_ok', onAuthOk);
        };
        s.on('auth_ok', onAuthOk);
        
        s.emit('auth', { token: token || undefined, guestId: currentGuestId, name: playerName, role: 'player' });
        setHasJoined(true);
        }
      }, 100); // Wait 100ms for auth_ok
    }
    
    // Surrender and Rematch event listeners
    s.on('surrender_vote_added', (data: any) => {
      console.log('surrender_vote_added', data);
      setSurrenderVotes(data);
    });
    
    s.on('team_surrendered', (data: any) => {
      console.log('team_surrendered', data);
      setSurrenderVotes(null);
      // Game state will be updated via game_state event
    });
    
    s.on('rematch_vote_added', (data: any) => {
      console.log('rematch_vote_added', data);
      setRematchVotes(data);
    });
    
    s.on('rematch_started', () => {
      console.log('rematch_started');
      setRematchVotes(null);
      setSurrenderVotes(null);
      setLogs([]);
      // Game state will be updated via game_state event
    });
    
    s.on('game_exited', (data: { roomId: string }) => {
      console.log('game_exited', data);
      // Another player exited the game, reset game state
      setState(null);
      setRematchVotes(null);
      setSurrenderVotes(null);
      setLogs([]);
      // Navigate back to room view if we're still in game view
      if (location.pathname === '/game') {
        navigate('/room', { replace: true });
      }
    });
    
    s.on('returned_to_room', (data: { roomId: string; room: any }) => {
      console.log('returned_to_room', data);
      // Update room ID and navigate back to room screen
      if (onRoomChange) {
        onRoomChange(data.roomId);
      }
      sessionStorage.setItem('zing_current_room', data.roomId);
      // Reset game state
      setState(null);
      setRematchVotes(null);
      setSurrenderVotes(null);
      setLogs([]);
    });
    
    s.on('stayed_in_room', (data: { roomId: string; room: any }) => {
      console.log('stayed_in_room', data);
      // Game exited but staying in the same private room
      // Just reset game state, keep roomId the same
      setState(null);
      setRematchVotes(null);
      setSurrenderVotes(null);
      setLogs([]);
      // Navigate back to room view
      navigate('/room', { replace: true });
    });
    
    s.on('left_room', (data: { roomId: string }) => {
      console.log('left_room', data);
      // Navigate back to lobby
      if (onLeave) {
        onLeave();
      }
    });
    
    setSocket(s);
    // Do not disconnect here; socket is shared across views
    return () => {
      // Clean up all event handlers
      s.off('auth_ok', authOkHandler);
      s.off('surrender_vote_added');
      s.off('team_surrendered');
      s.off('rematch_vote_added');
      s.off('rematch_started');
      s.off('returned_to_room');
      s.off('stayed_in_room');
      s.off('game_exited');
      s.off('left_room');
      // keep socket alive (do not disconnect singleton)
      s.disconnect();

      // Cleanup any talon pause timer if active
      if (talonPauseTimerRef.current) {
        clearTimeout(talonPauseTimerRef.current);
        talonPauseTimerRef.current = null;
      }
      bufferedTimerRef.current = null;
      // Ensure recap state cleared
      // Cleanup recap timer
      if (roundRecapTimerRef.current) {
        clearTimeout(roundRecapTimerRef.current);
        roundRecapTimerRef.current = null;
      }
      isRoundRecapRef.current = false;
      // Cleanup suppression timer
      if (suppressRecapTimerRef.current) {
        clearTimeout(suppressRecapTimerRef.current);
        suppressRecapTimerRef.current = null;
      }
      suppressRecapRef.current = false;
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
    if (roundRecap) {
      setLogs((l) => [`Akcija onemogućena tokom rezimea runde`, ...l].slice(0, 200));
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
  
  const handleSurrender = () => {
    if (!socket) return;
    console.log('Voting to surrender');
    socket.emit('vote_surrender', { roomId });
  };
  
  const handleRematch = () => {
    if (!socket) return;
    console.log('Voting for rematch');
    socket.emit('vote_rematch', { roomId });
  };
  
  const handleExitGame = () => {
    if (!socket) return;
    console.log('Exiting game');
    socket.emit('exit_game', { roomId });
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
  
  // Check if current user is a spectator (only check room players, not game state players)
  // Game state players only contains active players, not spectators
  const isSpectator = players.find(p => p.id === myId)?.role === 'spectator';

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
            isSpectator={isSpectator}
            controlAs={controlAs}
            timerDuration={timerDuration}
            timerExpiresAt={timerExpiresAt}
            isTalonPause={isTalonPause}
            pausedTalonTopCard={pausedTalonTopCard}
            roundRecap={roundRecap?.payload}
            recapExpiresAt={roundRecap?.expiresAt}
            recapActive={!!roundRecap}
            setDevMode={setDevMode}
            setControlAs={setControlAs}
            onPlay={handlePlay}
            onSurrender={handleSurrender}
            onRematch={handleRematch}
            onExit={handleExitGame}
            surrenderVotes={surrenderVotes}
            rematchVotes={rematchVotes}
          />
        ) : (
          <RoomScreen
            roomId={roomId}
            myId={myId}
            guestId={guestId}
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
