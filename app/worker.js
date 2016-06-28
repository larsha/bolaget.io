import { mongooseConnection } from './lib/connections'
import ProductsTask from './lib/worker/tasks/products'
import StoresTask from './lib/worker/tasks/stores'
import logger from 'winston'

const productsTask = new ProductsTask()
const storeTask = new StoresTask()

mongooseConnection.on('connected', () => {
  const products = productsTask.run()
  const stores = storeTask.run()

  Promise.all([products, stores])
    .then(() => {
      logger.info('Inserted products and stores!')
    })
    .catch(err => logger.error(err))
})
