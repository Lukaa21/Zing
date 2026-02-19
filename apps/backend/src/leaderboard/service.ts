import { prisma } from '../db/prisma';

// Helper to get period boundaries
function getPeriodBoundaries(period: 'WEEKLY' | 'MONTHLY' | 'YEARLY') {
  const now = new Date();
  const epoch = new Date(0); // Unix epoch as placeholder
  
  if (period === 'WEEKLY') {
    const dayOfWeek = now.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() + diff);
    weekStart.setHours(0, 0, 0, 0);
    return { weekStart, monthStart: epoch, yearStart: epoch };
  }
  
  if (period === 'MONTHLY') {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    return { weekStart: epoch, monthStart, yearStart: epoch };
  }
  
  if (period === 'YEARLY') {
    const yearStart = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    return { weekStart: epoch, monthStart: epoch, yearStart };
  }
  
  return { weekStart: epoch, monthStart: epoch, yearStart: epoch };
}

// Update leaderboard snapshots for a specific period and category
async function updateLeaderboardSnapshot(
  category: 'WINS' | 'ZINGS' | 'POINTS',
  period: 'WEEKLY' | 'MONTHLY' | 'YEARLY'
) {
  console.log(`[Leaderboard] Updating ${category} - ${period}`);
  
  const boundaries = getPeriodBoundaries(period);
  
  // For periodic leaderboards we must aggregate from match history using the
  // period boundaries. Previously this used cumulative userStats which caused
  // weekly/monthly snapshots to never change across period boundaries.
  let leaderboardData: Array<{ userId: string; username: string; value: number }> = [];

  // Determine start boundary for the period
  const startDate = boundaries.weekStart || boundaries.monthStart || boundaries.yearStart;

  if (!startDate || startDate.getTime() === 0) {
    // Fallback to all-time behavior (shouldn't normally happen for periodic calls)
    const allStats = await prisma.userStats.findMany({
      include: { user: { select: { username: true } } },
    });

    leaderboardData = allStats
      .map((stat: any) => {
        const value = category === 'WINS' ? stat.soloWins + stat.duoWins :
                      category === 'ZINGS' ? stat.zingsMade : stat.pointsTaken;
        return { userId: stat.userId, username: stat.user.username, value };
      })
      .filter(e => e.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 100);
  } else {
    // Aggregate matches from matchHistory starting at startDate
    const matches = await prisma.matchHistory.findMany({
      where: { createdAt: { gte: startDate } },
    });

    const totals: Record<string, { wins: number; points: number; zings: number }> = {};

    const recordPlayer = (userId: string | null, team: number, match: any) => {
      if (!userId) return;
      if (!totals[userId]) totals[userId] = { wins: 0, points: 0, zings: 0 };

      // Add team points and zings
      if (team === 0) {
        totals[userId].points += match.team0Score || 0;
        totals[userId].zings += match.team0Zings || 0;
        if (match.winnerTeam === 0) totals[userId].wins += 1;
      } else {
        totals[userId].points += match.team1Score || 0;
        totals[userId].zings += match.team1Zings || 0;
        if (match.winnerTeam === 1) totals[userId].wins += 1;
      }
    };

    for (const m of matches) {
      // Team 0 players
      recordPlayer(m.team0Player1Id, 0, m);
      recordPlayer(m.team0Player2Id, 0, m);
      // Team 1 players
      recordPlayer(m.team1Player1Id, 1, m);
      recordPlayer(m.team1Player2Id, 1, m);
    }

    const userIds = Object.keys(totals);

    // Fetch usernames for authenticated users (fallback to empty if missing)
    const users = userIds.length > 0
      ? await prisma.user.findMany({ where: { id: { in: userIds } }, select: { id: true, username: true } })
      : [];
    const usernameById: Record<string, string> = {};
    for (const u of users) usernameById[u.id] = u.username;

    leaderboardData = userIds.map(uid => ({
      userId: uid,
      username: usernameById[uid] || 'Unknown',
      value: category === 'WINS' ? totals[uid].wins : category === 'ZINGS' ? totals[uid].zings : totals[uid].points,
    }))
      .filter(e => e.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 100);
  }

  // Upsert snapshots
  for (let i = 0; i < leaderboardData.length; i++) {
    const entry = leaderboardData[i];
    
    // All three date fields are always present (epoch used as placeholder)
    const uniqueWhere = {
      userId: entry.userId,
      category,
      period,
      weekStart: boundaries.weekStart!,
      monthStart: boundaries.monthStart!,
      yearStart: boundaries.yearStart!,
    };

    await prisma.leaderboardSnapshot.upsert({
      where: {
        userId_category_period_weekStart_monthStart_yearStart: uniqueWhere,
      },
      create: {
        userId: entry.userId,
        username: entry.username,
        category,
        period,
        value: entry.value,
        rank: i + 1,
        weekStart: boundaries.weekStart,
        monthStart: boundaries.monthStart,
        yearStart: boundaries.yearStart,
      },
      update: {
        username: entry.username,
        value: entry.value,
        rank: i + 1,
      },
    });
  }

  console.log(`[Leaderboard] Updated ${leaderboardData.length} entries for ${category} - ${period}`);
}

// Update all leaderboards
export async function updateAllLeaderboards() {
  console.log('[Leaderboard] Starting full update...');
  
  const categories: Array<'WINS' | 'ZINGS' | 'POINTS'> = ['WINS', 'ZINGS', 'POINTS'];
  const periods: Array<'WEEKLY' | 'MONTHLY' | 'YEARLY'> = ['WEEKLY', 'MONTHLY', 'YEARLY'];

  for (const category of categories) {
    for (const period of periods) {
      try {
        await updateLeaderboardSnapshot(category, period);
      } catch (err) {
        console.error(`[Leaderboard] Failed to update ${category} - ${period}:`, err);
      }
    }
  }

  console.log('[Leaderboard] Full update completed');
}

// Track next update time
let nextUpdateAt = Date.now() + 10000;

export function getNextUpdateAt() {
  return nextUpdateAt;
}

// Schedule leaderboard updates
export function scheduleLeaderboardUpdates() {
  // Update every hour
  const HOUR = 60 * 60 * 1000;
  const STARTUP_DELAY = 10000;
  
  const startTime = Date.now();
  nextUpdateAt = startTime + STARTUP_DELAY;

  // Initial update after 10 seconds
  setTimeout(() => {
    updateAllLeaderboards().catch(console.error);
    // The interval below was started at startTime, so next tick is startTime + HOUR
    nextUpdateAt = startTime + HOUR;
  }, STARTUP_DELAY);

  // Then update every hour
  setInterval(() => {
    updateAllLeaderboards().catch(console.error);
    nextUpdateAt = Date.now() + HOUR;
  }, HOUR);

  console.log('[Leaderboard] Scheduled hourly updates');
}
