import Store from '../../../models/v1/store'
import Request from '../../request'

class Task extends Request {
  constructor () {
    super('https://www.systembolaget.se/api/assortment/stores/xml')
  }

  async index (data, index) {
    await Store.putMapping(index)

    const stores = Store.transform(data)
      .map(obj => new Store(obj))

    return Store.bulk(stores, index)
  }
}

export default Task
