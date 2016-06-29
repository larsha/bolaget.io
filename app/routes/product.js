import { mongoose } from '../lib/connections'

export default async (ctx, next) => {
  const Product = mongoose.model('Product')
  const nr = parseInt(ctx.params.nr) || null

  const product = await Product.findOne({ nr }, { _id: 0 }).exec()

  if (!product) {
    let e = new Error(`Product doesn't exist`)
    e.status = 404
    throw e
  }

  ctx.body = product
}
