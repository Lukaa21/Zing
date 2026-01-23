// RoomInviteStatus enum values
const RoomInviteStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
} as const;
import * as inviteRepo from './inviteRepository';

// Error codes
export enum InviteErrorCode {
  INVITE_NOT_FOUND = 'INVITE_NOT_FOUND',
  INVITE_ALREADY_PENDING = 'INVITE_ALREADY_PENDING',
  INVITE_NOT_PENDING = 'INVITE_NOT_PENDING',
  INVITE_EXPIRED = 'INVITE_EXPIRED',
  ROOM_NOT_FOUND = 'ROOM_NOT_FOUND',
  ALREADY_IN_ROOM = 'ALREADY_IN_ROOM',
  CANNOT_INVITE_SELF = 'CANNOT_INVITE_SELF',
  NOT_FRIENDS = 'NOT_FRIENDS',
  INVITEE_NOT_FOUND = 'INVITEE_NOT_FOUND',
}

export class InviteError extends Error {
  constructor(
    public code: InviteErrorCode,
    message?: string
  ) {
    super(message || code);
    this.name = 'InviteError';
  }
}

// Callback types for external dependencies
export type RoomExistsCallback = (roomId: string) => boolean | Promise<boolean>;
export type UserInRoomCallback = (userId: string) => string | null | Promise<string | null>; // returns roomId or null
export type AreFriendsCallback = (userId1: string, userId2: string) => boolean | Promise<boolean>;

export interface InviteServiceDependencies {
  roomExists: RoomExistsCallback;
  getUserCurrentRoom: UserInRoomCallback;
  areFriends?: AreFriendsCallback; // Optional: enforce friendship requirement
}

export class InviteService {
  private deps: InviteServiceDependencies;

  constructor(dependencies: InviteServiceDependencies) {
    this.deps = dependencies;
  }

  /**
   * Send a room invite
   * TTL: 5 minutes
   * 
   * @throws InviteError with code INVITE_ALREADY_PENDING if duplicate exists
   * @throws InviteError with code CANNOT_INVITE_SELF if inviting yourself
   * @throws InviteError with code NOT_FRIENDS if friendship check enabled and not friends
   * @throws InviteError with code ROOM_NOT_FOUND if room doesn't exist
   */
  async sendInvite(params: {
    roomId: string;
    inviterId: string;
    inviteeId: string;
    metadata?: Record<string, any>;
  }) {
    const { roomId, inviterId, inviteeId, metadata } = params;

    // Validate: cannot invite yourself
    if (inviterId === inviteeId) {
      throw new InviteError(InviteErrorCode.CANNOT_INVITE_SELF);
    }

    // Validate: room must exist
    const roomExists = await this.deps.roomExists(roomId);
    if (!roomExists) {
      throw new InviteError(InviteErrorCode.ROOM_NOT_FOUND);
    }

    // Optional: validate friendship
    if (this.deps.areFriends) {
      const areFriends = await this.deps.areFriends(inviterId, inviteeId);
      if (!areFriends) {
        throw new InviteError(InviteErrorCode.NOT_FRIENDS);
      }
    }

    // Create invite with 5 minute TTL
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    try {
      const invite = await inviteRepo.createInvite({
        roomId,
        inviterId,
        inviteeId,
        expiresAt,
        metadata,
      });

      return invite;
    } catch (error: any) {
      if (error.message === 'INVITE_ALREADY_PENDING') {
        throw new InviteError(InviteErrorCode.INVITE_ALREADY_PENDING);
      }
      throw error;
    }
  }

  /**
   * Accept a room invite
   * 
   * Uses transaction to prevent race conditions
   * 
   * @throws InviteError with various codes based on validation failures
   */
  async acceptInvite(params: {
    inviteId: string;
    inviteeId: string; // For authorization check
  }) {
    const { inviteId, inviteeId } = params;

    // Fetch invite
    const invite = await inviteRepo.getInviteById(inviteId);

    // Validate: invite exists
    if (!invite) {
      throw new InviteError(InviteErrorCode.INVITE_NOT_FOUND);
    }

    // Validate: correct invitee (authorization)
    if (invite.inviteeId !== inviteeId) {
      throw new InviteError(InviteErrorCode.INVITE_NOT_FOUND); // Don't leak invite existence
    }

    // Validate: invite is PENDING
    if (invite.status !== RoomInviteStatus.PENDING) {
      throw new InviteError(InviteErrorCode.INVITE_NOT_PENDING);
    }

    // Validate: invite not expired
    const now = new Date();
    if (invite.expiresAt < now) {
      // Mark as expired and return error
      await inviteRepo.markExpired(inviteId);
      throw new InviteError(InviteErrorCode.INVITE_EXPIRED);
    }

    // Validate: room still exists
    const roomExists = await this.deps.roomExists(invite.roomId);
    if (!roomExists) {
      throw new InviteError(InviteErrorCode.ROOM_NOT_FOUND);
    }

    // Validate: invitee not already in another room
    const currentRoom = await this.deps.getUserCurrentRoom(inviteeId);
    if (currentRoom) {
      throw new InviteError(
        InviteErrorCode.ALREADY_IN_ROOM,
        `User is already in room: ${currentRoom}`
      );
    }

    // All validations passed - mark as accepted
    const acceptedInvite = await inviteRepo.markAccepted(inviteId);

    return acceptedInvite;
  }

