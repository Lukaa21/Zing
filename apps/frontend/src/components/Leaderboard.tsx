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
  WINS: 'Ukupne Pobjede',
  ZINGS: 'Napravljeni Zingovi',
  POINTS: 'Osvojeni Poeni',
};

const periodLabels: Record<Period, string> = {
  WEEKLY: 'Ova Sedmica',
  MONTHLY: 'Ovaj Mjesec',
  YEARLY: 'Ova Godina',
  ALL_TIME: 'Svih Vremena',
};

export default function Leaderboard({ token, currentUserId, onClose }: LeaderboardProps) {
  const [category, setCategory] = useState<Category>('WINS');
  const [period, setPeriod] = useState<Period>('ALL_TIME');
  const [showPrevious, setShowPrevious] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextUpdate, setNextUpdate] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    fetchLeaderboard();
  }, [category, period, showPrevious]);

  useEffect(() => {
    if (!nextUpdate || period === 'ALL_TIME' || showPrevious) {
      setTimeLeft('');
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = nextUpdate - now;
      if (diff <= 0) {
        setTimeLeft('Uskoro...');
      } else {
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${mins}m ${secs}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [nextUpdate, period, showPrevious]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const endpoint = showPrevious && period !== 'ALL_TIME'
        ? `${BACKEND_URL}/api/leaderboard/${category}/${period}/previous`
        : `${BACKEND_URL}/api/leaderboard/${category}/${period}`;

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch leaderboard');
      
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
      setNextUpdate(data.nextUpdate || null);
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
            <h2 className="leaderboard-title">Rang Lista</h2>
          </div>
          <button className="leaderboard-close-btn" onClick={onClose}>×</button>
        </div>

        {/* Content */}
        <div className="leaderboard-content">
          {timeLeft && (
            <div style={{color: '#818cf8', marginBottom: '16px', textAlign: 'center', background: 'rgba(99, 102, 241, 0.1)', padding: '8px', borderRadius: '6px' }}>
              Sljedeći presjek za: <strong>{timeLeft}</strong>
            </div>
          )}
          {/* Filters */}
          <div className="leaderboard-filters">
            {/* Category Selection */}
            <div className="filter-group">
              <label className="filter-label">Kategorija</label>
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
              <label className="filter-label">Vremenski Period</label>
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
                  Prikaži Prethodni {period === 'WEEKLY' ? 'Sedmicu' : period === 'MONTHLY' ? 'Mjesec' : 'Godinu'}
                </span>
              </label>
            )}
          </div>

          {/* Current Selection Display */}
          <div className="leaderboard-current">
            <h3 className="leaderboard-current-title">
              {categoryLabels[category]} - {showPrevious ? `Prethodni ${periodLabels[period]}` : periodLabels[period]}
            </h3>
          </div>

          {/* Loading State */}
          {loading && <div className="leaderboard-loading">Učitavam rang listu...</div>}

          {/* Error State */}
          {error && <div className="leaderboard-error">⚠️ Greška: {error}</div>}

          {/* Leaderboard Table */}
          {!loading && !error && (
            <>
              {leaderboard.length === 0 ? (
                <div className="leaderboard-empty">
                  📊 Nema dostupnih podataka za ovaj period.
                </div>
              ) : (
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>Rang</th>
                      <th>Igrač</th>
                      <th>{category === 'WINS' ? 'Pobjede' : category === 'ZINGS' ? 'Zingovi' : 'Poeni'}</th>
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
                            {isCurrentUser && <span className="player-you">(Ti)</span>}
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
