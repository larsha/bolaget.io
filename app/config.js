const config = {
  ELASTIC_HOST: process.env.ELASTIC_HOST || 'elasticsearch:9200',
  ELASTIC_LOG: process.env.ELASTIC_LOG || 'trace',
  ELASTIC_INDEX: process.env.ELASTIC_INDEX || 'bolaget_dev',
  PORT: process.env.PORT || 3000
}

export default config
