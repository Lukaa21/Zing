import prisma from '../db';

function prismaAvailable() {
  return Boolean(process.env.DATABASE_URL);
}

export async function appendGameEvent(gameId: string, seq: number, type: string, actor: string | undefined, payload: any) {
  if (!prismaAvailable()) {
    console.warn('Prisma unavailable - skipping appendGameEvent', { gameId, seq, type });
    return null;
  }
  try {
    const created = await prisma.gameEvent.create({
      data: {
        gameId,
        seq,
        type,
        actor,
        payload
      }
    });
    return created;
  } catch (err) {
    console.warn('appendGameEvent failed', err);
    return null;
  }
}

export async function fetchGameEvents(gameId: string) {
  if (!prismaAvailable()) {
    console.warn('Prisma unavailable - fetchGameEvents returning empty list');
    return [];
  }
  try {
    return prisma.gameEvent.findMany({ where: { gameId }, orderBy: { seq: 'asc' } });
  } catch (err) {
    console.warn('fetchGameEvents failed', err);
    return [];
  }
}
