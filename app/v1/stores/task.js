import Model from './model'
import Request from '../../lib/request'

export default class Task {
  async fetch () {
    const req = new Request('https://www.systembolaget.se/api/assortment/stores/xml')
    return req.fetch()
  }

  async index (data) {
    const model = new Model(data)
    const indexes = await model.getIndexes()

    await model.createIndex()
    await model.bulkIndex()
    await model.updateIndex()
    await model.putAlias()

    return Model.deleteIndexes(indexes)
  }
}
