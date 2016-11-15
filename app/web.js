import Koa from 'koa'
import path from 'path'
import logger from 'koa-logger'
import parser from 'koa-bodyparser'
import views from 'koa-views'

import routes from './routes'
import config from './config'

// 404
const error404 = {
  error: 'Move along, nothing to see here!'
}

// 500
const error500 = {
  error: 'Ouch, an ugly error has occured!'
}

const app = new Koa()

// Logs information
app.use(logger())

// Parses json body requests
app.use(parser())

app.use(views(path.join(__dirname, 'views'), {
  extension: 'hbs',
  map: {
    hbs: 'handlebars'
  }
}))

// Handle errors
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.status === 404 ? error404 : error500
  }
})

// Setup routes
app.use(routes())

// 404
app.use(async ctx => {
  ctx.status = 404
  ctx.body = error404
})

app.listen(config.PORT)

export default app
