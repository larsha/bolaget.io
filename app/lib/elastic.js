import elasticsearch from 'elasticsearch'
import config from '../config'
import { randomString } from './utils'

const client = new elasticsearch.Client({
  host: config.ELASTIC_HOST,
  log: config.ELASTIC_LOG,
  requestTimeout: config.ELASTIC_REQUEST_TIMEOUT
})

// Elastic class can be used as a static class or
// it must be extended by a Model class
export default class Elastic {
  static async deleteIndexes (index) {
    if (index.length > 0) {
      return client.indices.delete({ index })
    }

    return Promise.resolve()
  }

  static async getById (id) {
    return client.get({
      type: this.alias,
      index: this.alias,
      id
    })
    .then(r => r._source)
  }

  static async find (query = null, offset = 0, limit = 1, sort = null) {
    let filter = {
      index: this.alias,
      type: this.alias,
      body: {
        from: offset,
        size: limit,
        query: {
          match_all: {}
        }
      }
    }

    if (sort) {
      Object.assign(filter.body, { sort })
    }

    if (query) {
      filter.body.query = query
    }

    return client.search(filter)
      .then(data => {
        const result = data.hits.hits.map(o => o._source)
        const count = data.hits.total
        return { result, count }
      })
  }

  constructor (data) {
    this.alias = this.constructor.alias
    this.index = `${this.alias}-${randomString()}`
    this.data = data
  }

  get mapped () {
    return this.data.map(o => {
      let mapped = {}

      for (let prop in o) {
        if (o.hasOwnProperty(prop)) {
          if (this.model.hasOwnProperty(prop)) {
            const obj = this.model[prop]
            try {
              mapped[obj.value] = obj.transform(o[prop])
            } catch (e) {
              mapped[obj.value] = o[prop]
            }
          }
        }
      }

      return mapped
    })
  }

  async getIndexes () {
    return client.indices.get({ index: `${this.alias}-*` })
      .then(indexes => Object.keys(indexes).join())
  }

  async putAlias () {
    return client.indices.putAlias({
      name: this.alias,
      index: this.index
    })
  }

  async updateIndex () {
    return client.indices.putSettings({
      index: this.index,
      body: {
        settings: {
          index: {
            refresh_interval: '1s',
            number_of_replicas: config.ELASTIC_INDEX_REPLICAS
          }
        }
      }
    })
  }

  async createIndex () {
    const options = {
      index: this.index,
      body: {
        mappings: {
          [this.alias]: this.mapping
        },
        settings: {
          index: {
            refresh_interval: '-1',
            number_of_replicas: 0,
            number_of_shards: config.ELASTIC_INDEX_SHARDS,
            analysis: {
              filter: {
                swedish_stop: {
                  type: 'stop',
                  stopwords: '_swedish_'
                },
                swedish_stemmer: {
                  type: 'stemmer',
                  language: 'swedish'
                },
                swedish_sort: {
                  type: 'icu_collation',
                  language: 'sv',
                  country: 'SE',
                  variant: '@collation=phonebook'
                }
              },
              analyzer: {
                swedish_sort: {
                  tokenizer: 'keyword',
                  filter: ['swedish_sort']
                },
                standard_text: {
                  tokenizer: 'standard',
                  filter: 'lowercase'
                },
                swedish_edgegram: {
                  type: 'custom',
                  tokenizer: 'standard',
                  filter: [
                    'lowercase',
                    'swedish_stop',
                    'swedish_stemmer'
                  ]
                }
              }
            }
          }
        }
      }
    }

    return client.indices.create(options)
  }

  async bulkIndex () {
    let batch = []

    this.mapped.forEach(obj => {
      batch.push({
        index: {
          _index: this.index,
          _type: this.alias,
          _id: obj.nr
        }
      })

      batch.push(obj)
    })

    return client.bulk({ body: batch })
  }
}
