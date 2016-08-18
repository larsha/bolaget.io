import Elastic from './lib/elastic'
import logger from 'winston'
import ProductsTask from './lib/worker/tasks/products'
import StoresTask from './lib/worker/tasks/stores'

const productsTask = new ProductsTask()
const storesTask = new StoresTask()

Promise.all([productsTask.get(), storesTask.get()])
  .then(([products, stores]) => {
    return Elastic.newAlias()
      .then(indexes => {
        const { newIndex, oldIndex } = indexes

        return Elastic.createIndex(newIndex)
          .then(() => Promise.all([
            productsTask.index(products, newIndex),
            storesTask.index(stores, newIndex)
          ]))
          .then(() => Elastic.deleteIndex(oldIndex))
          .then(() => Elastic.deleteAlias(oldIndex))
          .then(() => Elastic.putAlias(newIndex))
          .then(() => {
            logger.info(`${new Date()}: Inserted products and stores!`)
            process.exit()
          })
      })
  })
  .catch(e => {
    logger.info(`${new Date()}: ${e}`)
    process.exit()
  })
