import Model from './model'
import logger from '../../lib/logger'
import { fuzzyMatch, listToArray } from '../../lib/utils'

export async function store (ctx, next) {
  const id = ctx.params.id || null

  const store = await Model.getById(id)
    .catch(e => logger.error(e))

  if (store) {
    ctx.body = store
  } else {
    ctx.throw(404)
  }
}

export async function stores (ctx, next) {
  const maxLimit = 100
  const offset = parseInt(ctx.query.offset, 10) || 0
  const type = ctx.query.type
  const city = ctx.query.city
  const county = ctx.query.county
  const name = ctx.query.name
  const labels = ctx.query.labels
  const address = ctx.query.address
  const search = ctx.query.search

  let limit = parseInt(ctx.query.limit, 10) || 10
  let sort = ctx.query.sort

  if (limit > maxLimit) {
    limit = maxLimit
  }

  let query = {
    bool: {
      must: []
    }
  }

  if (type) {
    query.bool.must.push(fuzzyMatch('type', type))
  }

  if (name) {
    query.bool.must.push(fuzzyMatch('name', name))
  }

  if (address) {
    query.bool.must.push(fuzzyMatch('address', address))
  }

  if (city) {
    query.bool.must.push(fuzzyMatch('city', city))
  }

  if (county) {
    query.bool.must.push(fuzzyMatch('county', county))
  }

  if (labels) {
    const list = listToArray(labels)

    list.forEach(str => {
      query.bool.must.push({
        match: {
          labels: {
            query: str,
            fuzziness: 'AUTO'
          }
        }
      })
    })
  }

  if (search) {
    query.bool.filter = {
      multi_match: {
        query: search,
        fields: [ 'name^2', 'address', 'additional_address', 'city', 'county', 'labels' ],
        type: 'phrase'
      }
    }
  }

  const [prop, order] = (sort || '').split(':')

  switch (prop) {
    case 'RT90x':
    case 'RT90Y':
    case 'zip_code':
      sort = { [prop]: { order } }
      break
    case 'address':
      sort = { 'address.sort': { order } }
      break
    case 'county':
      sort = { 'county.sort': { order } }
      break
    case 'city':
      sort = { 'city.sort': { order } }
      break
    default:
      sort = { 'zip_code': { order: 'asc' } }
  }

  const { result, count } = await Model.find(query, offset, limit, sort)
    .catch(e => logger.error(e))

  ctx.set('x-total-count', count)

  if (result) {
    ctx.body = result
  } else {
    ctx.throw(404)
  }
}
