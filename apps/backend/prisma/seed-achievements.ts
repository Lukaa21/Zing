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
      description: 'Odigraj 10 partija',
    },
    {
      type: AchievementType.GAMES_PLAYED,
      tier: 2,
      threshold: 100,
      name: 'Experienced Player',
      description: 'Odigraj 100 partija',
    },
    {
      type: AchievementType.GAMES_PLAYED,
      tier: 3,
      threshold: 300,
      name: 'Veteran Player',
      description: 'Odigraj 300 partija',
    },

    // SOLO_WINS - 5, 50, 150 wins
    {
      type: AchievementType.SOLO_WINS,
      tier: 1,
      threshold: 5,
      name: 'Solo Champion',
      description: 'Pobijedi u 5 solo partija',
    },
    {
      type: AchievementType.SOLO_WINS,
      tier: 2,
      threshold: 50,
      name: 'Solo Master',
      description: 'Pobijedi u 50 solo partija',
    },
    {
      type: AchievementType.SOLO_WINS,
      tier: 3,
      threshold: 150,
      name: 'Solo Legend',
      description: 'Pobijedi u 150 solo partija',
    },

    // DUO_WINS - 10, 100, 250 wins
    {
      type: AchievementType.DUO_WINS,
      tier: 1,
      threshold: 10,
      name: 'Duo Champion',
      description: 'Pobijedi u 10 duo partija',
    },
    {
      type: AchievementType.DUO_WINS,
      tier: 2,
      threshold: 100,
      name: 'Duo Master',
      description: 'Pobijedi u 100 duo partija',
    },
    {
      type: AchievementType.DUO_WINS,
      tier: 3,
      threshold: 250,
      name: 'Duo Legend',
      description: 'Pobijedi u 250 duo partija',
    },

    // POINTS_TAKEN - 1000, 10000, 50000 points
    {
      type: AchievementType.POINTS_TAKEN,
      tier: 1,
      threshold: 1000,
      name: 'Point Collector',
      description: 'Osvoji 1,000 poena',
    },
    {
      type: AchievementType.POINTS_TAKEN,
      tier: 2,
      threshold: 10000,
      name: 'Point Hunter',
      description: 'Osvoji 10,000 poena',
    },
    {
      type: AchievementType.POINTS_TAKEN,
      tier: 3,
      threshold: 50000,
      name: 'Point Master',
      description: 'Osvoji 50,000 poena',
    },

    // ZINGS_MADE - 10, 100, 500 zings
    {
      type: AchievementType.ZINGS_MADE,
      tier: 1,
      threshold: 10,
      name: 'Zing Starter',
      description: 'Napravi 10 zingova',
    },
    {
      type: AchievementType.ZINGS_MADE,
      tier: 2,
      threshold: 100,
      name: 'Zing Expert',
      description: 'Napravi 100 zingova',
    },
    {
      type: AchievementType.ZINGS_MADE,
      tier: 3,
      threshold: 500,
      name: 'Zing God',
      description: 'Napravi 500 zingova',
    },

    // GAMES_HOSTED - 5, 50, 200 games
    {
      type: AchievementType.GAMES_HOSTED,
      tier: 1,
      threshold: 5,
      name: 'Host Beginner',
      description: 'Hostuj 5 igara',
    },
    {
      type: AchievementType.GAMES_HOSTED,
      tier: 2,
      threshold: 50,
      name: 'Host Veteran',
      description: 'Hostuj 50 igara',
    },
    {
      type: AchievementType.GAMES_HOSTED,
      tier: 3,
      threshold: 200,
      name: 'Host Master',
      description: 'Hostuj 200 igara',
    },

    // FRIENDS_ADDED - 5, 20, 50 friends
    {
      type: AchievementType.FRIENDS_ADDED,
      tier: 1,
      threshold: 5,
      name: 'Social Starter',
      description: 'Dodaj 5 prijatelja',
    },
    {
      type: AchievementType.FRIENDS_ADDED,
      tier: 2,
      threshold: 20,
      name: 'Social Butterfly',
      description: 'Dodaj 20 prijatelja',
    },
    {
      type: AchievementType.FRIENDS_ADDED,
      tier: 3,
      threshold: 50,
      name: 'Social Legend',
      description: 'Dodaj 50 prijatelja',
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
