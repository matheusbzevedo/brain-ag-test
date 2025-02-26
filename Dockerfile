FROM node:22-alpine AS development

WORKDIR /app

RUN npm i -g pnpm
RUN npm i -g @nestjs/cli

COPY package.json pnpm-lock.yaml prisma ./

RUN pnpm install

COPY . .
CMD ["pnpm", "start:prod"]
