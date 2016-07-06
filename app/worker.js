import Elastic from './lib/elastic'
import logger from 'winston'
import ProductsTask from './lib/worker/tasks/products'
import StoresTask from './lib/worker/tasks/stores'

const productsTask = new ProductsTask()
const storeTask = new StoresTask()

Elastic.getIndex()
  .then(Elastic.deleteIndex)
  .then(Elastic.createIndex)
  .catch(Elastic.createIndex)
  .then(async () => {
    try {
      await Promise.all([productsTask.run(), storeTask.run()])
      logger.info('Inserted products and stores!')
    } catch (e) {
      logger.error(e)
    }

    process.exit()
  })
  .catch(() => {
    process.exit()
  })
