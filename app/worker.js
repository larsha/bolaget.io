import Elastic from './lib/elastic'
import logger from 'winston'
import ProductsTask from './lib/worker/tasks/products'
import StoresTask from './lib/worker/tasks/stores'

const productsTask = new ProductsTask()
const storesTask = new StoresTask()

try {
  const { products, stores } = await Promise.all([productsTask.get(), storesTask.get()])
  const { newIndex, oldIndex } = await Elastic.newAlias()

  await Elastic.createIndex(newIndex)
  await Promise.all([
    productsTask.index(products, newIndex),
    storesTask.index(stores, newIndex)
  ])
  await Elastic.deleteIndex(oldIndex)
  await Elastic.deleteAlias(oldIndex)
  await Elastic.putAlias(newIndex)
  logger.info(`${new Date()}: Inserted products and stores!`)
  process.exit()
} catch (e) {
  logger.info(`${new Date()}: ${e}`)
  process.exit(1)
}
