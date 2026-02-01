import { useState, useEffect, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { clearReconnectToken } from '../utils/guest';

// Types
export type RoomRole = 'PLAYER' | 'SPECTATOR';

export interface RoomMember {
  userId: string;
  name: string;
  roleInRoom: RoomRole;
  joinedAt: string;
}

export interface RoomState {
  roomId: string | null;
  members: RoomMember[];
  hostId: string | null;
  ownerId: string | null;
  isHost: boolean;
  playerCount: number;
  teamAssignment: { team0: string[]; team1: string[] } | null;
  timerEnabled: boolean;
  accessCode: string | null;
  inviteToken: string | null;
}

export interface PendingInvite {
  inviteId: string;
  roomId: string;
  inviterId: string;
  inviterUsername: string;
  expiresAt: string;
  createdAt: string;
}

interface UseRoomStateParams {
  socket: Socket | null;
  currentUserId: string | null;
  guestId?: string | null;
  initialRoomId?: string | null;
  initialPlayers?: any[];
  initialOwnerId?: string | null;
  onLeave?: () => void;
}

export function useRoomState({ socket, currentUserId, guestId, initialRoomId, initialPlayers, initialOwnerId, onLeave }: UseRoomStateParams) {
  // Convert initial players to members format
  const initialMembers = initialPlayers ? initialPlayers.map((p: any) => ({
    userId: p.id,
    name: p.name,
    roleInRoom: p.role === 'spectator' ? 'SPECTATOR' as RoomRole : 'PLAYER' as RoomRole,
    joinedAt: new Date().toISOString(),
  })) : [];

  const [roomState, setRoomState] = useState<RoomState>({
    roomId: initialRoomId || null,
    members: initialMembers,
    hostId: initialOwnerId || null, // Use ownerId as hostId initially
    ownerId: initialOwnerId || null,
    isHost: false,
    playerCount: 0,
    teamAssignment: null,
    timerEnabled: false,
    accessCode: null,
    inviteToken: null,
  });

  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [inMatchmaking, setInMatchmaking] = useState(false);

  // Calculate derived state
  useEffect(() => {
    if (currentUserId) {
      const playerCount = roomState.members.filter(m => m.roleInRoom === 'PLAYER').length;
      const isHost = roomState.hostId === currentUserId;
      
      setRoomState(prev => ({
        ...prev,
        playerCount,
        isHost,
      }));
    }
  }, [roomState.members, roomState.hostId, currentUserId]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    console.log('useRoomState: Registering socket event listeners');

    // Room events
    const handleRoomCreated = (data: { roomId: string; visibility: string; accessCode?: string; inviteToken?: string }) => {
      console.log('Room created, adding current user to members immediately');
      setRoomState(prev => ({ 
        ...prev, 
        roomId: data.roomId,
        accessCode: data.accessCode || prev.accessCode,
        inviteToken: data.inviteToken || prev.inviteToken,
      }));
      setError(null);
    };

    const handleRoomUpdate = (data: { 
      roomId: string; 
      members?: RoomMember[];
      players?: any[];
      hostId?: string;
      ownerId?: string;
      timerEnabled?: boolean;
      accessCode?: string;
      inviteToken?: string;
    }) => {
      // Backend emits TWO formats:
      // 1. Invite system: { members: RoomMember[] } - new format
      // 2. Game system: { players: Player[] } - legacy format
      // Convert players to members if members not provided
      let updatedMembers = data.members;
      if (!updatedMembers && data.players) {
        updatedMembers = data.players.map((p: any) => ({
          userId: p.id,
          name: p.name,
          roleInRoom: p.role === 'spectator' ? 'SPECTATOR' : 'PLAYER',
          joinedAt: new Date().toISOString(),
        }));
      }

      // Use ownerId as hostId if hostId not provided (legacy compatibility)
      const effectiveHostId = data.hostId !== undefined ? data.hostId : data.ownerId;

      setRoomState(prev => ({
        ...prev,
        roomId: data.roomId,
        members: updatedMembers || prev.members,
        hostId: effectiveHostId !== undefined ? effectiveHostId : prev.hostId,
        ownerId: data.ownerId !== undefined ? data.ownerId : prev.ownerId,
        timerEnabled: data.timerEnabled !== undefined ? data.timerEnabled : prev.timerEnabled,
        accessCode: data.accessCode !== undefined ? data.accessCode : prev.accessCode,
        inviteToken: data.inviteToken !== undefined ? data.inviteToken : prev.inviteToken,
      }));
    };

    const handleRoomLeft = () => {
      console.log('useRoomState: room_left event received, navigating to lobby');
      const currentRoomId = roomState.roomId;
      setRoomState({
        roomId: null,
        members: [],
        hostId: null,
        ownerId: null,
        isHost: false,
        playerCount: 0,
        teamAssignment: null,
        timerEnabled: false,
        accessCode: null,
        inviteToken: null,
      });
      setInMatchmaking(false);
      
      // Clear reconnect token for this room when leaving
      // Use guestId for reconnect token (that's the key used when storing it)
      const tokenPlayerId = guestId || currentUserId;
      if (currentRoomId && tokenPlayerId) {
        clearReconnectToken(currentRoomId, tokenPlayerId);
      }
      
      // Navigate back to lobby
      if (onLeave) {
        onLeave();
      }
    };

    const handleYouWereKicked = () => {
      setError('You were kicked from the room');
      handleRoomLeft();
      // Navigate back to lobby (handleRoomLeft already calls onLeave)
    };

    const handleHostChanged = (data: { newHostId: string }) => {
      setRoomState(prev => ({ ...prev, hostId: data.newHostId }));
    };

    const handleRoleChanged = (data: { userId: string; newRole: RoomRole }) => {
      setRoomState(prev => ({
        ...prev,
        members: prev.members.map(m =>
          m.userId === data.userId ? { ...m, roleInRoom: data.newRole } : m
        ),
      }));
    };

    const handleMemberKicked = (data: { userId: string }) => {
      setRoomState(prev => ({
        ...prev,
        members: prev.members.filter(m => m.userId !== data.userId),
      }));
    };

    const handleMemberLeft = (data: { userId: string }) => {
      setRoomState(prev => ({
        ...prev,
        members: prev.members.filter(m => m.userId !== data.userId),
      }));
    };

    // Team events
    const handleTeamsUpdated = (data: { teams: { team0: string[]; team1: string[] } }) => {
      setRoomState(prev => ({ ...prev, teamAssignment: data.teams }));
    };

    // Matchmaking events
    const handleQueueJoined = () => {
      setInMatchmaking(true);
      setError(null);
    };

    const handleQueueLeft = () => {
      setInMatchmaking(false);
    };

    const handleQueueCancelled = (data: { reason: string; message: string }) => {
      setInMatchmaking(false);
      setError(`Matchmaking zaustavljen: ${data.message}`);
    };

    const handleMatchFound = (data: { roomId: string }) => {
      setInMatchmaking(false);
      // Room update will handle the rest
    };

    // Invite events
    const handleInviteReceived = (invite: PendingInvite) => {
      setPendingInvites(prev => [...prev, invite]);
    };

    const handleInviteCancelled = (data: { inviteId: string; reason: string }) => {
      setPendingInvites(prev => prev.filter(inv => inv.inviteId !== data.inviteId));
      if (data.reason === 'ROOM_DELETED') {
        setError('Poziv otkazan: Soba je obrisana');
      }
    };

    const handlePendingInvites = (data: { invites: PendingInvite[] }) => {
      setPendingInvites(data.invites);
    };

    // Error events
    const handleRoomError = (data: { reason: string; message?: string }) => {
      setError(data.message || data.reason);
    };

    const handleInviteError = (data: { reason: string; message: string }) => {
      setError(`Greška pri pozivu: ${data.message}`);
    };

    const handleTeamError = (data: { reason: string; message: string }) => {
      setError(`Greška sa timom: ${data.message}`);
    };

    const handleStartError = (data: { reason: string; message: string }) => {
      setError(`Greška pri pokretanju: ${data.message}`);
    };

    // Register all listeners
    socket.on('room_created', handleRoomCreated);
    socket.on('room_update', handleRoomUpdate);
    socket.on('room_left', handleRoomLeft);
    socket.on('you_were_kicked', handleYouWereKicked);
    socket.on('host_changed', handleHostChanged);
    socket.on('role_changed', handleRoleChanged);
    socket.on('member_kicked', handleMemberKicked);
    socket.on('member_left', handleMemberLeft);
    socket.on('teams_updated', handleTeamsUpdated);
    socket.on('queue_joined', handleQueueJoined);
    socket.on('queue_left', handleQueueLeft);
    socket.on('queue_cancelled', handleQueueCancelled);
    socket.on('match_found', handleMatchFound);
    socket.on('invite_received', handleInviteReceived);
    socket.on('invite_cancelled', handleInviteCancelled);
    socket.on('pending_invites', handlePendingInvites);
    socket.on('room_error', handleRoomError);
    socket.on('invite_error', handleInviteError);
    socket.on('team_error', handleTeamError);
    socket.on('start_error', handleStartError);

    // Request pending invites on mount
    socket.emit('get_pending_invites');

    // Cleanup
    return () => {
      socket.off('room_created', handleRoomCreated);
      socket.off('room_update', handleRoomUpdate);
      socket.off('room_left', handleRoomLeft);
      socket.off('you_were_kicked', handleYouWereKicked);
      socket.off('host_changed', handleHostChanged);
      socket.off('role_changed', handleRoleChanged);
      socket.off('member_kicked', handleMemberKicked);
      socket.off('member_left', handleMemberLeft);
      socket.off('teams_updated', handleTeamsUpdated);
      socket.off('queue_joined', handleQueueJoined);
      socket.off('queue_left', handleQueueLeft);
      socket.off('queue_cancelled', handleQueueCancelled);
      socket.off('match_found', handleMatchFound);
      socket.off('invite_received', handleInviteReceived);
      socket.off('invite_cancelled', handleInviteCancelled);
      socket.off('pending_invites', handlePendingInvites);
      socket.off('room_error', handleRoomError);
      socket.off('invite_error', handleInviteError);
      socket.off('team_error', handleTeamError);
      socket.off('start_error', handleStartError);
    };
  }, [socket]);

  // Actions
  const sendInvite = useCallback((friendId: string) => {
    if (!socket) return;
    socket.emit('send_invite', { friendId });
  }, [socket]);

  const acceptInvite = useCallback((inviteId: string) => {
    if (!socket) return;
    socket.emit('accept_invite', { inviteId });
    // Remove from pending list optimistically
    setPendingInvites(prev => prev.filter(inv => inv.inviteId !== inviteId));
  }, [socket]);

  const declineInvite = useCallback((inviteId: string) => {
    if (!socket) return;
    socket.emit('decline_invite', { inviteId });
    setPendingInvites(prev => prev.filter(inv => inv.inviteId !== inviteId));
  }, [socket]);

  const leaveRoom = useCallback((roomId?: string) => {
    if (!socket) return;
    const targetRoomId = roomId || roomState.roomId;
    if (!targetRoomId) return;
    console.log('useRoomState: Emitting leave_room_member for roomId:', targetRoomId);
    socket.emit('leave_room_member', { roomId: targetRoomId });
  }, [socket, roomState.roomId]);

  const kickMember = useCallback((targetUserId: string) => {
    if (!socket || !roomState.roomId) return;
    socket.emit('kick_member', { roomId: roomState.roomId, targetUserId });
  }, [socket, roomState.roomId]);

  const setMemberRole = useCallback((targetUserId: string, role: RoomRole) => {
    if (!socket || !roomState.roomId) return;
    socket.emit('set_member_role', { roomId: roomState.roomId, targetUserId, role });
  }, [socket, roomState.roomId]);

  const setTeamAssignment = useCallback((team0: string[], team1: string[]) => {
    if (!socket || !roomState.roomId) return;
    socket.emit('set_team_assignment', { roomId: roomState.roomId, team0, team1 });
  }, [socket, roomState.roomId]);

  const start1v1 = useCallback(() => {
    if (!socket || !roomState.roomId) return;
    socket.emit('start_1v1', { roomId: roomState.roomId });
  }, [socket, roomState.roomId]);

  const start2v2Random = useCallback(() => {
    if (!socket || !roomState.roomId) return;
    socket.emit('start_2v2_random', { roomId: roomState.roomId });
  }, [socket, roomState.roomId]);

  const start2v2Party = useCallback(() => {
    if (!socket || !roomState.roomId) return;
    socket.emit('start_2v2_party', { roomId: roomState.roomId });
  }, [socket, roomState.roomId]);

  const cancelMatchmaking = useCallback(() => {
    if (!socket || !roomState.roomId) return;
    socket.emit('cancel_party_queue', { roomId: roomState.roomId });
  }, [socket, roomState.roomId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const toggleTimer = useCallback((enabled: boolean) => {
    if (!socket || !roomState.roomId) return;
    socket.emit('toggle_timer', { roomId: roomState.roomId, enabled });
    // Optimistically update local state
    setRoomState(prev => ({ ...prev, timerEnabled: enabled }));
  }, [socket, roomState.roomId]);

  return {
    roomState,
    pendingInvites,
    error,
    inMatchmaking,
    actions: {
      sendInvite,
      acceptInvite,
      declineInvite,
      leaveRoom,
      kickMember,
      setMemberRole,
      setTeamAssignment,
      start1v1,
      start2v2Random,
      start2v2Party,
      cancelMatchmaking,
      clearError,
      toggleTimer,
    },
  };
}
