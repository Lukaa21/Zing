# KORAK 2: Public/Private Rooms + Access Codes & Invite Links

## Completed Implementation

### Backend Features
1. **Room Model Extensions**
   - `visibility`: 'public' | 'private' (default: 'public')
   - `accessCode`: 6-character code (e.g., "vpq6rc") for private rooms
   - `inviteToken`: Random 32-character token for invite links

2. **Create Room Event**
   - Accepts `visibility` parameter
   - Returns `accessCode` and `inviteToken` for private rooms
   - Example payload:
     ```typescript
     socket.emit('create_room', { name: 'John', visibility: 'private' })
     ```

3. **Join Room Event**
   - Supports 3 ways to join:
     ```typescript
     // Public room by ID
     socket.emit('join_room', { roomId: 'room-abc123', guestId, name })
     
     // Private room by access code
     socket.emit('join_room', { code: 'vpq6rc', guestId, name })
     
     // Private room by invite token
     socket.emit('join_room', { roomId: 'room-abc123', inviteToken: 'xyz...', guestId, name })
     ```

4. **Access Control**
   - Public rooms: Anyone can join with just roomId
   - Private rooms: Require either `accessCode` OR `inviteToken`
   - Invalid access returns `join_error` event with reason

### Frontend Features
1. **Create Room UI**
   - Radio button toggle: Public / Private
   - After creating private room, displays:
     - Access Code (with copy button)
     - Invite Link (with copy button)
     - Link format: `http://localhost:5173?room=room-abc123&invite=xyz...`

2. **Join Room UI**
   - Input field: "Enter room ID or code"
   - Smart detection:
     - 6-char input → treated as access code
     - Otherwise → treated as roomId
   - List of public rooms with join buttons

3. **Auto-Join from Invite Link**
   - When user opens URL with `?invite=token&room=roomId`
   - Frontend auto-prompts for guest name if needed
   - Automatically joins using invite token

## Testing Scenarios

### Scenario 1: Create & Join Private Room (Same Device)
```
1. Click "Create Room" in Tab 1
2. Select "Private"
3. Create room
4. Copy access code or invite link
5. Paste code/link in Tab 2 "Join" input
6. Both players see each other ✓
```

### Scenario 2: Share Invite Link
```
1. Tab 1: Create private room → copy link
2. Send link to friend
3. Friend clicks link → auto-redirects to invite
4. Friend enters name → joins automatically ✓
```

### Scenario 3: Public Room
```
1. Tab 1: Create room (Public by default)
2. Link shows in "Open Rooms" list
3. Tab 2: Click "Join" button
4. Both players connected ✓
```

## API Reference

### Backend Events

**room_created (response)**
```typescript
{
  roomId: 'room-abc123',
  visibility: 'public' | 'private',
  accessCode?: 'vpq6rc',      // only for private
  inviteToken?: 'xyz...'      // only for private
}
```

**join_error (response)**
```typescript
{
  reason: 'invalid_room' | 'room_not_found' | 'access_denied',
  message?: 'Invalid code or token'
}
```

**room_update (broadcast)**
```typescript
{
  roomId: 'room-abc123',
  players: [
    { id: 'guest-uuid', name: 'John', role: 'player', taken: [] },
    { id: 'guest-uuid', name: 'Jane', role: 'player', taken: [] }
  ],
  ownerId: 'guest-uuid'
}
```

## Code Changes Summary

### Backend Files Modified
- `src/game/roomManager.ts`: Room type + createRoom, getRoomByAccessCode, validateRoomAccess
- `src/server.ts`: Updated create_room and join_room handlers with validation

### Frontend Files Modified
- `src/pages/Lobby.tsx`: Added visibility toggle, credentials modal, join by code
- `src/pages/Game.tsx`: Added inviteToken prop and join_error handler
- `src/App.tsx`: Added invite link URL parsing
- `src/styles.css`: Added styling for new components

## Next Steps (Optional Enhancements)
- [ ] Show room visibility indicator in open rooms list
- [ ] Copy-to-clipboard notifications
- [ ] Room name/description
- [ ] Password protection for extra security
- [ ] Room expiry / cleanup
