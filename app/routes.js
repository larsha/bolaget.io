import router from 'koa-simple-router'
import index from './routes/index'
import products from './routes/products'
import product from './routes/product'
import stores from './routes/stores'

export default () => {
  return router(r => {
    r.get('/', index)
    r.get('/products/:nr', product)
    r.get('/products', products)
    r.get('/stores', stores)
  })
}
