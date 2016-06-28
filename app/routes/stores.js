import { mongoose } from '../lib/connections'

export default async (ctx, next) => {
  const Store = mongoose.model('Store')
  const limit = parseInt(ctx.query.limit, 10) || 10
  const skip = parseInt(ctx.query.skip, 10) || 0

  const filter = {}

  const stores = await Store.find(filter, { _id: 0 })
    .skip(skip)
    .limit(limit)
    .sort({ name: 1 })
    .exec()

  ctx.body = stores
}
