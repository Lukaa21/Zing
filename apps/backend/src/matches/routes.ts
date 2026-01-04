import { Router, Request, Response } from 'express';
import { verifyToken, getBearerToken } from '../auth/jwt';
import { prisma } from '../db/prisma';

const router = Router();

// GET /api/matches/history - Get user's match history (last 30 matches)
router.get('/history', async (req: Request, res: Response) => {
  console.log('[Match History] Request received');
  console.log('[Match History] Headers:', req.headers.authorization);
  
  try {
    // Extract and verify JWT token
    const token = getBearerToken(req.headers.authorization);
    console.log('[Match History] Token extracted:', token ? 'present' : 'missing');
    
    if (!token) {
      return res.status(401).json({ error: 'No authentication token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const userId = decoded.userId;

    // Query match history where user participated
    const matches = await prisma.matchHistory.findMany({
      where: {
        OR: [
          { team0Player1Id: userId },
          { team0Player2Id: userId },
          { team1Player1Id: userId },
          { team1Player2Id: userId },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 30,
    });

    // Transform data for frontend
    const history = matches.map((match: any) => {
      // Determine user's team
      const userTeam = 
        match.team0Player1Id === userId || match.team0Player2Id === userId ? 0 : 1;
      
      const won = match.winnerTeam === userTeam;

      // Build team info
      const team0 = [
        match.team0Player1Name,
        match.team0Player2Name,
      ].filter(Boolean);

      const team1 = [
        match.team1Player1Name,
        match.team1Player2Name,
      ].filter(Boolean);

      return {
        id: match.id,
        mode: match.mode,
        won,
        userTeam,
        winnerTeam: match.winnerTeam,
        team0Score: match.team0Score,
        team1Score: match.team1Score,
        team0,
        team1,
        duration: match.duration,
        createdAt: match.createdAt,
      };
    });

    res.status(200).json({ matches: history });
  } catch (error: any) {
    console.error('Error fetching match history:', error);
    res.status(500).json({ error: 'Failed to fetch match history' });
  }
});

export default router;
