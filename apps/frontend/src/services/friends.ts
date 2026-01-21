const API_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api`;

export interface Friend {
  id: string;
  friendId: string;
  username: string;
  since: string;
}

export interface FriendWithStatus extends Friend {
  isOnline: boolean;
}

export interface FriendRequest {
  id: string;
  requesterId: string;
  username: string;
  createdAt: string;
}

export interface SentRequest {
  id: string;
  addresseeId: string;
  username: string;
  createdAt: string;
}

// Send friend request by username
export async function sendFriendRequest(username: string, token: string) {
  const response = await fetch(`${API_URL}/friends/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send friend request');
  }

  return response.json();
}

// Get all friends
export async function getFriends(token: string): Promise<{ friends: Friend[] }> {
  const response = await fetch(`${API_URL}/friends`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get friends');
  }

  return response.json();
}

// Get friend status (includes online/offline info)
export async function getFriendsStatus(token: string): Promise<{ friends: FriendWithStatus[] }> {
  const response = await fetch(`${API_URL}/friends/status`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get friend status');
  }

  return response.json();
}

// Get pending friend requests (received)
export async function getFriendRequests(token: string): Promise<{ requests: FriendRequest[] }> {
  const response = await fetch(`${API_URL}/friends/requests`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get friend requests');
  }

  return response.json();
}

// Get sent friend requests
export async function getSentRequests(token: string): Promise<{ requests: SentRequest[] }> {
  const response = await fetch(`${API_URL}/friends/sent`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get sent requests');
  }

  return response.json();
}

// Accept friend request
export async function acceptFriendRequest(requestId: string, token: string) {
  const response = await fetch(`${API_URL}/friends/${requestId}/accept`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to accept friend request');
  }

  return response.json();
}

// Reject friend request
export async function rejectFriendRequest(requestId: string, token: string) {
  const response = await fetch(`${API_URL}/friends/${requestId}/reject`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to reject friend request');
  }

  return response.json();
}

// Remove friend (unfriend)
export async function removeFriend(friendshipId: string, token: string) {
  const response = await fetch(`${API_URL}/friends/${friendshipId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to remove friend');
  }

  return response.json();
}
