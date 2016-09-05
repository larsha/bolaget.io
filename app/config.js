const config = {
  ELASTIC_HOST: process.env.ELASTIC_HOST,
  ELASTIC_LOG: process.env.ELASTIC_LOG || 'trace',
  ELASTIC_INDEX: process.env.ELASTIC_INDEX,
  PORT: 3000
}

export default config
