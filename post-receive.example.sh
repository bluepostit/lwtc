#!/bin/bash

# Copy this file, renamed as `post-receive`, into the `hooks/` directory
# of your target git repository (deploy).

TARGET_DIR=/path/to/work/tree
GIT_DIR=$TARGET_DIR/.git
DOCKER_IMAGE=your-user-name/docker-image-name
VERSION_INFO_FILE_NAME=version-info.yaml

echo ""
echo "> Updating git working tree"
git -C $TARGET_DIR pull origin master
cd $TARGET_DIR

echo "> Generating version info YAML"
VERSION_STRING=`git rev-parse --short HEAD`
DATE_STRING=`date "+%Y-%m-%d %X %Z"`
echo -e "version: \"${VERSION_STRING}\" \ndate: \"${DATE_STRING}\"" > $VERSION_INFO_FILE_NAME

echo "> Building Docker image: ${DOCKER_IMAGE}"
sudo docker build --no-cache . -t $DOCKER_IMAGE

echo "> Restarting container."
sudo docker-compose down && sudo docker-compose up -d

echo "Done."
