import { mongoose } from '../lib/connections'
import { fuzzySearch, stringToBool, caseInsensitive } from '../lib/utils'

export default async (ctx, next) => {
  const Product = mongoose.model('Product')
  const maxLimit = 100

  const skip = parseInt(ctx.query.skip, 10) || 0
  const ecological = stringToBool(ctx.query.ecologial)
  const ethical = stringToBool(ctx.query.ethical)
  const koscher = stringToBool(ctx.query.koscher)
  const yearFrom = parseInt(ctx.query.year_from, 10) || 0
  const yearTo = parseInt(ctx.query.year_to, 10) || 0
  const priceFrom = parseInt(ctx.query.price_from, 10) || 0
  const priceTo = parseInt(ctx.query.price_to, 10) || 0
  const volumeFrom = parseInt(ctx.query.volume_from, 10) || 0
  const volumeTo = parseInt(ctx.query.volume_to, 10) || 0
  const sort = ctx.query.sort || 'name'
  const name = ctx.query.name
  const type = ctx.query.type
  const style = ctx.query.style
  const productGroup = ctx.query.product_group

  let limit = parseInt(ctx.query.limit, 10) || 10

  if (limit > maxLimit) {
    limit = maxLimit
  }

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

  if (productGroup) {
    Object.assign(filter, { product_group: caseInsensitive(productGroup) })
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

  if (priceFrom) {
    Object.assign(filter, { price: { $gte: priceFrom } })
  }

  if (priceTo) {
    Object.assign(filter, { price: { $lte: priceTo } })
  }

  if (priceFrom && priceTo) {
    Object.assign(filter, { price: { $gte: priceFrom, $lte: priceTo } })
  }

  if (volumeFrom) {
    Object.assign(filter, { volume_in_milliliter: { $gte: volumeFrom } })
  }

  if (volumeTo) {
    Object.assign(filter, { volume_in_milliliter: { $lte: volumeTo } })
  }

  if (volumeFrom && volumeTo) {
    Object.assign(filter, { volume_in_milliliter: { $gte: volumeFrom, $lte: volumeTo } })
  }

  if (yearFrom) {
    Object.assign(filter, { year: { $gte: yearFrom } })
  }

  if (yearTo) {
    Object.assign(filter, { year: { $lte: yearTo } })
  }

  if (yearFrom && yearTo) {
    Object.assign(filter, { year: { $gte: yearFrom, $lte: yearTo } })
  }

  const getProducts = Product.find(filter, { _id: 0 })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .exec()

  const getCount = Product.count(filter).exec()

  const [products, count] = await Promise.all([getProducts, getCount])

  if (products.length <= 0) {
    let e = new Error(`Products doesn't exists`)
    e.status = 404
    throw e
  }

  ctx.set('X-Total-Count', count)
  ctx.body = products
}
