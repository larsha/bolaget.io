import escape from 'escape-string-regexp'
import { mongoose } from '../lib/connections'

function stringToBool (str) {
  return str == 'true'
}

function fuzzySearch (str) {
  return new RegExp(`.*${escape(str)}.*`, 'i');
}

export default async (ctx, next) => {
  const Product = mongoose.model('Product')

  const limit = parseInt(ctx.query.limit, 10) || 10
  const skip = parseInt(ctx.query.skip, 10) || 0
  const ecological = stringToBool(ctx.query.ecologial)
  const ethical = stringToBool(ctx.query.ethical)
  const koscher = stringToBool(ctx.query.koscher)
  const year_from = parseInt(ctx.query.year_from, 10) || 0
  const year_to = parseInt(ctx.query.year_to, 10) || 0
  const price_from = parseInt(ctx.query.price_from, 10) || 0
  const price_to = parseInt(ctx.query.price_to, 10) || 0
  const volume_from = parseInt(ctx.query.volume_from, 10) || 0
  const volume_to = parseInt(ctx.query.volume_to, 10) || 0
  const sort_by = ctx.query.sort_by || 'name'
  const sort_order = ctx.query.sort_order || 1
  const name = ctx.query.name
  const type = ctx.query.type
  const style = ctx.query.style
  const product_group = ctx.query.product_group

  let filter = {}
  if (ecological) {
    Object.assign(filter, { ecological: true })
  }

  if (ethical) {
    Object.assign(filter, { ethical: true })
  }

  if (koscher) {
    Object.assign(filter, { koscher: true })
  }

  if (product_group) {
    let regexp = new RegExp(`^${escape(product_group)}$`, 'i');
    Object.assign(filter, { product_group: regexp })
  }

  if (name) {
    Object.assign(filter, { name: fuzzySearch(name) })
  }

  if (type) {
    Object.assign(filter, { type: fuzzySearch(type) })
  }

  if (style) {
    Object.assign(filter, { style: fuzzySearch(style) })
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

  if (volume_from) {
    Object.assign(filter, { volume_in_milliliter: { $gte: volume_from } })
  }

  if (volume_to) {
    Object.assign(filter, { volume_in_milliliter: { $lte: volume_to } })
  }

  if (volume_from && volume_to) {
    Object.assign(filter, { volume_in_milliliter: { $gte: volume_from, $lte: volume_to } })
  }

  if (year_from) {
    Object.assign(filter, { year: { $gte: year_from } })
  }

  if (year_to) {
    Object.assign(filter, { year: { $lte: year_to } })
  }

  if (year_from && year_to) {
    Object.assign(filter, { year: { $gte: year_from, $lte: year_to } })
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

  if (products.length <= 0) {
    let e = new Error(`Products doesn't exists`)
    e.status = 404
    throw e
  }

  ctx.body = products
}
