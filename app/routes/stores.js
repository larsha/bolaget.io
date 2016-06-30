import { mongoose } from '../lib/connections'

export default async (ctx, next) => {
  const Store = mongoose.model('Store')
  const maxLimit = 100

  const limit = parseInt(ctx.query.limit, 10) || 10
  const skip = parseInt(ctx.query.skip, 10) || 0
  const sort = ctx.query.sort || 'type'

  if (limit > maxLimit) {
    limit = maxLimit
  }

  const filter = {}

  const getStores = Store.find(filter, { _id: 0 })
    .skip(skip)
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