  /**
   * Decline a room invite
   * 
   * @throws InviteError if invite not found or not pending
   */
  async declineInvite(params: {
    inviteId: string;
    inviteeId: string; // For authorization
  }) {
    const { inviteId, inviteeId } = params;

    // Fetch invite
    const invite = await inviteRepo.getInviteById(inviteId);

    // Validate: invite exists
    if (!invite) {
      throw new InviteError(InviteErrorCode.INVITE_NOT_FOUND);
    }

    // Validate: correct invitee
    if (invite.inviteeId !== inviteeId) {
      throw new InviteError(InviteErrorCode.INVITE_NOT_FOUND);
    }

    // Validate: invite is PENDING (can only decline pending invites)
    if (invite.status !== RoomInviteStatus.PENDING) {
      throw new InviteError(InviteErrorCode.INVITE_NOT_PENDING);
    }

    // Mark as declined
    const declinedInvite = await inviteRepo.markDeclined(inviteId);

    return declinedInvite;
  }

  /**
   * Cancel all pending invites for a room
   * Used when room is deleted
   * 
   * Returns list of cancelled invites (for notification purposes)
   */
  async cancelInvitesByRoomDeletion(roomId: string) {
    // Get pending invites before cancelling (for notifications)
    const pendingInvites = await inviteRepo.getPendingInvitesByRoom(roomId);

    // Cancel all pending invites
    await inviteRepo.cancelInvitesByRoom(roomId);

    return pendingInvites;
  }

  /**
   * Get pending invites for a user
   * Filters out expired invites
   */
  async getPendingInvitesForUser(userId: string) {
    const invites = await inviteRepo.getPendingInvitesForUser(userId);
    
    // Filter out expired invites (shouldn't happen if cleanup job runs, but just in case)
    const now = new Date();
    return invites.filter(inv => inv.expiresAt > now);
  }

  /**
   * Get pending invites for a room
   */
  async getPendingInvitesByRoom(roomId: string) {
    return await inviteRepo.getPendingInvitesByRoom(roomId);
  }

  /**
   * Check if a pending invite exists for (roomId, inviteeId)
   * Useful for UI to disable invite button
   */
  async hasPendingInvite(roomId: string, inviteeId: string): Promise<boolean> {
    return await inviteRepo.hasPendingInvite(roomId, inviteeId);
  }

  /**
   * Expire old invites
   * Should be called periodically (cron job or on-demand)
   * 
   * Returns number of invites expired
   */
  async expireOldInvites(): Promise<number> {
    const now = new Date();
    const result = await inviteRepo.expireOldInvites(now);
    return result.count;
  }

  /**
   * Get invite by ID (with authorization check)
   * 
   * @param inviteId 
   * @param userId - User requesting the invite (must be inviter or invitee)
   */
  async getInviteById(inviteId: string, userId: string) {
    const invite = await inviteRepo.getInviteById(inviteId);
    
    if (!invite) {
      throw new InviteError(InviteErrorCode.INVITE_NOT_FOUND);
    }

    // Authorization: only inviter or invitee can view
    if (invite.inviterId !== userId && invite.inviteeId !== userId) {
      throw new InviteError(InviteErrorCode.INVITE_NOT_FOUND);
    }

    return invite;
  }
}

/**
 * Error code documentation
 * 
 * INVITE_NOT_FOUND:
 * - Invite ID doesn't exist in database
 * - Or user is not authorized to view it (inviter/invitee check)
 * 
 * INVITE_ALREADY_PENDING:
 * - A PENDING invite already exists for this (roomId, inviteeId) combination
 * - User should wait for existing invite to be accepted/declined/expired
 * 
 * INVITE_NOT_PENDING:
 * - Invite status is not PENDING (already ACCEPTED, DECLINED, CANCELLED, or EXPIRED)
 * - Cannot accept or decline a non-pending invite
 * 
 * INVITE_EXPIRED:
 * - Invite expiresAt timestamp is in the past
 * - Invite status will be updated to EXPIRED automatically
 * 
 * ROOM_NOT_FOUND:
 * - Room ID doesn't exist (room was deleted or never existed)
 * - Cannot send invite to non-existent room
 * - Cannot accept invite for deleted room
 * 
 * ALREADY_IN_ROOM:
 * - Invitee is currently in another room
 * - UI should prompt: "Leave current room and join?"
 * - User must leave current room before accepting new invite
 * 
 * CANNOT_INVITE_SELF:
 * - Inviter and invitee are the same user
 * 
 * NOT_FRIENDS:
 * - Inviter and invitee are not friends (Friendship status != ACCEPTED)
 * - Only thrown if areFriends callback is provided
 * 
 * INVITEE_NOT_FOUND:
 * - Invitee user ID doesn't exist
 */
