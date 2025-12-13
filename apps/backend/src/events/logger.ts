import prisma from '../db';

export async function appendGameEvent(gameId: string, seq: number, type: string, actor: string | undefined, payload: any) {
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
}

export async function fetchGameEvents(gameId: string) {
  return prisma.gameEvent.findMany({ where: { gameId }, orderBy: { seq: 'asc' } });
}
