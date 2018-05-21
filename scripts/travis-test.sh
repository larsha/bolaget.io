#!/bin/bash

set -e

# Start ElasticSearch
docker run \
  -p 9200:9200 \
  -e ES_PLUGINS_INSTALL=analysis-icu \
  --name elasticsearch \
  --rm \
  -d \
  quay.io/pires/docker-elasticsearch-kubernetes:6.1.2

sleep 20

# Start Node.js
docker run \
  -p 3000:3000 \
  -e NODE_ENV=development \
  -e ELASTIC_HOST=http://localhost:9200 \
  -e ELASTIC_INDEX_SHARDS=1 \
  -e ELASTIC_INDEX_REPLICAS=0 \
  -e ELASTIC_REQUEST_TIMEOUT=15000 \
  -e PORT=3000 \
  -e SYSTEM_PORT=3001 \
  --rm \
  web \
  npm test