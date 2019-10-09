#!/bin/bash

set -e

# Download and install Google Cloud SDK
curl -0 https://storage.googleapis.com/cloud-sdk-release/google-cloud-sdk-223.0.0-linux-x86_64.tar.gz | tar -zx -C ${HOME}
${HOME}/google-cloud-sdk/install.sh
source ${HOME}/google-cloud-sdk/path.bash.inc
gcloud --quiet components install kubectl

echo $GCLOUD_SERVICE_KEY | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud --quiet config set project $PROJECT_NAME
gcloud --quiet config set container/cluster $CLUSTER_NAME
gcloud --quiet container clusters get-credentials $CLUSTER_NAME

# Helm (version here must match Helm/Tiller in cluster)
curl -o /tmp/helm.tar.gz https://storage.googleapis.com/kubernetes-helm/helm-v2.14.1-linux-amd64.tar.gz
tar -xvf /tmp/helm.tar.gz -C /tmp/
sudo mv /tmp/linux-amd64/helm /usr/local/bin/helm
helm init \
	--client-only \
	--service-account tiller

# Push images
gcloud auth configure-docker --quiet
docker push eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/${K8S_DEPLOYMENT_NAME_WEB}:$COMMIT
docker push eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/${K8S_DEPLOYMENT_NAME_WEB}:latest
docker push eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/${K8S_DEPLOYMENT_NAME_NGINX}:$COMMIT
docker push eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/${K8S_DEPLOYMENT_NAME_NGINX}:latest
docker push eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/elasticsearch-oss:${ELASTICSEARCH_VERSION}
docker push eu.gcr.io/${PROJECT_NAME}/${DOCKER_IMAGE_NAME}/elasticsearch-oss:latest

helm repo add elastic https://helm.elastic.co

# Deploy
sed -i "s/appVersion:/appVersion: $COMMIT/" chart/Chart.yaml

helm upgrade \
  --tiller-namespace tiller \
  --namespace bolagetio \
  --set web.image.tag=$COMMIT \
  --set nginx.image.tag=$COMMIT \
  --install \
  --atomic \
  --force \
  bolagetio ./chart
