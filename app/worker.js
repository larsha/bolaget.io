import Elastic from './lib/elastic'
import logger from 'winston'
import ProductsTask from './lib/worker/tasks/products'
import StoresTask from './lib/worker/tasks/stores'

const productsTask = new ProductsTask()
const storesTask = new StoresTask()

Promise.all([productsTask.get(), storesTask.get()])
  .then(([products, stores]) => {
    return Elastic.getIndex()
      .then(Elastic.deleteIndex)
      .then(Elastic.createIndex)
      .catch(Elastic.createIndex)
      .then(() => {
        return Promise.all([productsTask.index(products), storesTask.index(stores)])
      })
      .then(() => {
        logger.info(`${new Date()}: Inserted products and stores!`)
        process.exit()
      })
  })
  .catch(() => {
    process.exit()
  })
