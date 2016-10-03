const config = {
  ELASTIC_HOST: process.env.ELASTIC_HOST || 'http://bolagetio_elasticsearch:9200',
  ELASTIC_LOG: process.env.ELASTIC_LOG,
  ELASTIC_INDEX: process.env.ELASTIC_INDEX,
  PORT: 3000
}

export default config
