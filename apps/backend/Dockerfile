FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile || pnpm install
COPY . .
RUN pnpm build
EXPOSE 4000
CMD ["node", "dist/server.js"]
