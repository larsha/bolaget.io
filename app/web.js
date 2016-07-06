import Koa from 'koa'
import path from 'path'
import logger from 'koa-logger'
import parser from 'koa-bodyparser'
import views from 'koa-views'
import routes from './routes'

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
    ctx.body = { error: err.message }
  }
})

// Setup routes
app.use(routes())

// 404
app.use(async ctx => {
  ctx.status = 404
  ctx.body = {
    error: 'Move Along, Nothing to See Here!'
  }
})

app.listen(process.env.PORT || 3000)

export default app
