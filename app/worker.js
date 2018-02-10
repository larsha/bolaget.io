import Elastic from './lib/elastic'
import logger from './lib/logger'
import ProductsTask from './v1/products/task'
import StoresTask from './v1/stores/task'

(async () => {
  let timer = logger.startTimer()
  logger.info('starting worker...')

  const productsTask = new ProductsTask()
  const storesTask = new StoresTask()

  // Fetch data
  var [ products, stores ] = await Promise.all([
    productsTask.fetch()
      .then(p => {
        logger.info(`fetched products`)
        return p
      })
      .catch(e => {
        logger.error('fetching products', e)
        process.exit(1)
      }),
    storesTask.fetch()
      .then(s => {
        logger.info(`fetched stores`)
        return s
      })
      .catch(e => {
        logger.error('fetching stores', e)
        process.exit(1)
      }),
  ])

  // Index new data
  await Promise.all([
    productsTask.index(products)
      .then(() => logger.info('indexed products'))
      .catch(e => {
        logger.error('indexing products', e)
        process.exit(1)
      }),
    storesTask.index(stores)
      .then(() => logger.info('indexed stores'))
      .catch(e => {
        logger.error('indexing stores', e)
        process.exit(1)
      })
  ])

  timer.done('complete')
  process.exit()
})()
