import { PrismaClient, RoomInviteStatus } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateInviteParams {
  roomId: string;
  inviterId: string;
  inviteeId: string;
  expiresAt: Date;
  metadata?: Record<string, any>;
}

export interface InviteWithUsers {
  id: string;
  roomId: string;
  inviterId: string;
  inviteeId: string;
  status: RoomInviteStatus;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  metadata: any;
  inviter: {
    id: string;
    username: string;
  };
  invitee: {
    id: string;
    username: string;
  };
}

/**
 * Create a new room invite
 * @throws Error if a PENDING invite already exists for this (roomId, inviteeId)
 */
export async function createInvite(params: CreateInviteParams) {
  const { roomId, inviterId, inviteeId, expiresAt, metadata } = params;

  // Check if PENDING invite already exists
  const existingPending = await prisma.roomInvite.findFirst({
    where: {
      roomId,
      inviteeId,
      status: RoomInviteStatus.PENDING,
    },
  });

  if (existingPending) {
    throw new Error('INVITE_ALREADY_PENDING');
  }

  return await prisma.roomInvite.create({
    data: {
      roomId,
      inviterId,
      inviteeId,
      status: RoomInviteStatus.PENDING,
      expiresAt,
      metadata: metadata || {},
    },
    include: {
      inviter: {
        select: {
          id: true,
          username: true,
        },
      },
      invitee: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

/**
 * Mark invite as ACCEPTED
 */
export async function markAccepted(inviteId: string) {
  return await prisma.roomInvite.update({
    where: { id: inviteId },
    data: {
      status: RoomInviteStatus.ACCEPTED,
      updatedAt: new Date(),
    },
    include: {
      inviter: {
        select: {
          id: true,
          username: true,
        },
      },
      invitee: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

/**
 * Mark invite as DECLINED
 */
export async function markDeclined(inviteId: string) {
  return await prisma.roomInvite.update({
    where: { id: inviteId },
    data: {
      status: RoomInviteStatus.DECLINED,
      updatedAt: new Date(),
    },
    include: {
      inviter: {
        select: {
          id: true,
          username: true,
        },
      },
      invitee: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

/**
 * Cancel all PENDING invites for a room (when room is deleted)
 */
export async function cancelInvitesByRoom(roomId: string) {
  return await prisma.roomInvite.updateMany({
    where: {
      roomId,
      status: RoomInviteStatus.PENDING,
    },
    data: {
      status: RoomInviteStatus.CANCELLED,
      updatedAt: new Date(),
    },
  });
}

/**
 * Get all PENDING invites that need to be cancelled for a room
 * (useful for emitting notifications before cancelling)
 */
export async function getPendingInvitesByRoom(roomId: string): Promise<InviteWithUsers[]> {
  return await prisma.roomInvite.findMany({
    where: {
      roomId,
      status: RoomInviteStatus.PENDING,
    },
    include: {
      inviter: {
        select: {
          id: true,
          username: true,
        },
      },
      invitee: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

/**
 * Expire all PENDING invites that have passed their expiresAt time
 */
export async function expireOldInvites(now: Date = new Date()) {
  return await prisma.roomInvite.updateMany({
    where: {
      status: RoomInviteStatus.PENDING,
      expiresAt: {
        lt: now,
      },
    },
    data: {
      status: RoomInviteStatus.EXPIRED,
      updatedAt: now,
    },
  });
}

/**
 * Get invite by ID with user details
 */
export async function getInviteById(inviteId: string): Promise<InviteWithUsers | null> {
  return await prisma.roomInvite.findUnique({
    where: { id: inviteId },
    include: {
      inviter: {
        select: {
          id: true,
          username: true,
        },
      },
      invitee: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

/**
 * Get all PENDING invites for a user
 */
export async function getPendingInvitesForUser(userId: string): Promise<InviteWithUsers[]> {
  const now = new Date();
  
  return await prisma.roomInvite.findMany({
    where: {
      inviteeId: userId,
      status: RoomInviteStatus.PENDING,
      expiresAt: {
        gt: now,
      },
    },
    include: {
      inviter: {
        select: {
          id: true,
          username: true,
        },
      },
      invitee: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * Check if a PENDING invite exists for (roomId, inviteeId)
 */
export async function hasPendingInvite(roomId: string, inviteeId: string): Promise<boolean> {
  const count = await prisma.roomInvite.count({
    where: {
      roomId,
      inviteeId,
      status: RoomInviteStatus.PENDING,
    },
  });
  
  return count > 0;
}

/**
 * Mark invite as EXPIRED
 */
export async function markExpired(inviteId: string) {
  return await prisma.roomInvite.update({
    where: { id: inviteId },
    data: {
      status: RoomInviteStatus.EXPIRED,
      updatedAt: new Date(),
    },
  });
}
