MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0-ubuntu2204"
CONTAINER_NAME=" mongodb"

# root credential

docker run -d --rm --name $CONTAINER_NAME $MONGODB_IMAGE $MONGODB_TAG