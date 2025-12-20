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
