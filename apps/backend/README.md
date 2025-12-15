# Zing Backend

This is the backend service for Zing. It is an Express + Socket.IO server that is authoritative for game rules. It also persists events to Postgres via Prisma.

Local dev:

```powershell
pnpm --filter @zing/backend install
pnpm --filter @zing/backend dev
```


Notes about dealing and hands:

- At game start each player receives up to 4 cards (mini-hand).
- When all players' hands are empty and there are still cards left in the deck, the server automatically deals up to 4 new cards to each player and emits a `hands_dealt` event.
- The UI shows a move log (game events), talon stack, and a text summary of cards each player has taken for easier debugging and testing.

Demo helper:

```powershell
pnpm --filter @zing/backend run dev:demo -- http://localhost:4000 http://localhost:5173 PlayerName
```

This creates a new room, launches a Greedy bot into it, and prints a URL you can open to join the created room as `PlayerName`.

Endpoints:
- GET /health — health check

Socket events (MVP):
- `auth` -> `auth_ok`
- `create_room` -> `room_created`
- `join_room` -> `room_update`
- `start_game` -> `game_state`
- `intent_play_card` -> `game_event`


