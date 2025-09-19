#!/bin/bash

MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0.24-ubi8-20250919T081054Z"
CONTAINER_NAME="mongodb"  # Removed leading space

# root credential
ROOT_USER="root-user"
ROOT_PASSWORD="root-Password"

docker run -d --rm --name $CONTAINER_NAME \
    -e MONGO_INITDB_ROOT_USERNAME=$ROOT_USER \
    -e MONGO_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
    $MONGODB_IMAGE:$MONGODB_TAG
