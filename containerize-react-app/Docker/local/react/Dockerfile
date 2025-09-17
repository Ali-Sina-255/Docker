FROM node:22-alpine as build

WORKDIR /app


COPY package*.json .
RUN npm ci

COPY . .

CMD [ "npm", 'start' ]
