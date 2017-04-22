import Product from '../../models/v1/product'
import { stringToBool, fuzzyMatch, rangeMatch } from '../../lib/utils'

export default async (ctx, next) => {
  const maxLimit = 100
  const ecological = ctx.query.ecological
  const ethical = ctx.query.ethical
  const koscher = ctx.query.koscher
  const offset = parseInt(ctx.query.offset, 10) || 0
  const search = ctx.query.search
  const name = ctx.query.name
  const type = ctx.query.type
  const style = ctx.query.style
  const provider = ctx.query.provider
  const producer = ctx.query.producer
  const origin = ctx.query.origin
  const originCountry = ctx.query.origin_country
  const packaging = ctx.query.packaging
  const productGroup = ctx.query.product_group
  const sealing = ctx.query.sealing
  const assortment = ctx.query.assortment
  const yearFrom = parseInt(ctx.query.year_from, 10) || 0
  const yearTo = parseInt(ctx.query.year_to, 10) || 0
  const priceFrom = parseInt(ctx.query.price_from, 10) || 0
  const priceTo = parseInt(ctx.query.price_to, 10) || 0
  const volumeFrom = parseInt(ctx.query.volume_from, 10) || 0
  const volumeTo = parseInt(ctx.query.volume_to, 10) || 0

  let limit = parseInt(ctx.query.limit, 10) || 10
  let sort = ctx.query.sort

  if (limit > maxLimit) {
    limit = maxLimit
  }

  let query = {}

  query.bool = {
    must: [
      { term: { ecological: stringToBool(ecological) } },
      { term: { ethical: stringToBool(ethical) } },
      { term: { koscher: stringToBool(koscher) } }
    ]
  }

  if (name) {
    query.bool.must.push(fuzzyMatch('name', name))
  }

  if (type) {
    query.bool.must.push(fuzzyMatch('type', type))
  }

  if (style) {
    query.bool.must.push(fuzzyMatch('style', style))
  }

  if (provider) {
    query.bool.must.push(fuzzyMatch('provider', provider))
  }

  if (producer) {
    query.bool.must.push(fuzzyMatch('producer', producer))
  }

  if (origin) {
    query.bool.must.push(fuzzyMatch('origin', origin))
  }

  if (originCountry) {
    query.bool.must.push(fuzzyMatch('origin_country', originCountry))
  }

  if (packaging) {
    query.bool.must.push(fuzzyMatch('packaging', packaging))
  }

  if (productGroup) {
    query.bool.must.push(fuzzyMatch('product_group', productGroup))
  }

  if (sealing) {
    query.bool.must.push(fuzzyMatch('sealing', sealing))
  }

  if (assortment) {
    query.bool.must.push({
      match: {
        assortment: {
          query: assortment
        }
      }
    })
  }

  if (yearFrom || yearTo) {
    query.bool.must.push(rangeMatch('year', yearFrom, yearTo))
  }

  if (priceFrom || priceTo) {
    query.bool.must.push(rangeMatch('price.amount', priceFrom, priceTo))
  }

  if (volumeFrom || volumeTo) {
    query.bool.must.push(rangeMatch('volume_in_milliliter', volumeFrom, volumeTo))
  }

  if (search) {
    query.bool.filter = {
      multi_match: {
        query: search,
        fields: [ 'name^2', 'additional_name', 'type^2', 'style^2', 'provider', 'producer', 'origin', 'origin_country', 'sealing', 'product_group', 'packaging' ],
        type: 'phrase',
        fuzziness: 'AUTO',
        prefix_length: 0
      }
    }
  }

  const [prop, order] = (sort || '').split(':')

  switch (prop) {
    case 'volume_in_milliliter':
    case 'year':
    case 'price_per_liter':
      sort = { [prop]: { order } }
      break
    case 'price':
      sort = { 'price.amount': { order } }
      break
    case 'name':
      sort = { 'name.sort': { order } }
      break
    default:
      sort = { 'name.sort': { order: 'asc' } }
  }

  const { result, count } = await Product.find(query, offset, limit, sort)

  ctx.set('X-Total-Count', count)
  ctx.body = result
}
