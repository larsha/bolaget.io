import Store from '../../../models/store'
import Request from '../../request'

class Task extends Request {
  constructor () {
    super('http://www.systembolaget.se/api/assortment/stores/xml')
  }

  index (stores, index) {
    return Store.putMapping(index)
      .then(() => {
        const data = Store.reduce(stores).map(obj => {
          return new Store(obj)
        })

        return Store.bulk(data, index)
      })
  }
}

export default Task
