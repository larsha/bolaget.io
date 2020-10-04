import dotenv from 'dotenv'

dotenv.config()

export default {
  NODE_ENV: process.env.NODE_ENV,
  ELASTIC_HOST: process.env.ELASTIC_HOST,
  ELASTIC_INDEX_SHARDS: process.env.ELASTIC_INDEX_SHARDS,
  ELASTIC_INDEX_REPLICAS: process.env.ELASTIC_INDEX_REPLICAS,
  ELASTIC_REQUEST_TIMEOUT: process.env.ELASTIC_REQUEST_TIMEOUT,
  PORT: process.env.PORT,
  SYSTEM_PORT: process.env.SYSTEM_PORT,
}
