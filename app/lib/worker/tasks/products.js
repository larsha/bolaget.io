import Product from '../../../models/product'
import Request from '../../request'

class Task extends Request {
  constructor () {
    super('http://www.systembolaget.se/api/assortment/products/xml')
  }

  save (products) {
    return Product.putMapping()
      .then(() => {
        return Promise.all(products.map(obj => {
          let product = new Product(obj)
          return product.save().catch(() => Promise.resolve())
        }))
      })
  }

  run () {
    return this.get()
      .then(this.parse)
      .then(json => Product.reduce(json))
      .then(this.save)
  }
}

export default Task
