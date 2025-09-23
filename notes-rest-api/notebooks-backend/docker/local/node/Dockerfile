### Stage 1: Development
FROM node:22-alpine as development
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]

### Stage 2: Install production dependencies
FROM node:22-alpine as prod-dependencies
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

### Stage 3: Production image
FROM gcr.io/distroless/nodejs22 as production
WORKDIR /app

ENV NODE_ENV=production
COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY src ./src

CMD ["src/server.js"]
    