import Product from '../../models/v1/product'

export default async (ctx, next) => {
  const id = ctx.params.id || null

  const product = await Product.getById(id)

  ctx.body = product
}
