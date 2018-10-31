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

# Install Helm
curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
chmod 700 get_helm.sh
sudo ./get_helm.sh
helm init --client-only

# Push images
gcloud auth configure-docker --quiet
docker push $WEB_IMAGE:$COMMIT
docker push $WEB_IMAGE:latest
docker push $NGINX_IMAGE:$COMMIT
docker push $NGINX_IMAGE:latest

# Deploy
helm upgrade \
  --tiller-namespace tiller \
  --namespace bolagetio \
  -f chart/values.production.yaml \
  --install \
	--wait \
	--timeout 300 \
  bolagetio ./chart
