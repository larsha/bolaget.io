#!/bin/bash

set -e

WEB_IMAGE=eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/${K8S_DEPLOYMENT_NAME_WEB}
NGINX_IMAGE=eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/${K8S_DEPLOYMENT_NAME_NGINX}
ELASTICSEARCH_IMAGE=eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/elasticsearch-oss

# Build web
docker build \
  -t web \
  -t $WEB_IMAGE:$COMMIT \
  -t $WEB_IMAGE:latest \
  -f services/web/Dockerfile services/web

# Build nginx
docker build \
  --build-arg CONF=production.conf \
  -t nginx \
  -t $NGINX_IMAGE:$COMMIT \
  -t $NGINX_IMAGE:latest \
  -f services/nginx/Dockerfile services/nginx

# Build elasticsearch
docker build \
  --build-arg elasticsearch_version=7.2.0 \
  -t elasticsearch \
  -t $ELASTICSEARCH_IMAGE:7.2.0 \
  -t $ELASTICSEARCH_IMAGE:latest \
  -f services/elasticsearch/Dockerfile services/elasticsearch