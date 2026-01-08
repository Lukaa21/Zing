import React, { useState, useEffect } from 'react';

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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        maxWidth: '800px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>🏆 Leaderboard</h2>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>

        {/* Category Selection */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', marginRight: '8px' }}>Category:</label>
          {(['WINS', 'ZINGS', 'POINTS'] as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setShowPrevious(false); }}
              style={{
                padding: '6px 12px',
                margin: '0 4px',
                backgroundColor: category === cat ? '#2196F3' : '#ddd',
                color: category === cat ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Period Selection */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', marginRight: '8px' }}>Period:</label>
          {(['WEEKLY', 'MONTHLY', 'YEARLY', 'ALL_TIME'] as Period[]).map(per => (
            <button
              key={per}
              onClick={() => { setPeriod(per); setShowPrevious(false); }}
              style={{
                padding: '6px 12px',
                margin: '0 4px',
                backgroundColor: period === per ? '#4CAF50' : '#ddd',
                color: period === per ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {periodLabels[per]}
            </button>
          ))}
        </div>

        {/* Previous Period Toggle */}
        {period !== 'ALL_TIME' && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={showPrevious}
                onChange={(e) => setShowPrevious(e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              Show Previous {period === 'WEEKLY' ? 'Week' : period === 'MONTHLY' ? 'Month' : 'Year'}
            </label>
          </div>
        )}

        {/* Leaderboard Table */}
        {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}
        {error && <div style={{ color: 'red', padding: '20px' }}>Error: {error}</div>}

        {!loading && !error && (
          <>
            <h3>{categoryLabels[category]} - {showPrevious ? `Previous ${periodLabels[period]}` : periodLabels[period]}</h3>
            
            {leaderboard.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                No data available for this period yet.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Rank</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Player</th>
                    <th style={{ padding: '12px', textAlign: 'right' }}>
                      {category === 'WINS' ? 'Wins' : category === 'ZINGS' ? 'Zings' : 'Points'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry) => {
                    const isCurrentUser = entry.userId === currentUserId;
                    return (
                      <tr
                        key={entry.userId}
                        style={{
                          backgroundColor: isCurrentUser ? '#e3f2fd' : entry.rank <= 3 ? '#fff9c4' : 'white',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        <td style={{ padding: '12px', fontWeight: entry.rank <= 3 ? 'bold' : 'normal' }}>
                          {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : `#${entry.rank}`}
                        </td>
                        <td style={{ padding: '12px', fontWeight: isCurrentUser ? 'bold' : 'normal' }}>
                          {entry.username} {isCurrentUser && '(You)'}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right', fontWeight: entry.rank <= 3 ? 'bold' : 'normal' }}>
                          {formatValue(entry.value)}
                        </td>
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
  );
}
