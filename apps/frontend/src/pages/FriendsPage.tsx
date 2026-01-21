import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getFriends,
  getFriendsStatus,
  getFriendRequests,
  getSentRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  Friend,
  FriendWithStatus,
  FriendRequest,
  SentRequest,
} from '../services/friends';
import { getSocket } from '../services/socket';
import { setReconnectToken } from '../utils/guest';
import '../styles/FriendsPage.css';

export default function FriendsPage() {
  const { authUser, token } = useAuth();
  const navigate = useNavigate();

  const [friends, setFriends] = useState<FriendWithStatus[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<SentRequest[]>([]);
  const [gameInvites, setGameInvites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [addFriendUsername, setAddFriendUsername] = useState('');
  const [addFriendError, setAddFriendError] = useState<string | null>(null);
  const [addFriendSuccess, setAddFriendSuccess] = useState(false);

  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'sent' | 'invites'>('friends');

  // Redirect if not logged in
  useEffect(() => {
    if (!authUser || !token) {
      navigate('/');
    }
  }, [authUser, token, navigate]);

  // Load data
  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  // Listen for online/offline events and game invites
  useEffect(() => {
    const s = getSocket();
    if (!s) return;

    const handleUserOnline = (data: { userId: string }) => {
      setFriends((prev) =>
        prev.map((f) =>
          f.friendId === data.userId ? { ...f, isOnline: true } : f
        )
      );
    };

    const handleUserOffline = (data: { userId: string }) => {
      setFriends((prev) =>
        prev.map((f) =>
          f.friendId === data.userId ? { ...f, isOnline: false } : f
        )
      );
    };

    const handleInviteReceived = (data: any) => {
      setGameInvites((prev) => [data, ...prev]);
    };

    const handlePendingInvites = (data: { invites: any[] }) => {
      setGameInvites(data.invites);
    };

    const handleInviteAccepted = (data: { inviteId: string; roomId: string; reconnectToken?: string; inviteToken?: string }) => {
      console.log('[FRIENDS] invite_accepted received:', data);
      // Remove from local list
      setGameInvites((prev) => prev.filter(inv => inv.inviteId !== data.inviteId));
      // Save room ID
      sessionStorage.setItem('zing_current_room', data.roomId);
      // Save invite token for joining
      if (data.inviteToken) {
        console.log('[FRIENDS] Saving inviteToken to sessionStorage:', data.inviteToken);
        sessionStorage.setItem('zing_current_invite_token', data.inviteToken);
      } else {
        console.warn('[FRIENDS] No inviteToken in response!');
      }
      // Save reconnect token using playerId
      if (data.reconnectToken && authUser?.id) {
        setReconnectToken(data.roomId, data.reconnectToken, authUser.id);
      }
      // Navigate to room
      console.log('[FRIENDS] Navigating to /room');
      navigate('/room');
    };

    const handleInviteDeclined = (data: { inviteId: string }) => {
      // Remove from local list
      setGameInvites((prev) => prev.filter(inv => inv.inviteId !== data.inviteId));
    };

    s.on('user_online', handleUserOnline);
    s.on('user_offline', handleUserOffline);
    s.on('invite_received', handleInviteReceived);
    s.on('pending_invites', handlePendingInvites);
    s.on('invite_accepted', handleInviteAccepted);
    s.on('invite_declined', handleInviteDeclined);

    // Request pending invites on mount
    s.emit('get_pending_invites');

    return () => {
      s.off('user_online', handleUserOnline);
      s.off('user_offline', handleUserOffline);
      s.off('invite_received', handleInviteReceived);
      s.off('pending_invites', handlePendingInvites);
      s.off('invite_accepted', handleInviteAccepted);
      s.off('invite_declined', handleInviteDeclined);
    };
  }, [navigate]);

  const loadData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const [friendsData, requestsData, sentData] = await Promise.all([
        getFriendsStatus(token),
        getFriendRequests(token),
        getSentRequests(token),
      ]);

      setFriends(friendsData.friends);
      setRequests(requestsData.requests);
      setSentRequests(sentData.requests);
    } catch (err: any) {
      setError(err.message || 'Failed to load friends data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !addFriendUsername.trim()) return;

    try {
      setAddFriendError(null);
      setAddFriendSuccess(false);

      await sendFriendRequest(addFriendUsername.trim(), token);
      setAddFriendSuccess(true);
      setAddFriendUsername('');

      // Reload data to show the new sent request
      await loadData();

      // Clear success message after 3 seconds
      setTimeout(() => setAddFriendSuccess(false), 3000);
    } catch (err: any) {
      setAddFriendError(err.message || 'Failed to send friend request');
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    if (!token) return;

    try {
      await acceptFriendRequest(requestId, token);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to accept friend request');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    if (!token) return;

    try {
      await rejectFriendRequest(requestId, token);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to reject friend request');
    }
  };

  const handleRemoveFriend = async (friendshipId: string) => {
    if (!token) return;

    const confirmed = window.confirm('Da li si siguran da želiš ukloniti ovog prijatelja?');
    if (!confirmed) return;

    try {
      await removeFriend(friendshipId, token);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to remove friend');
    }
  };

  const handleAcceptInvite = (inviteId: string) => {
    const s = getSocket();
    if (!s) return;
    s.emit('accept_invite', { inviteId });
  };

  const handleDeclineInvite = (inviteId: string) => {
    const s = getSocket();
    if (!s) return;
    s.emit('decline_invite', { inviteId });
  };

  if (!authUser || !token) {
    return null;
  }

  return (
    <div className="friends-page">
      <div className="friends-header">
        <h1>Prijatelji</h1>
        <button onClick={() => navigate('/lobby')} className="friends-back-btn">
          ← Nazad na Lobby
        </button>
      </div>

      {/* Add Friend Form */}
      <div className="add-friend-section">
        <h2>Dodaj Prijatelja</h2>
        <form onSubmit={handleAddFriend} className="add-friend-form">
          <input
            type="text"
            value={addFriendUsername}
            onChange={(e) => setAddFriendUsername(e.target.value)}
            placeholder="Unesi korisničko ime"
            className="add-friend-input"
          />
          <button
            type="submit"
            disabled={!addFriendUsername.trim()}
            className="add-friend-submit"
          >
            Pošalji Zahtjev
          </button>
        </form>
        {addFriendError && (
          <p className="add-friend-error">{addFriendError}</p>
        )}
        {addFriendSuccess && (
          <p className="add-friend-success">Zahtjev za prijateljstvo poslat!</p>
        )}
      </div>

      {/* Tabs */}
      <div className="friends-tabs">
        <button
          onClick={() => setActiveTab('friends')}
          className={`friends-tab ${activeTab === 'friends' ? 'active' : ''}`}
        >
          Prijatelji ({friends.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`friends-tab ${activeTab === 'requests' ? 'active' : ''}`}
        >
          Zahtjevi ({requests.length})
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`friends-tab ${activeTab === 'sent' ? 'active' : ''}`}
        >
          Poslati ({sentRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('invites')}
          className={`friends-tab ${activeTab === 'invites' ? 'active' : ''}`}
        >
          Pozivi za Igru ({gameInvites.length})
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="friends-error">{error}</div>}

      {/* Loading State */}
      {loading && <p className="friends-loading">Učitavam...</p>}

      {/* Friends List */}
      {!loading && activeTab === 'friends' && (
        <div className="friends-content-section">
          <h2>Tvoji Prijatelji</h2>
          {friends.length === 0 ? (
            <p className="friends-empty">Još nemaš prijatelja. Dodaj ih koristeći formu iznad!</p>
          ) : (
            <div className="friends-list">
              {friends.map((friend) => (
                <div key={friend.id} className="friend-card">
                  <div className="friend-card-info">
                    {friend.isOnline && <div className="friend-online-indicator" />}
                    <div className="friend-details">
                      <strong>{friend.username}</strong>
                      <p>Prijatelji od {new Date(friend.since).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFriend(friend.id)}
                    className="friend-remove-btn"
                  >
                    Ukloni
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Friend Requests */}
      {!loading && activeTab === 'requests' && (
        <div className="friends-content-section">
          <h2>Zahtjevi za Prijateljstvo</h2>
          {requests.length === 0 ? (
            <p className="friends-empty">Nema zahtjeva na čekanju.</p>
          ) : (
            <div className="friends-list">
              {requests.map((request) => (
                <div key={request.id} className="request-card">
                  <div className="request-details">
                    <strong>{request.username}</strong>
                    <p>Poslato {new Date(request.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="request-actions">
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="friend-accept-btn"
                    >
                      Prihvati
                    </button>
                    <button
                      onClick={() => handleRejectRequest(request.id)}
                      className="friend-reject-btn"
                    >
                      Odbij
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sent Requests */}
      {!loading && activeTab === 'sent' && (
        <div className="friends-content-section">
          <h2>Poslati Zahtjevi</h2>
          {sentRequests.length === 0 ? (
            <p className="friends-empty">Nema poslatih zahtjeva na čekanju.</p>
          ) : (
            <div className="friends-list">
              {sentRequests.map((request) => (
                <div key={request.id} className="sent-request-card">
                  <div className="request-details">
                    <strong>{request.username}</strong>
                    <p>Poslato {new Date(request.createdAt).toLocaleDateString()}</p>
                    <p className="pending">Čekam odgovor...</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Game Invites */}
      {!loading && activeTab === 'invites' && (
        <div className="friends-content-section">
          <h2>Pozivi za Igru</h2>
          {gameInvites.length === 0 ? (
            <p className="friends-empty">Nema poziva za igru na čekanju.</p>
          ) : (
            <div className="friends-list">
              {gameInvites.map((invite) => (
                <div key={invite.inviteId} className="request-card">
                  <div className="request-details">
                    <strong>{invite.inviterUsername}</strong>
                    <p>Pozvao te da igraš • {new Date(invite.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="request-actions">
                    <button
                      onClick={() => handleAcceptInvite(invite.inviteId)}
                      className="friend-accept-btn"
                    >
                      Prihvati
                    </button>
                    <button
                      onClick={() => handleDeclineInvite(invite.inviteId)}
                      className="friend-reject-btn"
                    >
                      Odbij
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
