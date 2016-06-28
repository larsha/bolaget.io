import { mongoose } from '../../connections'
import { model, mapping, filter } from '../../../models/store'
import Request from '../../request'

const Store = mongoose.model('Store')

class Task extends Request {
  constructor () {
    super('http://www.systembolaget.se/api/assortment/stores/xml', mapping)
  }

  save (data) {
    return Store.remove().then(() => Store.insertMany(data))
  }

  model (data) {
    return model(data)
  }

  filter (data) {
    return filter(data)
  }

  run () {
    return this.get()
      .then(this.parse)
      .then(this.filter)
      .then(json => this.map(json))
      .then(this.model)
      .then(this.save)
  }
}

export default Task
