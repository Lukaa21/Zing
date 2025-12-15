# Zing — Online Card Game

Monorepo scaffold for the Zing card game. Stack: TypeScript, Node.js, Socket.IO, PostgreSQL, Redis, React (Vite) — Docker-first.

Quickstart:

```powershell
# bring up infra
pnpm run infra:up

# install deps
pnpm install

# start dev apps (backend + frontend)
pnpm run dev
```


This repo contains:
- apps/backend: server and game engine
- apps/frontend: React client
- infra: Docker Compose for dev (postgres & redis)

Contributing: follow the code style and run `pnpm test` and `pnpm lint` in your workspace.
