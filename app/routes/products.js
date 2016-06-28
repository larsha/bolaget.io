import escape from 'escape-string-regexp'
import { mongoose } from '../lib/connections'

function stringToBool (str) {
  return str == 'true'
}

export default async (ctx, next) => {
  const Product = mongoose.model('Product')

  const limit = parseInt(ctx.query.limit, 10) || 10
  const skip = parseInt(ctx.query.skip, 10) || 0
  const year = parseInt(ctx.query.year, 10) || 0
  const ecological = stringToBool(ctx.query.ecologial)
  const ethical = stringToBool(ctx.query.ethical)
  const koscher = stringToBool(ctx.query.koscher)
  const name = ctx.query.name
  const price_from = parseInt(ctx.query.price_from, 10) || 0
  const price_to = parseInt(ctx.query.price_to, 10) || 0
  const sort_by = ctx.query.sort_by || 'name'
  const sort_order = ctx.query.sort_order || 1

  let filter = {}
  if (year > 0) {
    Object.assign(filter, { year })
  }

  if (ecological) {
    Object.assign(filter, { ecological: true })
  }

  if (ethical) {
    Object.assign(filter, { ethical: true })
  }

  if (koscher) {
    Object.assign(filter, { koscher: true })
  }

  if (name) {
    const regexp = new RegExp(`.*${escape(name)}.*`);
    Object.assign(filter, { name: { $regex: regexp } })
  }

  if (price_from) {
    Object.assign(filter, { price: { $gte: price_from } })
  }

  if (price_to) {
    Object.assign(filter, { price: { $lte: price_to } })
  }

  if (price_from && price_to) {
    Object.assign(filter, { price: { $gte: price_from, $lte: price_to } })
  }

  if (sort_by) {
    const exists = { $exists: true, $nin: ['', null] }
    if (filter.hasOwnProperty(sort_by)) {
      Object.assign(filter[sort_by], exists)
    } else {
      Object.assign(filter, { [sort_by]: exists })
    }
  }

  const products = await Product.find(filter, { _id: 0 })
    .skip(skip)
    .limit(limit)
    .sort({ [sort_by]: sort_order })
    .exec()

  ctx.body = products
}
