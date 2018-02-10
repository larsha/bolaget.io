const config = {
  NODE_ENV: process.env.NODE_ENV,
  ELASTIC_HOST: process.env.ELASTIC_HOST,
  ELASTIC_LOG: process.env.ELASTIC_LOG,
  ELASTIC_INDEX_SHARDS: process.env.ELASTIC_INDEX_SHARDS,
  ELASTIC_INDEX_REPLICAS: process.env.ELASTIC_INDEX_REPLICAS,
  ELASTIC_REQUEST_TIMEOUT: process.env.ELASTIC_REQUEST_TIMEOUT,
  PORT: process.env.PORT,
  SYSTEM_PORT: process.env.SYSTEM_PORT
}

export default config
