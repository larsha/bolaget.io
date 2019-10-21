#!/bin/bash

set -e

WEB_IMAGE=eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/${K8S_DEPLOYMENT_NAME_WEB}
ELASTICSEARCH_IMAGE=eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/elasticsearch-oss

# Build web
docker build \
  -t web \
  -t $WEB_IMAGE:$COMMIT \
  -t $WEB_IMAGE:latest \
  -f services/web/Dockerfile services/web

# Build elasticsearch
docker build \
  --build-arg elasticsearch_version=$ELASTICSEARCH_VERSION \
  -t elasticsearch \
  -t $ELASTICSEARCH_IMAGE:$ELASTICSEARCH_VERSION \
  -t $ELASTICSEARCH_IMAGE:latest \
  -f services/elasticsearch/Dockerfile services/elasticsearch