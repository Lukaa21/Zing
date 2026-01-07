import React, { useState, useEffect } from 'react';

interface Achievement {
  id: string;
  type: string;
  tier: number;
  threshold: number;
  name: string;
  description: string;
  unlocked?: boolean;
  currentProgress?: number;
  percentage?: number;
}

interface UserStats {
  gamesPlayed: number;
  soloWins: number;
  duoWins: number;
  pointsTaken: number;
  zingsMade: number;
  gamesHosted: number;
  friendsAdded: number;
}

interface AchievementsProps {
  userId: string;
  token: string;
  onClose: () => void;
}

const AchievementTierIcon: React.FC<{ tier: number }> = ({ tier }) => {
  const stars = '⭐'.repeat(tier);
  return <span style={{ fontSize: '1.2em' }}>{stars}</span>;
};

const AchievementProgress: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  const percentage = achievement.percentage || 0;
  const unlocked = achievement.unlocked || false;

  return (
    <div style={{
      padding: '12px',
      margin: '8px 0',
      border: `2px solid ${unlocked ? '#4CAF50' : '#ddd'}`,
      borderRadius: '8px',
      backgroundColor: unlocked ? '#e8f5e9' : '#f5f5f5',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AchievementTierIcon tier={achievement.tier} />
          <strong>{achievement.name}</strong>
        </div>
        {unlocked && <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✓ Unlocked</span>}
      </div>
      
      <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '8px' }}>
        {achievement.description}
      </div>
      
      <div style={{ fontSize: '0.85em', color: '#888', marginBottom: '4px' }}>
        Progress: {achievement.currentProgress || 0} / {achievement.threshold}
      </div>
      
      <div style={{ 
        width: '100%', 
        height: '8px', 
        backgroundColor: '#e0e0e0', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: unlocked ? '#4CAF50' : '#2196F3',
          transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  );
};

export default function Achievements({ userId, token, onClose }: AchievementsProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch achievement progress (includes all achievements with progress info)
        const progressRes = await fetch(`http://localhost:4000/api/achievements/progress/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!progressRes.ok) throw new Error('Failed to fetch achievement progress');
        const progressData = await progressRes.json();
        setAchievements(progressData);

        // Fetch user stats
        const statsRes = await fetch(`http://localhost:4000/api/achievements/stats/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!statsRes.ok) throw new Error('Failed to fetch stats');
        const statsData = await statsRes.json();
        setStats(statsData);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  // Group achievements by type
  const groupedAchievements: Record<string, Achievement[]> = {};
  achievements.forEach(achievement => {
    if (!groupedAchievements[achievement.type]) {
      groupedAchievements[achievement.type] = [];
    }
    groupedAchievements[achievement.type].push(achievement);
  });

  const typeLabels: Record<string, string> = {
    GAMES_PLAYED: 'Games Played',
    SOLO_WINS: 'Solo Wins',
    DUO_WINS: 'Duo Wins',
    POINTS_TAKEN: 'Points Taken',
    ZINGS_MADE: 'Zings Scored',
    GAMES_HOSTED: 'Games Hosted',
    FRIENDS_ADDED: 'Friends Added',
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0 }}>🏆 Achievements</h2>
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

        {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading achievements...</div>}
        {error && <div style={{ color: 'red', padding: '20px' }}>Error: {error}</div>}

        {!loading && !error && stats && (
          <>
            {/* Stats Summary */}
            <div style={{
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              marginBottom: '24px',
            }}>
              <h3 style={{ marginTop: 0 }}>Your Statistics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div><strong>Games Played:</strong> {stats.gamesPlayed}</div>
                <div><strong>Solo Wins:</strong> {stats.soloWins}</div>
                <div><strong>Duo Wins:</strong> {stats.duoWins}</div>
                <div><strong>Points Taken:</strong> {stats.pointsTaken.toLocaleString()}</div>
                <div><strong>Zings Made:</strong> {stats.zingsMade}</div>
                <div><strong>Games Hosted:</strong> {stats.gamesHosted}</div>
                <div><strong>Friends Added:</strong> {stats.friendsAdded}</div>
              </div>
            </div>

            {/* Achievement Categories */}
            {Object.entries(groupedAchievements).map(([type, typeAchievements]) => (
              <div key={type} style={{ marginBottom: '24px' }}>
                <h3>{typeLabels[type] || type}</h3>
                {typeAchievements.map(achievement => (
                  <AchievementProgress key={achievement.id} achievement={achievement} />
                ))}
              </div>
            ))}

            {achievements.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                No achievements available yet. Start playing to unlock achievements!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
