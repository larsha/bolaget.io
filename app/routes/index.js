import { name, url, version, description, engines, author, license } from '../../package.json'

export default async (ctx, next) => {
  ctx.body = {
    name,
    url,
    version,
    description,
    engines,
    author,
    license,
    "endpoints": {
      "products/:nr": "https://bolaget.io/products/3083303",
      "products": "https://bolaget.io/products",
      "stores": "https://bolaget.io/stores",
    }
  }
}
