import { Request, Response, NextFunction } from 'express';
import { verifyToken, getBearerToken } from './jwt';
import { prisma } from '../db/prisma';

// Extend Express Request type to include user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = getBearerToken(authHeader);

    if (!token) {
      return res.status(401).json({ error: 'no token provided' });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return res.status(401).json({ error: 'invalid or expired token' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    next();
  } catch (error) {
    console.error('auth middleware error:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
}
