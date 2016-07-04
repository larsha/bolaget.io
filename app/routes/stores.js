import { mongoose } from '../lib/connections'
import { capitalize, caseInsensitive, fuzzySearch } from '../lib/utils'

function mapLabels (labels) {
  return labels.split(',').map(capitalize)
}

export default async (ctx, next) => {
  const Store = mongoose.model('Store')
  const maxLimit = 100

  const offset = parseInt(ctx.query.offset, 10) || 0
  const sort = ctx.query.sort || 'type'
  const type = ctx.query.type
  const city = ctx.query.city
  const name = ctx.query.name
  const labels = ctx.query.labels

  let limit = parseInt(ctx.query.limit, 10) || 10

  if (limit > maxLimit) {
    limit = maxLimit
  }

  const filter = {}

  if (city) {
    Object.assign(filter, { city: caseInsensitive(city) })
  }

  if (name) {
    Object.assign(filter, { name: fuzzySearch(name) })
  }

  if (type) {
    Object.assign(filter, { type: caseInsensitive(type) })
  }

  if (labels) {
    Object.assign(filter, { labels: { $all: mapLabels(labels) } })
  }

  const getStores = Store.find(filter, { _id: 0 })
    .skip(offset)
    .limit(limit)
    .sort(sort)
    .exec()

  const getCount = Store.count(filter).exec()

  const [stores, count] = await Promise.all([getStores, getCount])

  if (stores.length <= 0) {
    let e = new Error(`Stores doesn't exists`)
    e.status = 404
    throw e
  }

  ctx.set('X-Total-Count', count)
  ctx.body = stores
}
