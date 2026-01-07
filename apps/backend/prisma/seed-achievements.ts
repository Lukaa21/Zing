import { PrismaClient, AchievementType } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAchievements() {
  const achievements = [
    // GAMES_PLAYED - 10, 100, 300 games
    {
      type: AchievementType.GAMES_PLAYED,
      tier: 1,
      threshold: 10,
      name: 'Beginner Player',
      description: 'Play 10 games',
    },
    {
      type: AchievementType.GAMES_PLAYED,
      tier: 2,
      threshold: 100,
      name: 'Experienced Player',
      description: 'Play 100 games',
    },
    {
      type: AchievementType.GAMES_PLAYED,
      tier: 3,
      threshold: 300,
      name: 'Veteran Player',
      description: 'Play 300 games',
    },

    // SOLO_WINS - 5, 50, 150 wins
    {
      type: AchievementType.SOLO_WINS,
      tier: 1,
      threshold: 5,
      name: 'Solo Champion',
      description: 'Win 5 solo games',
    },
    {
      type: AchievementType.SOLO_WINS,
      tier: 2,
      threshold: 50,
      name: 'Solo Master',
      description: 'Win 50 solo games',
    },
    {
      type: AchievementType.SOLO_WINS,
      tier: 3,
      threshold: 150,
      name: 'Solo Legend',
      description: 'Win 150 solo games',
    },

    // DUO_WINS - 10, 100, 250 wins
    {
      type: AchievementType.DUO_WINS,
      tier: 1,
      threshold: 10,
      name: 'Duo Champion',
      description: 'Win 10 duo games',
    },
    {
      type: AchievementType.DUO_WINS,
      tier: 2,
      threshold: 100,
      name: 'Duo Master',
      description: 'Win 100 duo games',
    },
    {
      type: AchievementType.DUO_WINS,
      tier: 3,
      threshold: 250,
      name: 'Duo Legend',
      description: 'Win 250 duo games',
    },

    // POINTS_TAKEN - 1000, 10000, 50000 points
    {
      type: AchievementType.POINTS_TAKEN,
      tier: 1,
      threshold: 1000,
      name: 'Point Collector',
      description: 'Take 1,000 points',
    },
    {
      type: AchievementType.POINTS_TAKEN,
      tier: 2,
      threshold: 10000,
      name: 'Point Hunter',
      description: 'Take 10,000 points',
    },
    {
      type: AchievementType.POINTS_TAKEN,
      tier: 3,
      threshold: 50000,
      name: 'Point Master',
      description: 'Take 50,000 points',
    },

    // ZINGS_MADE - 10, 100, 500 zings
    {
      type: AchievementType.ZINGS_MADE,
      tier: 1,
      threshold: 10,
      name: 'Zing Starter',
      description: 'Score 10 zings',
    },
    {
      type: AchievementType.ZINGS_MADE,
      tier: 2,
      threshold: 100,
      name: 'Zing Expert',
      description: 'Score 100 zings',
    },
    {
      type: AchievementType.ZINGS_MADE,
      tier: 3,
      threshold: 500,
      name: 'Zing God',
      description: 'Score 500 zings',
    },

    // GAMES_HOSTED - 5, 50, 200 games
    {
      type: AchievementType.GAMES_HOSTED,
      tier: 1,
      threshold: 5,
      name: 'Host Beginner',
      description: 'Host 5 games',
    },
    {
      type: AchievementType.GAMES_HOSTED,
      tier: 2,
      threshold: 50,
      name: 'Host Veteran',
      description: 'Host 50 games',
    },
    {
      type: AchievementType.GAMES_HOSTED,
      tier: 3,
      threshold: 200,
      name: 'Host Master',
      description: 'Host 200 games',
    },

    // FRIENDS_ADDED - 5, 20, 50 friends
    {
      type: AchievementType.FRIENDS_ADDED,
      tier: 1,
      threshold: 5,
      name: 'Social Starter',
      description: 'Add 5 friends',
    },
    {
      type: AchievementType.FRIENDS_ADDED,
      tier: 2,
      threshold: 20,
      name: 'Social Butterfly',
      description: 'Add 20 friends',
    },
    {
      type: AchievementType.FRIENDS_ADDED,
      tier: 3,
      threshold: 50,
      name: 'Social Legend',
      description: 'Add 50 friends',
    },
  ];

  console.log('Seeding achievements...');
  
  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: {
        type_tier: {
          type: achievement.type,
          tier: achievement.tier,
        },
      },
      update: achievement,
      create: achievement,
    });
  }

  console.log(`✓ Seeded ${achievements.length} achievements`);
}

seedAchievements()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
