import Koa from 'koa'
import router from 'koa-simple-router'
import path from 'path'
import logger from 'koa-logger'
import parser from 'koa-bodyparser'
import views from 'koa-views'
import http from 'http'
import addShutdown from 'http-shutdown'

import routes from './routes'
import config from './config'
import { sleep } from './lib/utils'

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

let server = http.createServer(app.callback())
server = addShutdown(server)
server.listen(config.PORT)

// Start the system server for health checks and graceful shutdowns
const system = new Koa()

let ready = false

system.use(router(r => {
  r.get('/ready', ctx => {
    if (ready) {
      ctx.status = 200
    } else {
      ctx.status = 503
    }
  })

  r.get('/prestop', async ctx => {
    ready = false
    await sleep(10)
    ctx.status = 200
  })
}))

system.listen(config.SYSTEM_PORT)

process.on('SIGTERM', async () => {
  ready = false
  await sleep(10)
  server.shutdown(() => process.exit(0))
})

ready = true
