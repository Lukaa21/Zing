import React, { useState } from 'react';
import { PendingInvite } from '../hooks/useRoomState';
import '../styles/InviteModal.css';

interface InviteModalProps {
  invites: PendingInvite[];
  currentRoomId: string | null;
  onAccept: (inviteId: string) => void;
  onDecline: (inviteId: string) => void;
}

const InviteModal: React.FC<InviteModalProps> = ({
  invites,
  currentRoomId,
  onAccept,
  onDecline,
}) => {
  const [showLeaveConfirm, setShowLeaveConfirm] = useState<string | null>(null);

  const handleAccept = (inviteId: string) => {
    if (currentRoomId) {
      // User is already in a room, show confirmation
      setShowLeaveConfirm(inviteId);
    } else {
      // Not in a room, accept directly
      onAccept(inviteId);
    }
  };

  const confirmLeaveAndAccept = (inviteId: string) => {
    onAccept(inviteId);
    setShowLeaveConfirm(null);
  };

  const cancelLeave = () => {
    setShowLeaveConfirm(null);
  };

  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date().getTime();
    const expiry = new Date(expiresAt).getTime();
    const diff = expiry - now;

    if (diff <= 0) return 'Expired';

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  if (invites.length === 0) return null;

  return (
    <div className="invite-modal-overlay">
      <div className="invite-modal">
        <div className="invite-modal__header">
          <h3>Room Invites ({invites.length})</h3>
        </div>

        <div className="invite-modal__list">
          {invites.map(invite => (
            <div key={invite.inviteId} className="invite-item">
              <div className="invite-item__info">
                <p className="invite-item__inviter">
                  <strong>{invite.inviterUsername}</strong> invited you to a room
                </p>
                <p className="invite-item__room">
                  Room: {invite.roomId}
                </p>
                <p className="invite-item__expiry">
                  Expires in: {formatTimeRemaining(invite.expiresAt)}
                </p>
              </div>

              <div className="invite-item__actions">
                <button
                  className="invite-item__btn invite-item__btn--accept"
                  onClick={() => handleAccept(invite.inviteId)}
                >
                  Accept
                </button>
                <button
                  className="invite-item__btn invite-item__btn--decline"
                  onClick={() => onDecline(invite.inviteId)}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Leave Confirmation Dialog */}
        {showLeaveConfirm && (
          <div className="invite-modal__confirm-overlay">
            <div className="invite-modal__confirm">
              <h4>Leave Current Room?</h4>
              <p>You are currently in a room. Do you want to leave and accept this invite?</p>
              <div className="invite-modal__confirm-actions">
                <button
                  className="invite-modal__confirm-btn invite-modal__confirm-btn--yes"
                  onClick={() => confirmLeaveAndAccept(showLeaveConfirm)}
                >
                  Yes, Leave and Join
                </button>
                <button
                  className="invite-modal__confirm-btn invite-modal__confirm-btn--no"
                  onClick={cancelLeave}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InviteModal;
