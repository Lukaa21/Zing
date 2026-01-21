import React, { useState, useEffect } from 'react';
import '../styles/Achievements.css';

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

// Component for displaying a single achievement type with all tiers
const AchievementCard: React.FC<{ 
  type: string; 
  achievements: Achievement[]; 
  typeLabel: string;
}> = ({ type, achievements, typeLabel }) => {
  // Sort achievements by tier
  const sortedAchievements = [...achievements].sort((a, b) => a.tier - b.tier);
  
  // Find current active tier (first one that's not unlocked)
  const activeTierIndex = sortedAchievements.findIndex(a => !a.unlocked);
  const isAllCompleted = activeTierIndex === -1;
  
  // Get the active achievement (current goal)
  const activeAchievement = isAllCompleted 
    ? sortedAchievements[sortedAchievements.length - 1] 
    : sortedAchievements[activeTierIndex];
  
  // Calculate progress
  const currentProgress = activeAchievement?.currentProgress || 0;
  const targetThreshold = activeAchievement?.threshold || 0;
  const progressPercentage = isAllCompleted 
    ? 100 
    : (currentProgress / targetThreshold) * 100;
  
  // Calculate unlocked stars count
  const unlockedStars = sortedAchievements.filter(a => a.unlocked).length;

  return (
    <div className={`achievement-card ${isAllCompleted ? 'completed' : ''}`}>
      <div className="achievement-header">
        <div className="achievement-title-group">
          <h3 className="achievement-category">{typeLabel}</h3>
          <p className="achievement-description">
            {activeAchievement?.description || 'Završi sve nivoe!'}
          </p>
        </div>
        <div className="achievement-stars">
          {[0, 1, 2].map(index => (
            <span 
              key={index} 
              className={`star ${index < unlockedStars ? 'unlocked' : 'locked'}`}
            >
              ⭐
            </span>
          ))}
        </div>
      </div>
      
      <div className="achievement-progress-section">
        <div className="progress-info">
          <span className="progress-text">
            Progres: <span className="progress-fraction">{currentProgress} / {targetThreshold}</span>
          </span>
        </div>
        <div className="progress-bar-container">
          <div 
            className={`progress-bar-fill ${isAllCompleted ? 'completed' : ''}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
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
        
        const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
        
        // Fetch achievement progress (includes all achievements with progress info)
        const progressRes = await fetch(`${BACKEND_URL}/api/achievements/progress/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!progressRes.ok) throw new Error('Failed to fetch achievement progress');
        const progressData = await progressRes.json();
        setAchievements(progressData);

        // Fetch user stats
        const statsRes = await fetch(`${BACKEND_URL}/api/achievements/stats/${userId}`, {
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
    GAMES_PLAYED: 'Odigrane Partije',
    SOLO_WINS: 'Solo Pobjede',
    DUO_WINS: 'Duo Pobjede',
    POINTS_TAKEN: 'Osvojeni Poeni',
    ZINGS_MADE: 'Napravljeni Zingovi',
    GAMES_HOSTED: 'Hostovane Igre',
    FRIENDS_ADDED: 'Dodati Prijatelji',
  };

  return (
    <div className="achievements-overlay" onClick={onClose}>
      <div className="achievements-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="achievements-header">
          <div className="achievements-title-section">
            <span className="achievements-icon">🏆</span>
            <h2 className="achievements-title">Dostignuća</h2>
          </div>
          <button className="achievements-close-btn" onClick={onClose}>
            Zatvori
          </button>
        </div>

        {/* Content */}
        <div className="achievements-content">
          {loading && <div className="achievements-loading">Učitavam dostignuća...</div>}
          {error && <div className="achievements-error">⚠️ Greška: {error}</div>}

          {!loading && !error && stats && (
            <>
              {/* Stats Summary */}
              <div className="stats-summary">
                <h3 className="stats-summary-title">Tvoje Statistike</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Odigrane Partije:</span>
                    <span className="stat-value">{stats.gamesPlayed}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Solo Pobjede:</span>
                    <span className="stat-value">{stats.soloWins}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Duo Pobjede:</span>
                    <span className="stat-value">{stats.duoWins}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Osvojeni Poeni:</span>
                    <span className="stat-value">{stats.pointsTaken.toLocaleString()}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Napravljeni Zingovi:</span>
                    <span className="stat-value">{stats.zingsMade}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Hostovane Igre:</span>
                    <span className="stat-value">{stats.gamesHosted}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Dodati Prijatelji:</span>
                    <span className="stat-value">{stats.friendsAdded}</span>
                  </div>
                </div>
              </div>

              {/* Achievement Cards */}
              {Object.entries(groupedAchievements).map(([type, typeAchievements]) => (
                <AchievementCard
                  key={type}
                  type={type}
                  achievements={typeAchievements}
                  typeLabel={typeLabels[type] || type}
                />
              ))}

              {achievements.length === 0 && (
                <div className="achievements-empty">
                  🎯 Dostignuća još nisu dostupna. Počni da igraš da ih otključaš!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
