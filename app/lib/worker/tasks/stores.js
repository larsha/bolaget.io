import Store from '../../../models/store'
import Request from '../../request'

class Task extends Request {
  constructor () {
    super('http://www.systembolaget.se/api/assortment/stores/xml')
  }

  save (stores) {
    return Store.putMapping()
      .then(() => {
        return Promise.all(stores.map(obj => {
          let store = new Store(obj)
          return store.save().catch(() => Promise.resolve())
        }))
      })
  }

  run () {
    return this.get()
      .then(this.parse)
      .then(json => Store.reduce(json))
      .then(this.save)
  }
}

export default Task
