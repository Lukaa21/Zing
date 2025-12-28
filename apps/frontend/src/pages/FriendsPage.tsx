import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getFriends,
  getFriendRequests,
  getSentRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  Friend,
  FriendRequest,
  SentRequest,
} from '../services/friends';

export default function FriendsPage() {
  const { authUser, token } = useAuth();
  const navigate = useNavigate();

  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<SentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [addFriendUsername, setAddFriendUsername] = useState('');
  const [addFriendError, setAddFriendError] = useState<string | null>(null);
  const [addFriendSuccess, setAddFriendSuccess] = useState(false);

  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'sent'>('friends');

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

  const loadData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const [friendsData, requestsData, sentData] = await Promise.all([
        getFriends(token),
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

    const confirmed = window.confirm('Are you sure you want to remove this friend?');
    if (!confirmed) return;

    try {
      await removeFriend(friendshipId, token);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to remove friend');
    }
  };

  if (!authUser || !token) {
    return null;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Friends</h1>
        <button
          onClick={() => navigate('/lobby')}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
          }}
        >
          ← Back to Lobby
        </button>
      </div>

      {/* Add Friend Form */}
      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>Add Friend</h2>
        <form onSubmit={handleAddFriend}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={addFriendUsername}
              onChange={(e) => setAddFriendUsername(e.target.value)}
              placeholder="Enter username"
              style={{
                flex: 1,
                padding: '0.5rem',
                fontSize: '1rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            <button
              type="submit"
              disabled={!addFriendUsername.trim()}
              style={{
                padding: '0.5rem 1.5rem',
                fontSize: '1rem',
                cursor: addFriendUsername.trim() ? 'pointer' : 'not-allowed',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: addFriendUsername.trim() ? '#007bff' : '#ccc',
                color: '#fff',
              }}
            >
              Send Request
            </button>
          </div>
          {addFriendError && (
            <p style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.9rem' }}>
              {addFriendError}
            </p>
          )}
          {addFriendSuccess && (
            <p style={{ color: 'green', marginTop: '0.5rem', fontSize: '0.9rem' }}>
              Friend request sent!
            </p>
          )}
        </form>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('friends')}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: activeTab === 'friends' ? '#007bff' : '#fff',
            color: activeTab === 'friends' ? '#fff' : '#000',
          }}
        >
          Friends ({friends.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: activeTab === 'requests' ? '#007bff' : '#fff',
            color: activeTab === 'requests' ? '#fff' : '#000',
          }}
        >
          Requests ({requests.length})
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: activeTab === 'sent' ? '#007bff' : '#fff',
            color: activeTab === 'sent' ? '#fff' : '#000',
          }}
        >
          Sent ({sentRequests.length})
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
          }}
        >
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Friends List */}
      {!loading && activeTab === 'friends' && (
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Your Friends</h2>
          {friends.length === 0 ? (
            <p style={{ color: '#666' }}>You don't have any friends yet. Add some using the form above!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '1.1rem' }}>{friend.username}</strong>
                    <p style={{ color: '#666', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
                      Friends since {new Date(friend.since).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFriend(friend.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      border: '1px solid #dc3545',
                      backgroundColor: '#fff',
                      color: '#dc3545',
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Friend Requests */}
      {!loading && activeTab === 'requests' && (
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Friend Requests</h2>
          {requests.length === 0 ? (
            <p style={{ color: '#666' }}>No pending friend requests.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {requests.map((request) => (
                <div
                  key={request.id}
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '1.1rem' }}>{request.username}</strong>
                    <p style={{ color: '#666', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
                      Sent {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#28a745',
                        color: '#fff',
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectRequest(request.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        border: '1px solid #dc3545',
                        backgroundColor: '#fff',
                        color: '#dc3545',
                      }}
                    >
                      Reject
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
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Sent Requests</h2>
          {sentRequests.length === 0 ? (
            <p style={{ color: '#666' }}>No pending sent requests.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {sentRequests.map((request) => (
                <div
                  key={request.id}
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '1rem',
                  }}
                >
                  <strong style={{ fontSize: '1.1rem' }}>{request.username}</strong>
                  <p style={{ color: '#666', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
                    Sent {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                  <p style={{ color: '#999', fontSize: '0.8rem', fontStyle: 'italic', margin: '0.25rem 0 0 0' }}>
                    Waiting for response...
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
