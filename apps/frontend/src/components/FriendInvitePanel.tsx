import React, { useState, useEffect } from 'react';
import { getSocket } from '../services/socket';
import { getFriendsStatus, FriendWithStatus } from '../services/friends';
import { useAuth } from '../context/AuthContext';
import '../styles/FriendInvitePanel.css';

interface FriendInvitePanelProps {
  currentRoomId: string;
  currentMembers?: Array<{ userId: string }>; // Members already in the room
  onSendInvite: (friendId: string) => void;
  onClose: () => void;
}

const FriendInvitePanel: React.FC<FriendInvitePanelProps> = ({
  currentRoomId,
  currentMembers = [],
  onSendInvite,
  onClose,
}) => {
  const { token } = useAuth();
  const [friends, setFriends] = useState<FriendWithStatus[]>([]);
  const [sentInvites, setSentInvites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFriends = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getFriendsStatus(token);
        setFriends(data.friends || []);
      } catch (error) {
        console.error('Failed to load friends:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFriends();
  }, [token]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleInviteSent = (data: { friendId: string; inviteId: string }) => {
      setSentInvites(prev => new Set(prev).add(data.friendId));
    };

    const handleInviteError = (data: { reason: string; message: string }) => {
      // Error already handled by useRoomState
      console.error('Invite error:', data.message);
    };

    socket.on('invite_sent', handleInviteSent);
    socket.on('invite_error', handleInviteError);

    return () => {
      socket.off('invite_sent', handleInviteSent);
      socket.off('invite_error', handleInviteError);
    };
  }, []);

  const handleSendInvite = (friendId: string) => {
    onSendInvite(friendId);
    setSentInvites(prev => new Set(prev).add(friendId));
  };

  // Filter online friends, excluding those already in the room
  const memberIds = new Set(currentMembers.map(m => m.userId));
  const onlineFriends = friends.filter(f => f.isOnline && !memberIds.has(f.friendId));

  return (
    <div className="friend-panel-overlay" onClick={onClose}>
      <div className="friend-panel" onClick={e => e.stopPropagation()}>
        <div className="friend-panel__header">
          <h3>Pozovi prijatelje</h3>
          <button className="friend-panel__close" onClick={onClose}>✕</button>
        </div>

        {loading ? (
          <div className="friend-panel__loading">Učitavanje prijatelja...</div>
        ) : onlineFriends.length === 0 ? (
          <div className="friend-panel__empty">
            Nema online prijatelja za pozvati
          </div>
        ) : (
          <ul className="friend-panel__list">
            {onlineFriends.map(friend => {
              const inviteSent = sentInvites.has(friend.friendId);
              return (
                <li key={friend.friendId} className="friend-panel__item">
                  <div className="friend-panel__info">
                    <span className="friend-panel__name">{friend.username}</span>
                    <span className="friend-panel__status friend-panel__status--online">
                      online
                    </span>
                  </div>
                  <button
                    className="friend-panel__invite-btn"
                    onClick={() => handleSendInvite(friend.friendId)}
                    disabled={inviteSent}
                  >
                    {inviteSent ? 'Invited' : 'Invite'}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FriendInvitePanel;
