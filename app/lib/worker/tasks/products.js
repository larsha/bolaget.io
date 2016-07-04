import { mongoose } from '../../connections'
import { mapping, reduce } from '../../../models/product'
import Request from '../../request'

const Product = mongoose.model('Product')

class Task extends Request {
  constructor () {
    super('http://www.systembolaget.se/api/assortment/products/xml', mapping)
  }

  save (data) {
    return Product.remove().then(() => Product.insertMany(data))
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
