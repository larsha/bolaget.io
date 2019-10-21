#!/bin/bash

set -e

# Create test network
docker network create test

# Start ElasticSearch
docker run \
  --name elasticsearch \
  --network test \
  --rm \
  -d \
  --env discovery.type=single-node \
  eu.gcr.io/brynn-145714/bolagetio/elasticsearch-oss:$ELASTICSEARCH_VERSION

sleep 20

# Start Node.js
docker run \
  -e NODE_ENV=test \
  -e ELASTIC_HOST=http://elasticsearch:9200 \
  -e ELASTIC_INDEX_SHARDS=1 \
  -e ELASTIC_INDEX_REPLICAS=0 \
  -e ELASTIC_REQUEST_TIMEOUT=10000 \
  -e PORT=3000 \
  -e SYSTEM_PORT=3001 \
  --network test \
  --rm \
  web \
  npm test