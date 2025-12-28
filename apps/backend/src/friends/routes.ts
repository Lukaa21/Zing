import { Router, Response } from 'express';
import { requireAuth, AuthRequest } from '../auth/middleware';
import { prisma } from '../db/prisma';
import { FriendshipStatus } from '@prisma/client';

const router = Router();

// All routes require authentication
router.use(requireAuth);

// POST /api/friends/request - Send friend request
router.post('/request', async (req: AuthRequest, res: Response) => {
  try {
    const { username } = req.body;
    const requesterId = req.user!.id;

    if (!username) {
      return res.status(400).json({ error: 'username is required' });
    }

    // Find the addressee by username
    const addressee = await prisma.user.findUnique({
      where: { username },
    });

    if (!addressee) {
      return res.status(404).json({ error: 'user not found' });
    }

    // Can't send friend request to yourself
    if (addressee.id === requesterId) {
      return res.status(400).json({ error: 'cannot send friend request to yourself' });
    }

    // Check if friendship already exists in either direction
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { requesterId, addresseeId: addressee.id },
          { requesterId: addressee.id, addresseeId: requesterId },
        ],
      },
    });

    if (existingFriendship) {
      if (existingFriendship.status === FriendshipStatus.ACCEPTED) {
        return res.status(400).json({ error: 'already friends' });
      }
      if (existingFriendship.status === FriendshipStatus.PENDING) {
        return res.status(400).json({ error: 'friend request already pending' });
      }
      if (existingFriendship.status === FriendshipStatus.REJECTED) {
        // Allow re-sending after rejection
        const updated = await prisma.friendship.update({
          where: { id: existingFriendship.id },
          data: { 
            status: FriendshipStatus.PENDING,
            requesterId,
            addresseeId: addressee.id,
          },
          include: {
            addressee: {
              select: { id: true, username: true },
            },
          },
        });

        return res.status(200).json({
          id: updated.id,
          requesterId: updated.requesterId,
          addresseeId: updated.addresseeId,
          status: updated.status,
          addressee: updated.addressee,
          createdAt: updated.createdAt,
        });
      }
    }

    // Create new friend request
    const friendship = await prisma.friendship.create({
      data: {
        requesterId,
        addresseeId: addressee.id,
        status: FriendshipStatus.PENDING,
      },
      include: {
        addressee: {
          select: { id: true, username: true },
        },
      },
    });

    return res.status(201).json({
      id: friendship.id,
      requesterId: friendship.requesterId,
      addresseeId: friendship.addresseeId,
      status: friendship.status,
      addressee: friendship.addressee,
      createdAt: friendship.createdAt,
    });
  } catch (error) {
    console.error('friend request error:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// GET /api/friends - Get all accepted friends
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { requesterId: userId, status: FriendshipStatus.ACCEPTED },
          { addresseeId: userId, status: FriendshipStatus.ACCEPTED },
        ],
      },
      include: {
        requester: {
          select: { id: true, username: true },
        },
        addressee: {
          select: { id: true, username: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Transform to show the friend (not self) for each friendship
    const friends = friendships.map((f) => {
      const iAmRequester = f.requesterId === userId;
      const friend = iAmRequester ? f.addressee : f.requester;
      
      return {
        id: f.id,
        friendId: friend.id,
        username: friend.username,
        since: f.updatedAt,
      };
    });

    return res.json({ friends });
  } catch (error) {
    console.error('get friends error:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// GET /api/friends/requests - Get pending friend requests (received)
router.get('/requests', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const requests = await prisma.friendship.findMany({
      where: {
        addresseeId: userId,
        status: FriendshipStatus.PENDING,
      },
      include: {
        requester: {
          select: { id: true, username: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const friendRequests = requests.map((r) => ({
      id: r.id,
      requesterId: r.requester.id,
      username: r.requester.username,
      createdAt: r.createdAt,
    }));

    return res.json({ requests: friendRequests });
  } catch (error) {
    console.error('get friend requests error:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// GET /api/friends/sent - Get sent friend requests (pending)
router.get('/sent', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const sentRequests = await prisma.friendship.findMany({
      where: {
        requesterId: userId,
        status: FriendshipStatus.PENDING,
      },
      include: {
        addressee: {
          select: { id: true, username: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const requests = sentRequests.map((r) => ({
      id: r.id,
      addresseeId: r.addressee.id,
      username: r.addressee.username,
      createdAt: r.createdAt,
    }));

    return res.json({ requests });
  } catch (error) {
    console.error('get sent requests error:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// PUT /api/friends/:id/accept - Accept friend request
router.put('/:id/accept', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // Find the friendship request
    const friendship = await prisma.friendship.findUnique({
      where: { id },
      include: {
        requester: {
          select: { id: true, username: true },
        },
      },
    });

    if (!friendship) {
      return res.status(404).json({ error: 'friend request not found' });
    }

    // Must be the addressee to accept
    if (friendship.addresseeId !== userId) {
      return res.status(403).json({ error: 'you can only accept requests sent to you' });
    }

    // Must be pending
    if (friendship.status !== FriendshipStatus.PENDING) {
      return res.status(400).json({ error: 'request is not pending' });
    }

    // Update to accepted
    const updated = await prisma.friendship.update({
      where: { id },
      data: { status: FriendshipStatus.ACCEPTED },
    });

    return res.json({
      id: updated.id,
      friendId: friendship.requester.id,
      username: friendship.requester.username,
      status: updated.status,
      since: updated.updatedAt,
    });
  } catch (error) {
    console.error('accept friend request error:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// PUT /api/friends/:id/reject - Reject friend request
router.put('/:id/reject', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // Find the friendship request
    const friendship = await prisma.friendship.findUnique({
      where: { id },
    });

    if (!friendship) {
      return res.status(404).json({ error: 'friend request not found' });
    }

    // Must be the addressee to reject
    if (friendship.addresseeId !== userId) {
      return res.status(403).json({ error: 'you can only reject requests sent to you' });
    }

    // Must be pending
    if (friendship.status !== FriendshipStatus.PENDING) {
      return res.status(400).json({ error: 'request is not pending' });
    }

    // Update to rejected
    const updated = await prisma.friendship.update({
      where: { id },
      data: { status: FriendshipStatus.REJECTED },
    });

    return res.json({
      id: updated.id,
      status: updated.status,
      message: 'friend request rejected',
    });
  } catch (error) {
    console.error('reject friend request error:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// DELETE /api/friends/:id - Remove friend (unfriend)
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // Find the friendship
    const friendship = await prisma.friendship.findUnique({
      where: { id },
    });

    if (!friendship) {
      return res.status(404).json({ error: 'friendship not found' });
    }

    // Must be either requester or addressee
    if (friendship.requesterId !== userId && friendship.addresseeId !== userId) {
      return res.status(403).json({ error: 'you can only remove your own friends' });
    }

    // Delete the friendship
    await prisma.friendship.delete({
      where: { id },
    });

    return res.json({ message: 'friend removed successfully' });
  } catch (error) {
    console.error('remove friend error:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
});

export default router;
