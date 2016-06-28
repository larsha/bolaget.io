import Koa from 'koa'
import router from 'koa-simple-router'
import logger from 'koa-logger'
import parser from 'koa-bodyparser'
import routes from './routes'
import { mongooseConnection } from './lib/connections'

const app = new Koa()

// Logs information
app.use(logger())

// Parses json body requests
app.use(parser())

// 500
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = { message: err.message }
  }
})

// Setup routes
app.use(routes())

// 404
app.use(async ctx => {
  ctx.status = 404
  ctx.body = {
    message: 'Move Along, Nothing to See Here!'
  }
})

mongooseConnection.on('connected', () => {
  app.listen(process.env.PORT || 3000)
})

export default app
