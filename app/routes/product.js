import Product from '../models/product'

export default async (ctx, next) => {
  const id = ctx.params.id || null

  const product = await Product.getById(id)

  ctx.body = product
}
