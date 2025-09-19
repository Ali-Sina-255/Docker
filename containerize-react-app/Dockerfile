FROM node:22-alpine

WORKDIR /app


COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build


# using --cups=
docker run -d --rm --name cpu_decimal --cpus=0.5 busybox sh -x 'while true; do :; done'

# --cpu shares 512,2048
docker rum -d --rm --name cpu_shares_low cpu-shares=512 --cpuset-cpus=0

docker status


# cpu quota same is --cpus=0.78
docker run -d --rm --name cup_quota --cpu-period=100000 --cup-quota=7500

# docker restart polices
docker run -d --rn --name restart_fail --restart on-failure busybox

# docker restart polices
docker run -d --rn --name restart_fail --restart on-failure:3 busybox
# always start
docker run -d --rn --name restart_always --restart on-always busybox
docker run -d --rn --name restart_unless-stop --unless-stopped  busybox

# networking in docker 
# default network bridge
docker network ls
docker run -d --rm --name webserver nginx:1.2 '
docker network create 
docker network create app-net
docker network inspect app-net

docker connect app-net webserver (container name)

