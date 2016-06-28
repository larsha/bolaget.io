import router from 'koa-simple-router'
import products from './routes/products'
import stores from './routes/stores'

export default () => {
  return router(r => {
    r.get('/products', products)
    r.get('/stores', stores)
  })
}
