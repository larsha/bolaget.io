#!/bin/bash

set -e

# Download and install Google Cloud SDK
curl -0 https://storage.googleapis.com/cloud-sdk-release/google-cloud-sdk-159.0.0-linux-x86_64.tar.gz | tar -zx -C ${HOME}
${HOME}/google-cloud-sdk/install.sh
source ${HOME}/google-cloud-sdk/path.bash.inc
gcloud --quiet components install kubectl

# Install Helm
curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
chmod 700 get_helm.sh
sudo ./get_helm.sh
helm init --client-only

# Deploy
kubectl config set-context $(kubectl config current-context) --namespace=bolagetio

helm dependency build \
  --tiller-namespace tiller \
  ./chart

helm upgrade \
  --tiller-namespace tiller \
  --namespace bolagetio \
  -f chart/values.production.yaml \
  --install \
	--wait \
	--timeout 300 \
  bolagetio ./chart
