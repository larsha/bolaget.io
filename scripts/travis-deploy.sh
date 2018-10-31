#!/bin/bash

set -e

# Install Helm
curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
chmod 700 get_helm.sh
sudo ./get_helm.sh
helm init --client-only

# Deploy
kubectl config set-context $(kubectl config current-context) --namespace=bolagetio

helm upgrade \
  --tiller-namespace tiller \
  --namespace bolagetio \
  -f chart/values.production.yaml \
  --install \
	--wait \
	--timeout 300 \
  bolagetio ./chart
