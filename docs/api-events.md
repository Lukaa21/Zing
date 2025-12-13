# Zing — API & Event Contract (MVP)

WebSocket Events (client -> server):
- `auth` { name, role } -> server authenticates (ephemeral for MVP) and replies `auth_ok` or `auth_error`.
- `create_room` -> server creates a room and replies `room_created`.
- `join_room` { roomId } -> server joins and replies `room_update`.
- `start_game` { roomId } -> server starts game and emits `game_state`.
- `intent_play_card` { roomId, cardId } -> server validates and either emits `game_event` or `intent_rejected`.
- `intent_take_talon` { roomId } -> server validates and emits `game_event`.
- `intent_pass` { roomId } -> server validates and emits `game_event`.

Server Events (server -> clients):
- `auth_ok`, `auth_error` — authentication.
- `room_created`, `room_update`, `rooms_list`.
- `game_state` { state } — authoritative state snapshot or delta.
- `game_event` { seq, eventType, payload } — single event that occurred.
- `intent_rejected` { reason } — reason for rejection.
- `game_over` — final summary.

Postgres Schema (core):
- `games` table stores game metadata and `deckSeed`.
- `game_events` logs every authoritative event with `seq` and `payload`.
- `game_snapshots` store periodic full snapshots to speed up rehydration.

Server Responsibilities:
- Validate all intents and accept/reject.
- Append accepted intents as events to `game_events` with a sequence number.
- Emit events & updated authoritative game state to all players and spectators.
- Allow spectators to join as `role: 'spectator'` with read-only updates.
