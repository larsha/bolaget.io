import Router from 'koa-router'

import {
  product as v1Product,
  products as v1Products
} from './v1/products/route'

import {
  store as v1Store,
  stores as v1Stores
} from './v1/stores/route'

const router = new Router()

// Index
router.get('/', ctx => ctx.render('index'))

// Latest API
router.get('/products/:id', v1Product)
router.get('/products', v1Products)
router.get('/stores/:id', v1Store)
router.get('/stores', v1Stores)

// v1 API
router.get('/v1/products/:id', v1Product)
router.get('/v1/products', v1Products)
router.get('/v1/stores/:id', v1Store)
router.get('/v1/stores', v1Stores)

export default router
