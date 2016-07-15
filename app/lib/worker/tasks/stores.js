import Store from '../../../models/store'
import Request from '../../request'

class Task extends Request {
  constructor () {
    super('http://www.systembolaget.se/api/assortment/stores/xml')
  }

  save (stores) {
    return Store.putMapping()
      .then(() => {
        const data = stores.map(obj => {
          return new Store(obj)
        })

        return Store.bulk(data)
      })
  }

  index (stores) {
    return this.save(Store.reduce(stores))
  }
}

export default Task
