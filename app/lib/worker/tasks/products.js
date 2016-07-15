import Product from '../../../models/product'
import Request from '../../request'

class Task extends Request {
  constructor () {
    super('http://www.systembolaget.se/api/assortment/products/xml')
  }

  save (products) {
    return Product.putMapping()
      .then(() => {
        const data = products.map(obj => {
          return new Product(obj)
        })

        return Product.bulk(data)
      })
  }

  index (products) {
    return this.save(Product.reduce(products))
  }
}

export default Task
