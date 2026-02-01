import express from 'express';
import { PrismaClient } from '@prisma/client';
import { getNextUpdateAt } from './service';

const router = express.Router();
const prisma = new PrismaClient();

// Helper to get current period boundaries
function getPeriodBoundaries(period: 'WEEKLY' | 'MONTHLY' | 'YEARLY') {
  const now = new Date();
  
  if (period === 'WEEKLY') {
    // Start of current week (Monday 00:00)
    const dayOfWeek = now.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust for Monday start
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() + diff);
    weekStart.setHours(0, 0, 0, 0);
    return { weekStart };
  }
  
  if (period === 'MONTHLY') {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    return { monthStart };
  }
  
  if (period === 'YEARLY') {
    const yearStart = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    return { yearStart };
  }
  
  return {};
}

// Helper to get previous period boundaries
function getPreviousPeriodBoundaries(period: 'WEEKLY' | 'MONTHLY' | 'YEARLY') {
  const now = new Date();
  
  if (period === 'WEEKLY') {
    const dayOfWeek = now.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() + diff - 7); // Previous week
    weekStart.setHours(0, 0, 0, 0);
    return { weekStart };
  }
  
  if (period === 'MONTHLY') {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
    return { monthStart };
  }
  
  if (period === 'YEARLY') {
    const yearStart = new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0, 0);
    return { yearStart };
  }
  
  return {};
}

// GET /api/leaderboard/:category/:period - Get current leaderboard
router.get('/:category/:period', async (req, res) => {
  try {
    const { category, period } = req.params;
    const limit = Math.min(parseInt(req.query.limit as string) || 100, 100);
    
    if (!['WINS', 'ZINGS', 'POINTS'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    if (!['WEEKLY', 'MONTHLY', 'YEARLY', 'ALL_TIME'].includes(period)) {
      return res.status(400).json({ error: 'Invalid period' });
    }

    let leaderboard;

    if (period === 'ALL_TIME') {
      // For all-time, query UserStats directly
      const field = category === 'WINS' ? ['soloWins', 'duoWins'] : 
                    category === 'ZINGS' ? 'zingsMade' : 'pointsTaken';
      
      const stats = await prisma.userStats.findMany({
        take: limit,
        orderBy: category === 'WINS' 
          ? [{ soloWins: 'desc' }, { duoWins: 'desc' }]
          : { [field as string]: 'desc' },
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      });

      leaderboard = stats.map((stat, index) => ({
        rank: index + 1,
        userId: stat.userId,
        username: stat.user.username,
        value: category === 'WINS' ? stat.soloWins + stat.duoWins :
               category === 'ZINGS' ? stat.zingsMade : stat.pointsTaken,
      }));
    } else {
      // For periodic leaderboards, query snapshots
      const boundaries = getPeriodBoundaries(period as any);
      
      const whereClause: any = {
        category,
        period,
      };
      
      if (boundaries.weekStart) whereClause.weekStart = boundaries.weekStart;
      if (boundaries.monthStart) whereClause.monthStart = boundaries.monthStart;
      if (boundaries.yearStart) whereClause.yearStart = boundaries.yearStart;

      const snapshots = await prisma.leaderboardSnapshot.findMany({
        where: whereClause,
        take: limit,
        orderBy: { value: 'desc' },
        select: {
          userId: true,
          username: true,
          value: true,
          rank: true,
        },
      });

      leaderboard = snapshots.map((snap, index) => ({
        rank: index + 1,
        userId: snap.userId,
        username: snap.username,
        value: snap.value,
      }));
    }

    res.json({ 
      category, 
      period, 
      leaderboard,
      nextUpdate: period !== 'ALL_TIME' ? getNextUpdateAt() : null
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/:category/:period/previous - Get previous period leaderboard
router.get('/:category/:period/previous', async (req, res) => {
  try {
    const { category, period } = req.params;
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 50);
    
    if (!['WINS', 'ZINGS', 'POINTS'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    if (!['WEEKLY', 'MONTHLY', 'YEARLY'].includes(period)) {
      return res.status(400).json({ error: 'Invalid period (ALL_TIME has no previous)' });
    }

    const boundaries = getPreviousPeriodBoundaries(period as any);
    
    const whereClause: any = {
      category,
      period,
    };
    
    if (boundaries.weekStart) whereClause.weekStart = boundaries.weekStart;
    if (boundaries.monthStart) whereClause.monthStart = boundaries.monthStart;
    if (boundaries.yearStart) whereClause.yearStart = boundaries.yearStart;

    const snapshots = await prisma.leaderboardSnapshot.findMany({
      where: whereClause,
      take: limit,
      orderBy: { value: 'desc' },
      select: {
        userId: true,
        username: true,
        value: true,
        rank: true,
      },
    });

      const leaderboard = snapshots.map((snap: any, index: number) => ({
      rank: index + 1,
      userId: snap.userId,
      username: snap.username,
      value: snap.value,
    }));

    res.json({ category, period: `${period}_PREVIOUS`, leaderboard });
  } catch (error) {
    console.error('Error fetching previous leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch previous leaderboard' });
  }
});

// GET /api/leaderboard/user/:userId - Get user's position in all leaderboards
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user stats for all-time
    const stats = await prisma.userStats.findUnique({
      where: { userId },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    if (!stats) {
      return res.json({ positions: [] });
    }

    const positions: any[] = [];

    // Calculate all-time positions
    for (const category of ['WINS', 'ZINGS', 'POINTS']) {
      const value = category === 'WINS' ? stats.soloWins + stats.duoWins :
                    category === 'ZINGS' ? stats.zingsMade : stats.pointsTaken;
      
      const field = category === 'WINS' ? ['soloWins', 'duoWins'] :
                    category === 'ZINGS' ? 'zingsMade' : 'pointsTaken';

      let rank;
      if (category === 'WINS') {
        rank = await prisma.userStats.count({
          where: {
            OR: [
              { soloWins: { gt: stats.soloWins } },
              { soloWins: stats.soloWins, duoWins: { gt: stats.duoWins } },
            ],
          },
        });
      } else {
        rank = await prisma.userStats.count({
          where: {
            [field as string]: { gt: value },
          },
        });
      }

      positions.push({
        category,
        period: 'ALL_TIME',
        rank: rank + 1,
        value,
      });
    }

    // Get periodic positions from snapshots
    const currentPeriods = ['WEEKLY', 'MONTHLY', 'YEARLY'];
    for (const period of currentPeriods) {
      const boundaries = getPeriodBoundaries(period as any);
      
      for (const category of ['WINS', 'ZINGS', 'POINTS']) {
        const whereClause: any = {
          category,
          period,
          userId,
        };
        
        if (boundaries.weekStart) whereClause.weekStart = boundaries.weekStart;
        if (boundaries.monthStart) whereClause.monthStart = boundaries.monthStart;
        if (boundaries.yearStart) whereClause.yearStart = boundaries.yearStart;

        const snapshot = await prisma.leaderboardSnapshot.findFirst({
          where: whereClause,
        });

        if (snapshot) {
          positions.push({
            category,
            period,
            rank: snapshot.rank || 0,
            value: snapshot.value,
          });
        }
      }
    }

    res.json({ userId, username: stats.user.username, positions });
  } catch (error) {
    console.error('Error fetching user leaderboard positions:', error);
    res.status(500).json({ error: 'Failed to fetch user positions' });
  }
});

export default router;
