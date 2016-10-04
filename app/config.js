const config = {
  ELASTIC_HOST: 'http://bolagetio_elasticsearch:9200',
  ELASTIC_LOG: process.env.ELASTIC_LOG || 'trace',
  ELASTIC_INDEX: process.env.ELASTIC_INDEX || 'bolagetio_dev',
  PORT: 3000
}

export default config
