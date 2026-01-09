# Persistent Private Rooms - Test Plan

## Feature Overview
Players who start a game from a private room will now be returned to that room when they exit the game, instead of being kicked to the lobby.

## Implementation Summary

### Backend Changes

#### 1. Room Type Updates (`roomManager.ts`)
- Added `lastActivity?: number` field to track room activity
- Added `updateRoomActivity(roomId: string)` helper function
- Added `shouldDeleteRoom(room: Room)` with grace period logic
- Added `cleanupInactiveRooms()` scheduled cleanup job
- Added `getAllRoomsMap()` for debugging

#### 2. Activity Tracking
Updated the following functions to call `updateRoomActivity()`:
- `createRoom()` - Initialize lastActivity timestamp
- `addMemberToRoom()` - When players join or reconnect
- `joinRoom()` - When players join room
- `handleIntent()` - On any game action
- `startGame()` - When game begins

#### 3. Room Deletion Logic
Modified deletion points to use `shouldDeleteRoom()`:
- `removeMember()` - Check before deleting empty room
- `kickMember()` - Check before deleting empty room
- `leaveMemberRoom()` - Check before deleting empty room

#### 4. Exit Game Handler (`server.ts`)
Complete rewrite to handle three scenarios:
1. **Party Matchmaking Exit** - Return to original private room
2. **Private Room Game Exit** - Stay in same private room, just clear game state
3. **Public Room Exit** - Leave room and go to lobby

#### 5. Scheduled Cleanup (`server.ts`)
Added cleanup job that runs every 10 minutes:
```typescript
setInterval(() => {
  const deletedCount = cleanupInactiveRooms();
  if (deletedCount > 0) {
    logger.info({ deletedCount }, 'Cleaned up inactive private rooms');
  }
}, 10 * 60 * 1000);
```

### Frontend Changes

#### Game.tsx Updates
Added three new event handlers:
1. `stayed_in_room` - Clear game state, navigate to `/room`
2. `game_exited` - Another player exited, clear game state
3. Enhanced `returned_to_room` - Already existed, no changes needed
4. Enhanced cleanup in useEffect return

## Test Scenarios

### Scenario 1: 1v1 in Private Room
**Setup:**
1. Player A creates private room
2. Player B joins via invite/code
3. Player A starts 1v1 game
4. Game is played in the same room

**Test Cases:**
- [ ] Player A exits game → Should stay in private room
- [ ] Player B exits game → Should stay in private room
- [ ] Both players exit → Room should remain active for 30 minutes
- [ ] Re-join room within 30 minutes → Should work
- [ ] Wait 30+ minutes with no activity → Room should be auto-deleted

### Scenario 2: 2v2 Party in Private Room
**Setup:**
1. Player A creates private room
2. Players B, C, D join
3. Player A assigns teams
4. Player A starts 2v2 party game
5. Game is played in the same room

**Test Cases:**
- [ ] Any player exits game → Should stay in private room
- [ ] All players exit → Room should remain active for 30 minutes
- [ ] Some players exit, others rematch → Remaining players can continue
- [ ] Room cleanup after 30 minutes of inactivity

### Scenario 3: 2v2 Random Party Matchmaking
**Setup:**
1. Party A: Players 1 & 2 in private room A
2. Party B: Players 3 & 4 in private room B
3. Both parties join matchmaking
4. Matchmaking creates new room C for the game

**Test Cases:**
- [ ] Player 1 exits game → Should return to room A
- [ ] Player 2 exits game → Should return to room A
- [ ] Player 3 exits game → Should return to room B
- [ ] Player 4 exits game → Should return to room B
- [ ] All players exit → Matchmaking room C should be deleted
- [ ] Original rooms A and B should still exist
- [ ] Original rooms A and B should be deleted after 30 min inactivity

### Scenario 4: Public Room Games
**Setup:**
1. Player joins public lobby queue
2. Matchmaking creates public room
3. Game starts

**Test Cases:**
- [ ] Player exits game → Should go to lobby (existing behavior)
- [ ] Public room should be deleted immediately when empty
- [ ] No 30-minute grace period for public rooms

### Scenario 5: Room Activity and Cleanup
**Test Cases:**
- [ ] Create private room → lastActivity should be set
- [ ] Player joins → lastActivity should update
- [ ] Game starts → lastActivity should update
- [ ] Player plays card → lastActivity should update
- [ ] Room empty for 29 minutes → Should NOT be deleted
- [ ] Room empty for 31 minutes → Should be deleted on next cleanup cycle
- [ ] Cleanup runs every 10 minutes → Check logs

### Scenario 6: Edge Cases
**Test Cases:**
- [ ] Player exits, original room was deleted → Should go to lobby
- [ ] Player A creates room, starts game, exits → Room should persist
- [ ] Player reconnects to private room after disconnect → lastActivity updates
- [ ] Multiple games in same room (via rematch) → Room stays active
- [ ] Host leaves during game → Host transfer should work
- [ ] Room with spectators → Activity tracking works correctly

## Monitoring and Debugging

### Backend Logs to Check
```bash
# Room creation
"Room created" { roomId, visibility, hostId }

# Activity updates
"Cleaned up inactive private rooms" { deletedCount }

# Exit handling
"Player exited game, staying in private room" { roomId, playerId }
```

### Frontend Console Logs
```javascript
// When exiting game
"stayed_in_room" { roomId, room }
"returned_to_room" { roomId, room }
"left_room" { roomId }
"game_exited" { roomId }
```

### Database Queries
Check for orphaned rooms or data inconsistencies:
```sql
-- Check for rooms without recent activity
SELECT * FROM "Room" WHERE "updatedAt" < NOW() - INTERVAL '30 minutes';

-- Check for incomplete games
SELECT * FROM "Game" WHERE "status" = 'ACTIVE' AND "updatedAt" < NOW() - INTERVAL '1 hour';
```

## Success Criteria
✅ Private room 1v1 games: Players stay in room after exit  
✅ Private room 2v2 party games: Players stay in room after exit  
✅ Party matchmaking: Players return to their original private rooms  
✅ Public rooms: Deleted immediately when empty (no grace period)  
✅ Room cleanup: Inactive private rooms deleted after 30 minutes  
✅ Activity tracking: lastActivity updates on all key events  
✅ No TypeScript errors  
✅ Frontend navigates correctly for all exit scenarios  

## Rollback Plan
If issues occur:
1. Revert `exit_game` handler to previous version
2. Disable scheduled cleanup job
3. Keep `lastActivity` tracking (harmless)
4. Can re-enable incrementally after fixing bugs

## Configuration
Grace period is hardcoded at **30 minutes** (`30 * 60 * 1000` ms).  
Cleanup job runs every **10 minutes** (`10 * 60 * 1000` ms).

To make configurable, add to `.env`:
```env
ROOM_GRACE_PERIOD_MS=1800000  # 30 minutes
ROOM_CLEANUP_INTERVAL_MS=600000  # 10 minutes
```
