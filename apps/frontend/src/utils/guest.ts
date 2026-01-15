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
 * Get guest name from sessionStorage (per-tab, tied to current guestId)
 */
export function getGuestName(): string | null {
  const guestId = getOrCreateGuestId();
  const name = sessionStorage.getItem(`zing_guest_name_${guestId}`);
  return name;
}

/**
 * Set guest name in sessionStorage (per-tab, tied to current guestId)
 */
export function setGuestName(name: string): void {
  const guestId = getOrCreateGuestId();
  sessionStorage.setItem(`zing_guest_name_${guestId}`, name);
}

/**
 * Clear guest name from sessionStorage (per-tab, tied to current guestId)
 */
export function clearGuestName(): void {
  const guestId = getOrCreateGuestId();
  sessionStorage.removeItem(`zing_guest_name_${guestId}`);
}

/**
 * Get reconnect token for a room and player from localStorage
 */
export function getReconnectToken(roomId: string, playerId?: string): string | null {
  if (!playerId) {
    return localStorage.getItem(`zing_reconnect_${roomId}`);
  }
  const key = `zing_reconnect_${roomId}_${playerId}`;
  return localStorage.getItem(key);
}

/**
 * Set reconnect token for a room and player in localStorage
 */
export function setReconnectToken(roomId: string, token: string, playerId?: string): void {
  cleanupOldReconnectTokens();
  
  if (!playerId) {
    const key = `zing_reconnect_${roomId}`;
    localStorage.setItem(key, token);
    return;
  }
  const key = `zing_reconnect_${roomId}_${playerId}`;
  localStorage.setItem(key, token);
}

/**
 * Clean up old reconnect tokens (keep only last 10)
 */
function cleanupOldReconnectTokens(): void {
  const allKeys = Object.keys(localStorage);
  const reconnectKeys = allKeys.filter(k => {
    const isReconnect = k.startsWith('zing_reconnect_');
    const isNotAuthToken = k !== 'zing_auth_token';
    const isValidKey = typeof localStorage[k] === 'string';
    return isReconnect && isNotAuthToken && isValidKey;
  });
  
  if (reconnectKeys.length > 10) {
    const toRemove = reconnectKeys.slice(0, reconnectKeys.length - 10);
    toRemove.forEach(key => {
      if (key !== 'zing_auth_token') {
        localStorage.removeItem(key);
      }
    });
  }
}

/**
 * Clear reconnect token for a room and player from localStorage
 */
export function clearReconnectToken(roomId: string, playerId?: string): void {
  if (!playerId) {
    const key = `zing_reconnect_${roomId}`;
    localStorage.removeItem(key);
    return;
  }
  const key = `zing_reconnect_${roomId}_${playerId}`;
  localStorage.removeItem(key);
}