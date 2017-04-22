import router from 'koa-simple-router'

// v1
import v1Products from './routes/v1/products'
import v1Product from './routes/v1/product'
import v1Stores from './routes/v1/stores'
import v1Store from './routes/v1/store'

export default () => {
  return router(r => {
    r.get('/', async ctx => await ctx.render('index'))

    r.get('/products/:id', v1Product)
    r.get('/products', v1Products)
    r.get('/stores/:id', v1Store)
    r.get('/stores', v1Stores)

    r.get('/v1/products/:id', v1Product)
    r.get('/v1/products', v1Products)
    r.get('/v1/stores/:id', v1Store)
    r.get('/v1/stores', v1Stores)
  })
}
