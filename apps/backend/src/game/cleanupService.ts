import { prisma } from '../db/prisma';

// Configuration
const COMPLETED_GAME_RETENTION_HOURS = 24;
const STALE_GAME_RETENTION_HOURS = 24;

/**
 * Deletes old games and their associated events/snapshots to free up space.
 * GameEvents are deleted automatically via Cascade delete on the Game model.
 */
export async function cleanupOldGames() {
  console.log('[Cleanup] Starting game cleanup task...');
  
  const now = new Date();
  const completedThreshold = new Date(now.getTime() - COMPLETED_GAME_RETENTION_HOURS * 60 * 60 * 1000);
  const staleThreshold = new Date(now.getTime() - STALE_GAME_RETENTION_HOURS * 60 * 60 * 1000);

  try {
    // 1. Identify completed games to delete
    const completedGames = await prisma.game.findMany({
      where: {
        status: 'completed',
        updatedAt: { lt: completedThreshold }
      },
      select: { id: true }
    });
    
    // 2. Identify stale games to delete
    const staleGames = await prisma.game.findMany({
      where: {
        status: { not: 'completed' },
        updatedAt: { lt: staleThreshold }
      },
      select: { id: true }
    });

    const gameIdsToDelete = [...completedGames, ...staleGames].map(g => g.id);

    if (gameIdsToDelete.length > 0) {
      console.log(`[Cleanup] Found ${gameIdsToDelete.length} games to delete.`);

      // Manual cleanup of related tables without Cascade relation
      const deletedSnapshots = await prisma.gameSnapshot.deleteMany({
        where: { gameId: { in: gameIdsToDelete } }
      });
      
      const deletedScores = await prisma.roundScore.deleteMany({
        where: { gameId: { in: gameIdsToDelete } }
      });

      console.log(`[Cleanup] Removed ${deletedScores.count} RoundScores and ${deletedSnapshots.count} GameSnapshots.`);

      // Finally delete the games (GameEvents will cascade)
      const deletedGames = await prisma.game.deleteMany({
        where: { id: { in: gameIdsToDelete } }
      });

      console.log(`[Cleanup] Successfully deleted ${deletedGames.count} games.`);
    } else {
      console.log('[Cleanup] No old games found to delete.');
    }

  } catch (err) {
    console.error('[Cleanup] Failed to cleanup old games:', err);
  }
}

/**
 * Schedules the cleanup task to run periodically.
 */
export function scheduleGameCleanup() {
  // Run cleanup once on startup (after a short delay to let server settle)
  setTimeout(() => {
    cleanupOldGames().catch(console.error);
  }, 30000); // 30 seconds after startup

  // Then run every 6 hours
  const SIX_HOURS = 6 * 60 * 60 * 1000;
  setInterval(() => {
    cleanupOldGames().catch(console.error);
  }, SIX_HOURS);

  console.log('[Cleanup] Scheduled game cleanup task (every 6 hours)');
}
