# Zing Backend

This is the backend service for Zing. It is an Express + Socket.IO server that is authoritative for game rules. It also persists events to Postgres via Prisma.

Local dev:

```powershell
pnpm --filter @zing/backend install
pnpm --filter @zing/backend dev
```

Dev bots:

```powershell
pnpm --filter @zing/backend run dev:runBots -- 3
```

Endpoints:
- GET /health — health check

Socket events (MVP):
- `auth` -> `auth_ok`
- `create_room` -> `room_created`
- `join_room` -> `room_update`
- `start_game` -> `game_state`
- `intent_play_card` -> `game_event`
- `intent_take_talon` -> `game_event`


