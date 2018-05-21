#!/bin/bash

set -e

# Create test network
docker network create test

# Start ElasticSearch
docker run \
  -p 9200:9200 \
  -e ES_PLUGINS_INSTALL=analysis-icu \
  --name elasticsearch \
  --network test \
  --rm \
  -d \
  quay.io/pires/docker-elasticsearch-kubernetes:6.1.2

sleep 20

# Start Node.js
docker run \
  -p 9200:9200 \
  -e NODE_ENV=development \
  -e ELASTIC_HOST=http://elasticsearch:9200 \
  -e ELASTIC_INDEX_SHARDS=1 \
  -e ELASTIC_INDEX_REPLICAS=0 \
  -e ELASTIC_REQUEST_TIMEOUT=15000 \
  -e PORT=3000 \
  -e SYSTEM_PORT=3001 \
  --network test \
  --rm \
  web \
  npm test