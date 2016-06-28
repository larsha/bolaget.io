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
    Object.assign(filter, {
      $text: {
        $search: name
      }
    })
  }

  const products = await Product.find(filter, { _id: 0 })
    .skip(skip)
    .limit(limit)
    .sort({ name: 1 })
    .exec()

  ctx.body = products
}
