import logger from './lib/logger'
import ProductsTask from './v1/products/task'
import StoresTask from './v1/stores/task'

(async () => {
  const timer = logger.startTimer()
  logger.info('starting worker...')

  const productsTask = new ProductsTask()
  const storesTask = new StoresTask()

  // Fetch data
  const [products, stores] = await Promise.all([
    productsTask.fetch()
      .then(p => {
        logger.info('fetched products')
        return p
      })
      .catch(e => {
        logger.error('fetching products', e)
        return []
      }),
    storesTask.fetch()
      .then(s => {
        logger.info('fetched stores')
        return s
      })
      .catch(e => {
        logger.error('fetching stores', e)
        return []
      })
  ])

  // Index new data
  await Promise.all([
    productsTask.index(products)
      .then(() => logger.info('indexed products'))
      .catch(e => {
        logger.error('indexing products', e)
      }),
    storesTask.index(stores)
      .then(() => logger.info('indexed stores'))
      .catch(e => {
        logger.error('indexing stores', e)
      })
  ])

  timer.done({ message: 'complete' })
  process.exit()
})()
