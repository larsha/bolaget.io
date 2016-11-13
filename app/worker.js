import Elastic from './lib/elastic'
import logger from 'winston'
import ProductsTask from './lib/worker/tasks/products'
import StoresTask from './lib/worker/tasks/stores'

async function worker () {
  try {
    const productsTask = new ProductsTask()
    const storesTask = new StoresTask()

    const [products, stores] = await Promise.all([
      productsTask.get(),
      storesTask.get()
    ])

    // setup new index
    const newIndex = new Date().getTime().toString()
    await Elastic.createIndex(newIndex)

    await Promise.all([
      productsTask.index(products, newIndex),
      storesTask.index(stores, newIndex)
    ])

    await Elastic.putAlias(newIndex)

    // remove old ones
    const indexes = await Elastic.getIndex()
    const oldIndexes = Object.keys(indexes)
      .filter(o => o !== newIndex)
      .join()

    await Elastic.deleteIndex(oldIndexes)

    logger.info(`${new Date()}: worker done!`)
    process.exit()
  } catch (e) {
    logger.info(`${new Date()}: ${e.stack}`)
    process.exit(1)
  }
}

worker()
