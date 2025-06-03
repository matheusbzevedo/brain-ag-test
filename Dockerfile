FROM node:22-alpine AS builder

WORKDIR /app

RUN npm i -g pnpm @nestjs/cli

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN pnpm install

COPY . .

RUN pnpm build

FROM node:22-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

CMD ["node", "dist/main"]
