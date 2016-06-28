import { mongoose } from '../../connections'
import { mapping, filter } from '../../../models/product'
import Request from '../../request'

const Product = mongoose.model('Product')

class Task extends Request {
  constructor () {
    super('http://www.systembolaget.se/api/assortment/products/xml', mapping)
  }

  save (data) {
    return Product.remove().then(() => Product.insertMany(data))
  }

  filter (data) {
    return filter(data)
  }

  run () {
    return this.get()
      .then(this.parse)
      .then(this.filter)
      .then(json => this.map(json))
      .then(this.save)
  }
}

export default Task
