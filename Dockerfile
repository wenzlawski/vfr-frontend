# syntax=docker/dockerfile:1

FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci --prod

FROM node:18-alpine
USER node:node
WORKDIR /app
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json .
CMD ["node","build"]