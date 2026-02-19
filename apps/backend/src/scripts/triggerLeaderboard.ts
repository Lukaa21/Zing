import { updateAllLeaderboards } from '../leaderboard/service';

(async () => {
  try {
    console.log('[Trigger] Starting leaderboard update...');
    await updateAllLeaderboards();
    console.log('[Trigger] Leaderboard update finished');
    process.exit(0);
  } catch (err) {
    console.error('[Trigger] Leaderboard update failed', err);
    process.exit(1);
  }
})();