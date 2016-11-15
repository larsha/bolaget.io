import elasticsearch from 'elasticsearch'
import config from '../config'

const client = new elasticsearch.Client({ host: config.ELASTIC_HOST, log: config.ELASTIC_LOG, requestTimeout: 60000 })

class Elastic {
  static async getIndex (index = '*') {
    return client.indices.get({ index })
  }

  static async putAlias (index) {
    return client.indices.putAlias({ name: Elastic.index, index })
  }

  static async deleteIndex (index) {
    return client.indices.delete({ index })
  }

  static async createIndex (index) {
    const options = {
      index,
      body: {
        mappings: {},
        settings: {
          index: {
            number_of_replicas: 0,
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

  static async getById (id) {
    return client.get({
      index: Elastic.index,
      type: this.type,
      id
    }).then(result => result._source)
  }

  static async find (query = null, offset = 0, limit = 1, sort = null) {
    let filter = {
      index: Elastic.index,
      type: this.type,
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
        const result = data.hits.hits.map(obj => obj._source)
        const count = data.hits.total
        return { result, count }
      })
  }

  static async putMapping (index) {
    const mapping = {
      type: this.type,
      body: this.mapping,
      index
    }

    return client.indices.putMapping(mapping)
  }

  static async bulk (data, index) {
    let batch = []

    data.forEach(obj => {
      batch.push({
        index: {
          _index: index,
          _type: this.type,
          _id: obj.body.nr
        }
      })

      batch.push(obj.body)
    })

    return client.bulk({ body: batch })
  }

  static get type () {
    return this.name.toLowerCase()
  }

  static get index () {
    return config.ELASTIC_INDEX
  }

  static get mapping () {
    throw new Error('Mapping not implemented!')
  }

  static get model () {
    throw new Error('Model not implemented!')
  }

  constructor (data) {
    let mapped = {}
    this.body = {}
    this.id = null
    this.type = this.constructor.type
    this.model = this.constructor.model
    this.mapping = this.constructor.mapping.properties

    for (let prop in data) {
      if (data.hasOwnProperty(prop)) {
        if (this.model.hasOwnProperty(prop)) {
          const obj = this.model[prop]
          try {
            mapped[obj.value] = obj.transform(data[prop])
          } catch (e) {
            mapped[obj.value] = data[prop]
          }
        }
      }
    }

    for (let key in this.mapping) {
      if (this.mapping.hasOwnProperty(key)) {
        this.body[key] = mapped[key]
      }
    }
  }
}

export default Elastic
