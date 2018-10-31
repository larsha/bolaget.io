#!/bin/bash

set -e

echo $GCLOUD_SERVICE_KEY | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud --quiet config set project $PROJECT_NAME
gcloud --quiet config set container/cluster $CLUSTER_NAME
gcloud --quiet config set compute/zone ${CLOUDSDK_COMPUTE_ZONE}
gcloud --quiet container clusters get-credentials $CLUSTER_NAME

WEB_IMAGE=eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/${K8S_DEPLOYMENT_NAME_WEB}
NGINX_IMAGE=eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/${K8S_DEPLOYMENT_NAME_NGINX}

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

# Push images
gcloud auth configure-docker --quiet
docker push $WEB_IMAGE:$COMMIT
docker push $WEB_IMAGE:latest
docker push $NGINX_IMAGE:$COMMIT
docker push $NGINX_IMAGE:latest