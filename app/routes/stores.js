import { mongoose } from '../lib/connections'

export default async (ctx, next) => {
  const Store = mongoose.model('Store')
  const limit = parseInt(ctx.query.limit, 10) || 10
  const skip = parseInt(ctx.query.skip, 10) || 0
  const sort_by = ctx.query.sort_by || 'type'
  const sort_order = ctx.query.sort_order || 1

  const filter = {}

  if (sort_by) {
    const exists = { $exists: true, $nin: ['', null] }
    if (filter.hasOwnProperty(sort_by)) {
      Object.assign(filter[sort_by], exists)
    } else {
      Object.assign(filter, { [sort_by]: exists })
    }
  }

  const stores = await Store.find(filter, { _id: 0 })
    .skip(skip)
    .limit(limit)
    .sort({ [sort_by]: sort_order })
    .exec()

  ctx.body = stores
}
