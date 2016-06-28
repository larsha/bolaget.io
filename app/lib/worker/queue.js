import jb from 'jackrabbit'

class Queue {
  constructor (name) {
    this.name = name
  }

  connect () {
    this.queue = jb(process.env.RABBIT_URL || 'amqp://127.0.0.1:5672')

    return new Promise((resolve, reject) => {
      this.queue
        .on('connected', resolve)
        .on('error', reject)
    })
  }

  publish (message) {
    return this.queue.default().publish(message, { key: this.name }).on('drain', this.queue.close)
  }

  consume (onData) {
    return this.queue.default().queue({ name: this.name }).consume(onData, { noAck: true })
  }
}

export default Queue
