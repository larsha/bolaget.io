import Product from '../../../models/product'
import Request from '../../request'

class Task extends Request {
  constructor () {
    super('http://www.systembolaget.se/api/assortment/products/xml')
  }

  index (products, index) {
    return Product.putMapping()
      .then(() => {
        const data = Product.reduce(products).map(obj => {
          return new Product(obj)
        })

        return Product.bulk(data, index)
      })
  }
}

export default Task
