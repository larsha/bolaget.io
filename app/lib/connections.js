import mongoose from 'mongoose'

const socketOptions = {
  keepAlive: 300000,
  connectTimeoutMS: 30000
}

// https://gist.github.com/mongolab-org/9959376
const options = {
  server: {
    auto_reconnect: true,
    reconnectTries: Number.MAX_VALUE,
    socketOptions
  },
  replset: {
    socketOptions
  }
}

// Setup mongoose models
import '../models/product'
import '../models/store'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/systembolaget_api', options)
mongoose.Promise = global.Promise

if (process.env.DEBUG_MONGO) {
  mongoose.set('debug', true)
}

const mongooseConnection = mongoose.connection

export { mongoose, mongooseConnection }
