import Product from '../../../models/v1/product'
import Request from '../../request'

class Task extends Request {
  constructor () {
    super('https://www.systembolaget.se/api/assortment/products/xml')
  }

  async index (data, index) {
    await Product.putMapping(index)

    const products = Product.transform(data)
      .map(obj => new Product(obj))

    return Product.bulk(products, index)
  }
}

export default Task
