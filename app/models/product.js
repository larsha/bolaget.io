import mongoose from 'mongoose'
const Schema = mongoose.Schema

function filter (data) {
  return data['ARTIKLAR']['ARTIKEL']
}

const mapping = {
  NR: 'nr',
  ARTIKELID: 'article_id',
  VARNUMMER: 'article_nr',
  NAMN: 'name',
  NAMN2: 'name_2',
  PRISINKMOMS: 'price',
  VOLYMIML: 'volume_in_milliliter',
  PRISPERLITER: 'price_per_liter',
  SALJSTART: 'sales_start',
  'UTGÅTT': 'expired',
  VARUGRUPP: 'product_group',
  TYP: 'type',
  STIL: 'style',
  FORPACKNING: 'packaging',
  FORSLUTNING: 'sealing',
  URSPRUNG: 'origin',
  URSPRUNGLAND: 'origin_country',
  PRODUCENT: 'producer',
  LEVERANTOR: 'provider',
  ARGANG: 'year',
  PROVADARGANG: 'year_tested',
  ALKOHOLHALT: 'alcohol',
  SORTIMENT: 'assortment',
  EKOLOGISK: 'ecological',
  ETISKT: 'ethical',
  KOSCHER: 'koscher'
}

let productSchema = new Schema({
  nr: { type: Number, required: true },
  article_id: { type: Number, required: true },
  article_nr: { type: Number, required: true },
  name: { type: String, required: true, index: true },
  name_2: { type: String },
  price: { type: Number, index: true },
  volume_in_milliliter: { type: Number, index: true },
  price_per_liter: { type: Number, index: true },
  sales_start: { type: String },
  expired: { type: Boolean },
  product_group: { type: String },
  type: { type: String },
  style: { type: String },
  packaging: { type: String },
  sealing: { type: String },
  origin: { type: String },
  origin_country: { type: String },
  producer: { type: String },
  provider: { type: String },
  year: { type: Number, index: true },
  year_tested: { type: Number },
  alcohol: { type: String, index: true },
  assortment: { type: String },
  ecological: { type: Boolean, index: true },
  ethical: { type: Boolean, index: true },
  koscher: { type: Boolean, index: true }
})

productSchema.index({ name: 'text' })

mongoose.model('Product', productSchema)

export { mapping, filter }
