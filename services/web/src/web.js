import Koa from 'koa'
import Router from 'koa-router'
import koaLogger from 'koa-logger'
import views from 'koa-views'
import http from 'http'
import addShutdown from 'http-shutdown'
import routes from './routes'
import config from './config'
import { sleep } from './lib/utils'
import logger from './lib/logger'

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
app.use(koaLogger())

app.use(views(__dirname, {
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
app
  .use(routes.routes())
  .use(routes.allowedMethods())

// 404
app.use(async ctx => {
  ctx.status = 404
  ctx.body = error404
})

let server = http.createServer(app.callback())
server = addShutdown(server)
server.listen(config.PORT)

// Start the system server for health checks and graceful shutdowns
const system = new Koa()
const router = new Router()
let ready = false

router.get('/ready', ctx => {
  if (ready) {
    ctx.status = 200
  } else {
    ctx.status = 503
  }
})

router.get('/prestop', async ctx => {
  ready = false
  await sleep(10)
  ctx.status = 200
})

system
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.SYSTEM_PORT)

process.on('SIGTERM', async () => {
  ready = false
  await sleep(10)
  server.shutdown(() => process.exit(0))
})

ready = true
logger.info(process.env.VAULT_TEST)
