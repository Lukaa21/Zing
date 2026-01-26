import '../env';
import { PrismaClient } from '@prisma/client';

// Singleton Prisma instance - created only once per server lifetime
// Connection pool limited to prevent MaxClientsInSessionMode error
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

export { prisma };