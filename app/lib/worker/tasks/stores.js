import { mongoose } from '../../connections'
import { mapping, reduce } from '../../../models/store'
import Request from '../../request'

const Store = mongoose.model('Store')

class Task extends Request {
  constructor () {
    super('http://www.systembolaget.se/api/assortment/stores/xml', mapping)
  }

  save (data) {
    return Store.remove().then(() => Store.insertMany(data))
  }

  run () {
    return this.get()
      .then(this.parse)
      .then(reduce)
      .then(json => this.map(json))
      .then(this.save)
  }
}

export default Task
