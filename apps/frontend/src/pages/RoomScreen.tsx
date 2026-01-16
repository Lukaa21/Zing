import React, { useState } from 'react';
import { useRoomState } from '../hooks/useRoomState';
import { getSocket } from '../services/socket';
import { useAuth } from '../context/AuthContext';
import InviteModal from '../components/InviteModal';
import TeamSelectionModal from '../components/TeamSelectionModal';
import FriendInvitePanel from '../components/FriendInvitePanel';
import '../styles/RoomScreen.css';

interface RoomScreenProps {
  roomId: string;
  myId: string | null;
  guestId: string;
  playerName: string;
  initialPlayers?: any[];
  initialOwnerId?: string | null;
  onLeave?: () => void;
}

const RoomScreen: React.FC<RoomScreenProps> = ({ roomId, myId, guestId, playerName, initialPlayers, initialOwnerId, onLeave }) => {
  const socket = getSocket();
  const { authUser } = useAuth();
  const { roomState, pendingInvites, error, inMatchmaking, actions } = useRoomState({
    socket,
    currentUserId: myId,
    guestId,
    initialRoomId: roomId,
    initialPlayers,
    initialOwnerId,
    onLeave,
  });

  const [showTeamSelection, setShowTeamSelection] = useState(false);
  const [showInvitePanel, setShowInvitePanel] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Get room credentials from roomState (backend sends these to all players)
  const accessCode = roomState.accessCode;
  const inviteToken = roomState.inviteToken;
  const inviteLink = inviteToken 
    ? `${window.location.origin}?room=${roomId}&invite=${inviteToken}`
    : null;

  const handleCopyCode = () => {
    if (accessCode) {
      navigator.clipboard.writeText(accessCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const canStart1v1 = roomState.isHost && roomState.playerCount === 2 && !inMatchmaking;
  const canStart2v2Random = roomState.isHost && roomState.playerCount === 2 && !inMatchmaking;
  const canStart2v2Party = roomState.isHost && roomState.playerCount === 4 && !inMatchmaking;

  const handleStart1v1 = () => {
    actions.start1v1();
  };

  const handleStart2v2Random = () => {
    actions.start2v2Random();
  };

  const handleStart2v2Party = () => {
    // If teams not assigned yet, open team selection modal
    if (!roomState.teamAssignment) {
      setShowTeamSelection(true);
    } else {
      // Teams already assigned, start the game
      actions.start2v2Party();
    }
  };

  const handleTeamsConfirmed = (team0: string[], team1: string[]) => {
    actions.setTeamAssignment(team0, team1);
    setShowTeamSelection(false);
    // Don't auto-start here - let user click start button after teams are set
    // The teams_updated event will be received and state will update
  };

  return (
    <div className="room-screen">
      {/* Error Display */}
      {error && (
        <div className="room-screen__error">
          <span>{error}</span>
          <button onClick={actions.clearError}>✕</button>
        </div>
      )}

      {/* Matchmaking Status */}
      {inMatchmaking && (
        <div className="room-screen__matchmaking">
          <p>Searching for match...</p>
          {roomState.isHost && (
            <button onClick={actions.cancelMatchmaking}>Cancel</button>
          )}
        </div>
      )}

      {/* Room Header */}
      <div className="room-screen__header">
        <div>
          <h2>Room {roomId}</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>Playing as: {playerName}</p>
        </div>
        {authUser && (
          <button 
            className="room-screen__invite-btn"
            onClick={() => setShowInvitePanel(!showInvitePanel)}
          >
            Invite Friends
          </button>
        )}
      </div>

      {/* Room Credentials - Show if available (creator of private room) */}
      {(accessCode || inviteLink) && (
        <div className="room-screen__credentials">
          <h3>Share with Friends</h3>
          
          {accessCode && (
            <div className="credential-item">
              <label className="credential-label">Access Code</label>
              <div className="credential-row">
                <input
                  type="text"
                  className="credential-input"
                  value={accessCode}
                  readOnly
                />
                <div className="credential-copy-wrapper">
                  <img 
                    src="/src/media/copy.png" 
                    alt="Copy" 
                    className="credential-copy-icon"
                    onClick={handleCopyCode}
                  />
                  {copiedCode && (
                    <div className="credential-tooltip">Copied to clipboard!</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {inviteLink && (
            <div className="credential-item">
              <label className="credential-label">Invite Link</label>
              <div className="credential-row">
                <input
                  type="text"
                  className="credential-input"
                  value={inviteLink}
                  readOnly
                />
                <div className="credential-copy-wrapper">
                  <img 
                    src="/src/media/copy.png" 
                    alt="Copy" 
                    className="credential-copy-icon"
                    onClick={handleCopyLink}
                  />
                  {copiedLink && (
                    <div className="credential-tooltip">Copied to clipboard!</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Member List */}
      <div className="room-screen__members">
        <h3>Members ({roomState.members.length})</h3>
        <ul className="member-list">
          {roomState.members.map(member => (
            <li key={member.userId} className="member-list__item">
              <div className="member-list__info">
                <span className="member-list__name">{member.name}</span>
                {member.userId === roomState.hostId && (
                  <span className="member-list__badge member-list__badge--host">HOST</span>
                )}
                <span className={`member-list__badge member-list__badge--${member.roleInRoom.toLowerCase()}`}>
                  {member.roleInRoom}
                </span>
              </div>
              
              {/* Host Controls */}
              {roomState.isHost && member.userId !== myId && (
                <div className="member-list__controls">
                  <button
                    className="member-list__btn member-list__btn--role"
                    onClick={() => actions.setMemberRole(
                      member.userId,
                      member.roleInRoom === 'PLAYER' ? 'SPECTATOR' : 'PLAYER'
                    )}
                  >
                    {member.roleInRoom === 'PLAYER' ? 'Make Spectator' : 'Make Player'}
                  </button>
                  <button
                    className="member-list__btn member-list__btn--kick"
                    onClick={() => {
                      if (window.confirm(`Kick ${member.name}?`)) {
                        actions.kickMember(member.userId);
                      }
                    }}
                  >
                    Kick
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Host Start Controls */}
      {roomState.isHost && (
        <div className="room-screen__start-controls">
          <h3>Game Options</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={roomState.timerEnabled || false}
                onChange={(e) => actions.toggleTimer(e.target.checked)}
              />
              <span>Enable turn timer (12s per turn)</span>
            </label>
          </div>
          <h3>Start Game</h3>
          <div className="start-controls__buttons">
            <button
              className="start-controls__btn"
              disabled={!canStart1v1}
              onClick={handleStart1v1}
              title={!canStart1v1 ? 'Need exactly 2 players' : ''}
            >
              1v1
            </button>
            <button
              className="start-controls__btn"
              disabled={!canStart2v2Random}
              onClick={handleStart2v2Random}
              title={!canStart2v2Random ? 'Need exactly 2 players' : ''}
            >
              2v2 Random
            </button>
            <button
              className="start-controls__btn"
              disabled={!canStart2v2Party}
              onClick={handleStart2v2Party}
              title={!canStart2v2Party ? 'Need exactly 4 players' : ''}
            >
              {roomState.teamAssignment ? 'Start 2v2 Party' : '2v2 Party (Set Teams)'}
            </button>
          </div>
          {roomState.playerCount !== 2 && roomState.playerCount !== 4 && (
            <p className="start-controls__hint">
              Need 2 or 4 players to start. Current: {roomState.playerCount}
            </p>
          )}
          {roomState.teamAssignment && (
            <p className="start-controls__hint" style={{ color: '#4CAF50' }}>
              ✓ Teams assigned: Team 0 ({roomState.teamAssignment.team0.length}) vs Team 1 ({roomState.teamAssignment.team1.length})
            </p>
          )}
        </div>
      )}

      {/* Leave Room Button */}
      <div className="room-screen__actions">
        <button
          className="room-screen__leave-btn"
          onClick={() => {
            if (window.confirm('Leave this room?')) {
              actions.leaveRoom(roomId);
            }
          }}
        >
          Leave Room
        </button>
      </div>

      {/* Invite Modal */}
      {pendingInvites.length > 0 && (
        <InviteModal
          invites={pendingInvites}
          currentRoomId={roomId}
          onAccept={actions.acceptInvite}
          onDecline={actions.declineInvite}
        />
      )}

      {/* Team Selection Modal */}
      {showTeamSelection && (
        <TeamSelectionModal
          members={roomState.members.filter(m => m.roleInRoom === 'PLAYER')}
          onConfirm={handleTeamsConfirmed}
          onCancel={() => setShowTeamSelection(false)}
        />
      )}

      {/* Friend Invite Panel */}
      {showInvitePanel && (
        <FriendInvitePanel
          currentRoomId={roomId}
          currentMembers={roomState.members}
          onSendInvite={actions.sendInvite}
          onClose={() => setShowInvitePanel(false)}
        />
      )}
    </div>
  );
};

export default RoomScreen;
