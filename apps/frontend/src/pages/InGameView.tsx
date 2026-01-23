import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import Hand from '../components/Hand';
import Card from '../components/Card';
import '../styles/InGameView.css';

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
  onSurrender?: () => void;
  onRematch?: () => void;
  onExit?: () => void;
  surrenderVotes?: { playerId: string; team: number; votesNeeded: number; currentVotes: number } | null;
  rematchVotes?: { playerId: string; votesNeeded: number; currentVotes: number } | null;
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
  onSurrender,
  onRematch,
  onExit,
  surrenderVotes,
  rematchVotes,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showSurrenderConfirm, setShowSurrenderConfirm] = useState(false);
  const [zingInfo, setZingInfo] = useState<{ playerName: string; points: number } | null>(null);

  // Detect zing from logs
  useEffect(() => {
    if (!logs || logs.length === 0) return;
    
    const latestLog = logs[0];
    const zingMatch = latestLog.match(/(.+?) took \d+ cards \(zing \+(\d+)\)/);
    
    if (zingMatch) {
      const playerName = zingMatch[1];
      const points = parseInt(zingMatch[2]);
      setZingInfo({ playerName, points });
      
      const timer = setTimeout(() => {
        setZingInfo(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [logs]);

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

  // Determine game mode
  const gameMode = state?.players?.length === 2 ? '1v1' : '2v2';
  
  // Get current player info
  const me = state?.players?.find((p: any) => p.id === myId) || state?.players?.find((p: any) => p.name === playerName);
  const myTeam = me?.team;
  const myHand = me?.hand || [];
  const myPlayerId = me?.id;
  
  // For spectators, show all players' cards
  // Get all active players (exclude spectators from game state)
  const allPlayers = state?.players?.filter((p: any) => p.role !== 'spectator') || [];
  
  // Get other players (excluding me)
  const otherPlayers = allPlayers.filter((p: any) => p.id !== myId) || [];
  
  // Determine player positions
  let topPlayer = null;
  let leftPlayer = null;
  let rightPlayer = null;
  let bottomPlayer = null; // For spectators
  
  if (isSpectator) {
    // Spectators see all players
    if (gameMode === '1v1') {
      topPlayer = allPlayers[0];
      bottomPlayer = allPlayers[1];
    } else {
      // 2v2: Show all 4 players
      topPlayer = allPlayers[0];
      leftPlayer = allPlayers[1];
      rightPlayer = allPlayers[2];
      bottomPlayer = allPlayers[3];
    }
  } else {
    // Regular player view
    if (gameMode === '1v1') {
      topPlayer = otherPlayers[0];
    } else {
      // 2v2: partner top, opponents left/right
      const partner = otherPlayers.find((p: any) => p.team === myTeam);
      const opponents = otherPlayers.filter((p: any) => p.team !== myTeam);
      topPlayer = partner;
      leftPlayer = opponents[0];
      rightPlayer = opponents[1];
    }
  }
  
  // Get scores
  const team0Score = state?.scores?.team0 || 0;
  const team1Score = state?.scores?.team1 || 0;
  const myTeamScore = myTeam === 0 ? team0Score : team1Score;
  const opponentTeamScore = myTeam === 0 ? team1Score : team0Score;
  
  // Determine target score (101, 151, or 201)
  const targetScore = Math.max(team0Score, team1Score) > 101 
    ? (Math.max(team0Score, team1Score) > 151 ? 201 : 151)
    : 101;
  
  // Get game info
  const currentHand = state?.handNumber || 1;
  const deckCount = state?.deck?.length || 0;
  
  // Determine max hands based on game mode (2v2: 3 hands, duo: 6 hands)
  const maxHands = gameMode === '2v2' ? 3 : 6;
  
  // Get set/partija number (hardcoded for now - can be enhanced later)
  const currentSet = 1;
  
  // Get talon cards
  const talonCards = state?.talon || [];
  
  // Check if we're at the start (showing first 4 cards) or during play (showing all played cards)
  // Initial deal is when we have exactly 4 cards on talon AND it's the first hand AND deck is full
  const isInitialDeal = talonCards.length === 4 && state?.handNumber === 1 && state?.deck?.length === 40;

  return (
    <div className={`game-view mode-${gameMode}`}>
      {/* Surrender Confirmation Modal */}
      {showSurrenderConfirm && (
        <div className="game-modal-overlay">
          <div className="game-modal">
            <h3>Predaja Igre?</h3>
            <p>Da li ste sigurni da želite da predate igru? Protivnički tim automatski dobija 101 poen.</p>
            {gameMode === '2v2' && (
              <p className="surrender-modal-note">
                U 2v2 modu, oba člana tima moraju se složiti za predaju.
              </p>
            )}
            <div className="modal-buttons">
              <button
                onClick={() => setShowSurrenderConfirm(false)}
                className="modal-btn secondary"
              >
                Otkaži
              </button>
              <button
                onClick={() => {
                  setShowSurrenderConfirm(false);
                  onSurrender?.();
                }}
                className="modal-btn danger"
              >
                Predaj Se
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {state?.matchOver && (
        <div className="game-modal-overlay">
          <div className="game-modal">
            <h2>Igra Završena!</h2>
            <div className="game-over-result">
              {(() => {
                const winnerTeam = team0Score > team1Score ? 0 : 1;
                const didIWin = myTeam === winnerTeam;
                return didIWin ? '🎉 Pobedili Ste! 🎉' : '😔 Izgubili Ste';
              })()}
            </div>
            <div className="game-over-scores">
              <div className={`game-over-score ${team0Score > team1Score ? 'winner' : 'loser'}`}>
                <div className="game-over-score-label">TIM 0</div>
                <div className="game-over-score-value">{team0Score}</div>
              </div>
              <div className={`game-over-score ${team1Score > team0Score ? 'winner' : 'loser'}`}>
                <div className="game-over-score-label">TIM 1</div>
                <div className="game-over-score-value">{team1Score}</div>
              </div>
            </div>
            
            {rematchVotes && (
              <div className="rematch-notification">
                <p className="rematch-notification-text">
                  Čekanje glasova za revanš: {rematchVotes.currentVotes}/{rematchVotes.votesNeeded}
                </p>
              </div>
            )}
            
            <div className="modal-buttons">
              <button onClick={onExit} className="modal-btn secondary">
                Izađi
              </button>
              <button onClick={onRematch} className="modal-btn primary">
                Revanš
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="game-header">
        {/* Left: Game Info */}
        <div className="game-info">
          <div className="game-info-text">Partija: {currentSet}</div>
          <div className="game-info-text">Ruka: {currentHand}/{maxHands}</div>
        </div>

        {/* Center: Scoreboard */}
        <div className="scoreboard">
          <div className="scoreboard-team team-0">
            <div className="scoreboard-label">Tim 0</div>
            <div className="scoreboard-value">{team0Score}</div>
          </div>
          <div className="scoreboard-target">
            <div className="scoreboard-target-icon">🏆</div>
            <div className="scoreboard-target-value">{targetScore}</div>
          </div>
          <div className="scoreboard-team team-1">
            <div className="scoreboard-label">Tim 1</div>
            <div className="scoreboard-value">{team1Score}</div>
          </div>
        </div>

        {/* Right: Timer */}
        {timerExpiresAt ? (
          <div className={`game-timer-container ${timerSeconds && Number(timerSeconds) <= 3 ? 'warning' : 'normal'}`}>
            <div className="game-timer-circle">
              <Timer className="game-timer-icon" />
            </div>
            <div className="game-timer-text">{timerSeconds || '0'}</div>
          </div>
        ) : (
          <div className="game-timer-container hidden">
            <div className="game-timer-circle">
              <Timer className="game-timer-icon" />
            </div>
            <div className="game-timer-text">0</div>
          </div>
        )}
      </div>

      {/* Game Table */}
      <div className="game-table">
        {/* Top Player */}
        {topPlayer && (
          <div className="player-area position-top">
            <div>
              <div className={`player-avatar ${topPlayer.id === state?.currentTurnPlayerId ? 'active' : ''}`}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="player-name">{topPlayer.name}</div>
            </div>
            <div className="player-hand">
              {(topPlayer.hand || []).map((card: any, idx: number) => (
                <Card key={idx} id={isSpectator ? card : "back"} />
              ))}
            </div>
          </div>
        )}

        {/* Left Player (2v2 only) */}
        {leftPlayer && (
          <div className="player-area position-left">
            <div>
              <div className={`player-avatar ${leftPlayer.id === state?.currentTurnPlayerId ? 'active' : ''}`}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="player-name">{leftPlayer.name}</div>
            </div>
            <div className="player-hand">
              {(leftPlayer.hand || []).map((card: any, idx: number) => (
                <Card key={idx} id={isSpectator ? card : "back"} />
              ))}
            </div>
          </div>
        )}

        {/* Right Player (2v2 only) */}
        {rightPlayer && (
          <div className="player-area position-right">
            <div>
              <div className={`player-avatar ${rightPlayer.id === state?.currentTurnPlayerId ? 'active' : ''}`}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="player-name">{rightPlayer.name}</div>
            </div>
            <div className="player-hand">
              {(rightPlayer.hand || []).map((card: any, idx: number) => (
                <Card key={idx} id={isSpectator ? card : "back"} />
              ))}
            </div>
          </div>
        )}

        {/* Bottom Player (Me or Spectator view) */}
        <div className="player-area position-bottom">
          {isSpectator && bottomPlayer && (
            <div className="player-name spectator-bottom-name">
              {bottomPlayer.name}
            </div>
          )}
          <div className="player-hand">
            {isSpectator && bottomPlayer ? (
              // Spectator: show bottom player's cards (not interactive)
              <div className="spectator-hand-container">
                {(bottomPlayer.hand || []).map((card: any, idx: number) => (
                  <Card key={idx} id={card} />
                ))}
              </div>
            ) : (
              // Regular player: show interactive hand
              <Hand 
                cards={myHand} 
                onPlay={(id) => onPlay(id)} 
                disabled={myPlayerId !== state?.currentTurnPlayerId} 
              />
            )}
          </div>
        </div>

        {/* Deck and Face-Up Card - Hide on last hand when all cards are dealt */}
        {state?.faceUpCard && currentHand < maxHands && (
          <div className="deck-container">
            <div className="deck-last-card">
              <Card id={state.faceUpCard} />
            </div>
            <div className="deck-pile">
              <div className="deck-pile-card">
                <svg viewBox="0 0 169.075 244.64" width="100%" height="100%">
                  <use xlinkHref="/cards.svg#back" />
                </svg>
              </div>
              <div className="deck-pile-card">
                <svg viewBox="0 0 169.075 244.64" width="100%" height="100%">
                  <use xlinkHref="/cards.svg#back" />
                </svg>
              </div>
              <div className="deck-pile-card">
                <svg viewBox="0 0 169.075 244.64" width="100%" height="100%">
                  <use xlinkHref="/cards.svg#back" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Talon Area (Center) */}
        <div className="talon-area">
          {/* Zing Notification */}
          {zingInfo && (
            <div className="zing-flash">
              <div className="zing-flash-stars">✨</div>
              <div className="zing-flash-text">
                <div className="zing-flash-player">{zingInfo.playerName}</div>
                <div className="zing-flash-points">ZING +{zingInfo.points}</div>
              </div>
              <div className="zing-flash-stars">✨</div>
            </div>
          )}
          
          {isInitialDeal ? (
            // State A: Initial 4 cards visible horizontally
            <div className="talon-initial">
              {talonCards.slice(0, 4).map((cardId: string, idx: number) => (
                <Card key={idx} id={cardId} />
              ))}
            </div>
          ) : (
            // State B: Cards stacked during play - show all talon cards
            <div className="talon-stack">
              {talonCards.map((cardId: string, idx: number) => (
                <div key={idx} className="card-wrapper played">
                  <Card id={cardId} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Controls (Bottom Right) */}
      {!state?.matchOver && !isSpectator && onSurrender && (
        <div className="game-controls">
          {surrenderVotes && (
            <div className="surrender-notification">
              Partner želi predaju ({surrenderVotes.currentVotes}/{surrenderVotes.votesNeeded})
            </div>
          )}
          <button
            onClick={() => setShowSurrenderConfirm(true)}
            className="surrender-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h18M3 9h18M3 15h18M3 21h18" />
            </svg>
            {gameMode === '1v1' ? 'Napusti Igru' : 'Predaja'}
          </button>
        </div>
      )}
    </div>
  );
};

export default InGameView;
