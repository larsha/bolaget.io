#!/bin/bash

set -e

if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then rm -rf $HOME/google-cloud-sdk; export CLOUDSDK_CORE_DISABLE_PROMPTS=1; curl https://sdk.cloud.google.com | bash; fi
source /home/travis/google-cloud-sdk/path.bash.inc

gcloud --quiet components update
gcloud --quiet components update kubectl

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
  -t $WEB_IMAGE:$COMMIT \
  -t $WEB_IMAGE:latest \
  -f Dockerfile.web .

# Build nginx
docker build \
  -t $NGINX_IMAGE:$COMMIT \
  -t $NGINX_IMAGE:latest \
  -f Dockerfile.nginx .

gcloud docker -- push $WEB_IMAGE:$COMMIT
gcloud docker -- push $WEB_IMAGE:latest
gcloud docker -- push $NGINX_IMAGE:$COMMIT
gcloud docker -- push $NGINX_IMAGE:latest

# Update web
kubectl -n ${K8S_NAMESPACE} set image deployment/${K8S_DEPLOYMENT_NAME_WEB} ${K8S_DEPLOYMENT_NAME_WEB}=$WEB_IMAGE:$COMMIT

# Update nginx
kubectl -n ${K8S_NAMESPACE} set image deployment/${K8S_DEPLOYMENT_NAME_NGINX} ${K8S_DEPLOYMENT_NAME_NGINX}=$NGINX_IMAGE:$COMMIT
