import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { signToken, verifyToken, getBearerToken } from './jwt';
import { prisma } from '../db/prisma';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    // Validate input
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'email, password, and username are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'password must be at least 8 characters' });
    }

    // Validate username format (alphanumeric + underscore, max 30 chars)
    const usernameRegex = /^[a-zA-Z0-9_]{1,30}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: 'username must be 1-30 characters and contain only letters, numbers, and underscores' });
    }

    // Check if user already exists (case-insensitive)
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'user with this email already exists' });
    }

    // Check if username is already taken
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return res.status(409).json({ error: 'username is already taken' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        username,
      },
    });

    // Sign JWT
    const token = signToken(user.id);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('register error:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ error: 'invalid email or password' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'invalid email or password' });
    }

    // Sign JWT
    const token = signToken(user.id);

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('login error:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// GET /api/auth/me
router.get('/me', async (req: Request, res: Response) => {
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

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('me error:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// POST /api/auth/logout (optional - frontend just deletes token)
router.post('/logout', (req: Request, res: Response) => {
  return res.json({ message: 'logout successful' });
});

export default router;
