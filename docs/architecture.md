# Zing — Architecture Overview

- Backend: Node.js + TypeScript; Express + Socket.IO for HTTP and WebSocket.
  - Stateless sockets, use Redis adapter for scaling.
  - Save all authoritative events to Postgres (`game_events`).
  - Game engine (pure TypeScript) deterministic and testable.
- Frontend: React + Vite + TypeScript.
  - Connects via Socket.IO client, sends intents only, receives authoritative game state & events.
  - Supports spectator mode and responsive UI.
- Infra: Postgres & Redis via Docker Compose for local dev.
- Dev: `pnpm` workspace monorepo.
- CI: runs tests & lints.
- Bot harness: `apps/backend/src/dev/bots` for minimal automated playtesting.
