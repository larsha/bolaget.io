import mongoose from 'mongoose'
const Schema = mongoose.Schema

function reduce (data) {
  return data['ARTIKLAR']['ARTIKEL']
}

const mapping = {
  NR: 'nr',
  ARTIKELID: 'article_id',
  VARNUMMER: 'article_nr',
  NAMN: 'name',
  NAMN2: 'additional_name',
  PRISINKLMOMS: 'price',
  VOLYMIML: 'volume_in_milliliter',
  PRISPERLITER: 'price_per_liter',
  SALJSTART: 'sales_start',
  UTGÅTT: 'expired',
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

const Product = new Schema({
  nr: { type: Number, index: true, required: true },
  article_id: { type: Number, index: true, required: true },
  article_nr: { type: Number, index: true, required: true },
  name: { type: String, index: true, required: true },
  additional_name: { type: String, index: true, default: null },
  price: { type: Number, index: true, default: null },
  volume_in_milliliter: { type: Number, index: true, default: null },
  price_per_liter: { type: Number, index: true, default: null },
  sales_start: { type: String, index: true, default: null },
  expired: { type: Boolean, index: true, default: null },
  product_group: { type: String, index: true, default: null },
  type: { type: String, index: true, default: null },
  style: { type: String, index: true, default: null },
  packaging: { type: String, index: true, default: null },
  sealing: { type: String, index: true, default: null },
  origin: { type: String, index: true, default: null },
  origin_country: { type: String, index: true, default: null },
  producer: { type: String, index: true, default: null },
  provider: { type: String, index: true, default: null },
  year: { type: Number, index: true, default: null },
  year_tested: { type: Number, index: true, default: null },
  alcohol: { type: String, index: true, default: null },
  assortment: { type: String, index: true, default: null },
  ecological: { type: Boolean, index: true, default: null },
  ethical: { type: Boolean, index: true, default: null },
  koscher: { type: Boolean, index: true, default: null }
})

Product.index({ name: 'text' })

mongoose.model('Product', Product)

export { mapping, reduce }
