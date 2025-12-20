/**
 * Guest identity utilities for localStorage management
 */

/**
 * Generate a random UUID v4
 */
function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Get or create guest ID from sessionStorage (per-tab unique ID)
 */
export function getOrCreateGuestId(): string {
  const key = 'zing_guest_id';
  let id = sessionStorage.getItem(key);
  
  if (!id) {
    id = generateUUID();
    sessionStorage.setItem(key, id);
  }
  
  return id;
}

/**
 * Get guest name from localStorage
 */
export function getGuestName(): string | null {
  return localStorage.getItem('zing_guest_name');
}

/**
 * Set guest name in localStorage
 */
export function setGuestName(name: string): void {
  localStorage.setItem('zing_guest_name', name);
}

/**
 * Clear guest name from localStorage
 */
export function clearGuestName(): void {
  localStorage.removeItem('zing_guest_name');
}
/**
 * Get reconnect token for a room and player from localStorage
 */
export function getReconnectToken(roomId: string, playerId?: string): string | null {
  if (!playerId) {
    // Fallback: try to get token without playerId (for backwards compatibility)
    return localStorage.getItem(`zing_reconnect_${roomId}`);
  }
  return localStorage.getItem(`zing_reconnect_${roomId}_${playerId}`);
}

/**
 * Set reconnect token for a room and player in localStorage
 */
export function setReconnectToken(roomId: string, token: string, playerId?: string): void {
  if (!playerId) {
    // Fallback: store without playerId (for backwards compatibility)
    localStorage.setItem(`zing_reconnect_${roomId}`, token);
    return;
  }
  localStorage.setItem(`zing_reconnect_${roomId}_${playerId}`, token);
}

/**
 * Clear reconnect token for a room and player from localStorage
 */
export function clearReconnectToken(roomId: string, playerId?: string): void {
  if (!playerId) {
    // Fallback: clear without playerId
    localStorage.removeItem(`zing_reconnect_${roomId}`);
    return;
  }
  localStorage.removeItem(`zing_reconnect_${roomId}_${playerId}`);
}