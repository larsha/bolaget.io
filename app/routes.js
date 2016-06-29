import router from 'koa-simple-router'
import products from './routes/products'
import product from './routes/product'
import stores from './routes/stores'

export default () => {
  return router(r => {
    r.get('/', async ctx => {
      await ctx.render('index')
    })

    // API
    r.get('/products/:nr', product)
    r.get('/products', products)
    r.get('/stores', stores)
  })
}
