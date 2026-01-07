import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all achievement definitions
router.get('/definitions', async (req, res) => {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: [
        { type: 'asc' },
        { tier: 'asc' },
      ],
    });
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

// Get user's unlocked achievements
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: {
        achievement: true,
      },
      orderBy: {
        unlockedAt: 'desc',
      },
    });

    res.json(userAchievements);
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    res.status(500).json({ error: 'Failed to fetch user achievements' });
  }
});

// Get user statistics
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const stats = await prisma.userStats.findUnique({
      where: { userId },
    });

    if (!stats) {
      // Return zeros for users without any stats yet
      res.json({
        gamesPlayed: 0,
        soloWins: 0,
        duoWins: 0,
        pointsTaken: 0,
        zingsMade: 0,
        gamesHosted: 0,
        friendsAdded: 0,
      });
      return;
    }

    res.json(stats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

// Get achievement progress for a user
router.get('/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get user stats
    const stats = await prisma.userStats.findUnique({
      where: { userId },
    });

    const statValues = stats || {
      gamesPlayed: 0,
      soloWins: 0,
      duoWins: 0,
      pointsTaken: 0,
      zingsMade: 0,
      gamesHosted: 0,
      friendsAdded: 0,
    };

    // Get all achievements
    const allAchievements = await prisma.achievement.findMany({
      orderBy: [
        { type: 'asc' },
        { tier: 'asc' },
      ],
    });

    // Get unlocked achievements
    const unlockedAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true },
    });
    const unlockedIds = new Set(unlockedAchievements.map(a => a.achievementId));

    // Build progress for each achievement type
    const statMap: Record<string, number> = {
      GAMES_PLAYED: statValues.gamesPlayed,
      SOLO_WINS: statValues.soloWins,
      DUO_WINS: statValues.duoWins,
      POINTS_TAKEN: statValues.pointsTaken,
      ZINGS_MADE: statValues.zingsMade,
      GAMES_HOSTED: statValues.gamesHosted,
      FRIENDS_ADDED: statValues.friendsAdded,
    };

    const progress = allAchievements.map(achievement => ({
      ...achievement,
      unlocked: unlockedIds.has(achievement.id),
      currentProgress: statMap[achievement.type],
      percentage: Math.min(100, Math.floor((statMap[achievement.type] / achievement.threshold) * 100)),
    }));

    res.json(progress);
  } catch (error) {
    console.error('Error fetching achievement progress:', error);
    res.status(500).json({ error: 'Failed to fetch achievement progress' });
  }
});

export default router;
