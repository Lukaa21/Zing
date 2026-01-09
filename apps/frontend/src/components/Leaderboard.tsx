import React, { useState, useEffect } from 'react';
import '../styles/Leaderboard.css';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  value: number;
}

interface LeaderboardProps {
  token: string;
  currentUserId: string;
  onClose: () => void;
}

type Category = 'WINS' | 'ZINGS' | 'POINTS';
type Period = 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'ALL_TIME';

const categoryLabels: Record<Category, string> = {
  WINS: 'Total Wins',
  ZINGS: 'Zings Scored',
  POINTS: 'Points Taken',
};

const periodLabels: Record<Period, string> = {
  WEEKLY: 'This Week',
  MONTHLY: 'This Month',
  YEARLY: 'This Year',
  ALL_TIME: 'All Time',
};

export default function Leaderboard({ token, currentUserId, onClose }: LeaderboardProps) {
  const [category, setCategory] = useState<Category>('WINS');
  const [period, setPeriod] = useState<Period>('ALL_TIME');
  const [showPrevious, setShowPrevious] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [category, period, showPrevious]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = showPrevious && period !== 'ALL_TIME'
        ? `http://localhost:4000/api/leaderboard/${category}/${period}/previous`
        : `http://localhost:4000/api/leaderboard/${category}/${period}`;

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch leaderboard');
      
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  const formatValue = (value: number) => {
    if (category === 'POINTS') {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div className="leaderboard-overlay" onClick={onClose}>
      <div className="leaderboard-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="leaderboard-header">
          <div className="leaderboard-title-section">
            <span className="leaderboard-icon">🏆</span>
            <h2 className="leaderboard-title">Leaderboard</h2>
          </div>
          <button className="leaderboard-close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        {/* Content */}
        <div className="leaderboard-content">
          {/* Filters */}
          <div className="leaderboard-filters">
            {/* Category Selection */}
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <div className="filter-buttons">
                {(['WINS', 'ZINGS', 'POINTS'] as Category[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat); setShowPrevious(false); }}
                    className={`filter-btn ${category === cat ? 'active' : ''}`}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            </div>

            {/* Period Selection */}
            <div className="filter-group">
              <label className="filter-label">Time Period</label>
              <div className="filter-buttons">
                {(['WEEKLY', 'MONTHLY', 'YEARLY', 'ALL_TIME'] as Period[]).map(per => (
                  <button
                    key={per}
                    onClick={() => { setPeriod(per); setShowPrevious(false); }}
                    className={`filter-btn ${period === per ? 'active' : ''}`}
                  >
                    {periodLabels[per]}
                  </button>
                ))}
              </div>
            </div>

            {/* Previous Period Toggle */}
            {period !== 'ALL_TIME' && (
              <label className="previous-toggle">
                <input
                  type="checkbox"
                  checked={showPrevious}
                  onChange={(e) => setShowPrevious(e.target.checked)}
                />
                <span className="previous-toggle-label">
                  Show Previous {period === 'WEEKLY' ? 'Week' : period === 'MONTHLY' ? 'Month' : 'Year'}
                </span>
              </label>
            )}
          </div>

          {/* Current Selection Display */}
          <div className="leaderboard-current">
            <h3 className="leaderboard-current-title">
              {categoryLabels[category]} - {showPrevious ? `Previous ${periodLabels[period]}` : periodLabels[period]}
            </h3>
          </div>

          {/* Loading State */}
          {loading && <div className="leaderboard-loading">Loading leaderboard...</div>}

          {/* Error State */}
          {error && <div className="leaderboard-error">⚠️ Error: {error}</div>}

          {/* Leaderboard Table */}
          {!loading && !error && (
            <>
              {leaderboard.length === 0 ? (
                <div className="leaderboard-empty">
                  📊 No data available for this period yet.
                </div>
              ) : (
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Player</th>
                      <th>{category === 'WINS' ? 'Wins' : category === 'ZINGS' ? 'Zings' : 'Points'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry) => {
                      const isCurrentUser = entry.userId === currentUserId;
                      const isTop3 = entry.rank <= 3;
                      return (
                        <tr
                          key={entry.userId}
                          className={`${isTop3 ? 'top-3' : ''} ${isCurrentUser ? 'current-user' : ''}`}
                        >
                          <td>
                            {isTop3 ? (
                              <span className="rank-medal">
                                {['🥇', '🥈', '🥉'][entry.rank - 1]}
                              </span>
                            ) : (
                              `#${entry.rank}`
                            )}
                          </td>
                          <td>
                            <span className="player-name">{entry.username}</span>
                            {isCurrentUser && <span className="player-you">(You)</span>}
                          </td>
                          <td>{formatValue(entry.value)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
