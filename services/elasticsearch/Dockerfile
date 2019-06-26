ARG elasticsearch_version
FROM docker.elastic.co/elasticsearch/elasticsearch-oss:${elasticsearch_version}

RUN bin/elasticsearch-plugin install --batch analysis-icu