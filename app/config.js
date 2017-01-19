const config = {
  ELASTIC_HOST: process.env.ES_HOST || 'elastic:9200',
  ELASTIC_LOG: process.env.ELASTIC_LOG,
  ELASTIC_INDEX: process.env.ELASTIC_INDEX || 'bolagetio_dev',
  PORT: 3000
}

export default config
