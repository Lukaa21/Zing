import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../utils/auth';
import './MatchHistory.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

type Match = {
  id: string;
  mode: string;
  won: boolean;
  userTeam: number;
  winnerTeam: number;
  team0Score: number;
  team1Score: number;
  team0: string[];
  team1: string[];
  duration: number | null;
  createdAt: string;
};

type MatchHistoryProps = {
  onClose: () => void;
};

const MatchHistory: React.FC<MatchHistoryProps> = ({ onClose }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = getAuthToken();
        console.log('Fetching match history with token:', token ? 'present' : 'missing');
        
        if (!token) {
          setError('You must be logged in to view match history');
          setLoading(false);
          return;
        }

        console.log('Fetching from URL:', `${BACKEND_URL}/api/matches/history`);
        
        const response = await fetch(`${BACKEND_URL}/api/matches/history`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Match history response status:', response.status);
        console.log('Match history response headers:', response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Match history error response:', errorText);
          throw new Error('Failed to fetch match history');
        }

        const data = await response.json();
        setMatches(data.matches || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load match history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDuration = (seconds: number | null): string => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="match-history-overlay">
      <div className="match-history-modal">
        <div className="match-history-header">
          <h2>Match History</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="match-history-content">
          {loading && <p className="loading-text">Loading...</p>}
          {error && <p className="error-text">{error}</p>}
          
          {!loading && !error && matches.length === 0 && (
            <p className="empty-text">No matches played yet</p>
          )}

          {!loading && !error && matches.length > 0 && (
            <div className="matches-list">
              {matches.map((match) => (
                <div key={match.id} className={`match-card ${match.won ? 'won' : 'lost'}`}>
                  <div className="match-header-row">
                    <span className={`result-badge ${match.won ? 'victory' : 'defeat'}`}>
                      {match.won ? 'VICTORY' : 'DEFEAT'}
                    </span>
                    <span className="mode-badge">{match.mode.toUpperCase()}</span>
                    <span className="time-text">{formatDate(match.createdAt)}</span>
                  </div>

                  <div className="match-details">
                    <div className="teams-section">
                      <div className={`team-box ${match.userTeam === 0 ? 'user-team' : ''}`}>
                        <div className="team-label">Team 0</div>
                        {match.team0.map((player, idx) => (
                          <div key={idx} className="player-name">{player}</div>
                        ))}
                      </div>

                      <div className="score-divider">
                        <span className="score-text">
                          {match.team0Score} - {match.team1Score}
                        </span>
                      </div>

                      <div className={`team-box ${match.userTeam === 1 ? 'user-team' : ''}`}>
                        <div className="team-label">Team 1</div>
                        {match.team1.map((player, idx) => (
                          <div key={idx} className="player-name">{player}</div>
                        ))}
                      </div>
                    </div>

                    {match.duration && (
                      <div className="duration-text">Duration: {formatDuration(match.duration)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchHistory;
