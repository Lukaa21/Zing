import '../env';
import { PrismaClient } from '@prisma/client';

// Singleton Prisma instance - created only once per server lifetime
const prisma = new PrismaClient();

export { prisma };