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
  PRISINKLMOMS: 'price',
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

const Product = new Schema({
  nr: { type: Number, required: true },
  article_id: { type: Number, required: true },
  article_nr: { type: Number, required: true },
  name: { type: String, required: true, index: true },
  name_2: { type: String, default: '' },
  price: { type: Number, index: true, default: null },
  volume_in_milliliter: { type: Number, index: true, default: null },
  price_per_liter: { type: Number, index: true, default: null },
  sales_start: { type: String, default: '' },
  expired: { type: Boolean, default: null },
  product_group: { type: String, default: '' },
  type: { type: String, default: '' },
  style: { type: String, default: '' },
  packaging: { type: String, default: '' },
  sealing: { type: String, default: '' },
  origin: { type: String, default: '' },
  origin_country: { type: String, default: '' },
  producer: { type: String, default: '' },
  provider: { type: String, default: '' },
  year: { type: Number, index: true, default: null },
  year_tested: { type: Number, default: null },
  alcohol: { type: String, index: true, default: '' },
  assortment: { type: String, default: '' },
  ecological: { type: Boolean, index: true, default: null },
  ethical: { type: Boolean, index: true, default: null },
  koscher: { type: Boolean, index: true, default: null }
})

Product.index({ name: 'text' })

mongoose.model('Product', Product)

export { mapping, filter }
