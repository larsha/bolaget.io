import { mongooseConnection } from './lib/connections'
import ProductsTask from './lib/worker/tasks/products'
import StoresTask from './lib/worker/tasks/stores'
import logger from 'winston'

const productsTask = new ProductsTask()
const storeTask = new StoresTask()

mongooseConnection.on('connected', run)

async function run () {
  try {
    await Promise.all([productsTask.run(), storeTask.run()])
    logger.info('Inserted products and stores!')
  } catch (e) {
    logger.error(e)
  }

  process.exit()
}
