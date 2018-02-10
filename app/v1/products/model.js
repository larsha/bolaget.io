import Elastic from '../../lib/elastic'
import { toNumber, numberToBool } from '../../lib/utils'

export default class Model extends Elastic {
  static get alias () {
    return 'products'
  }

  constructor (data) {
    super(data['ARTIKLAR']['ARTIKEL'])
  }

  get model () {
    return {
      NR: { value: 'nr' },
      ARTIKELID: { value: 'article_id', transform: toNumber },
      VARNUMMER: { value: 'article_nr', transform: toNumber },
      NAMN: { value: 'name' },
      NAMN2: { value: 'additional_name' },
      PRISINKLMOMS: { value: 'price', transform: this.transformPrice },
      VOLYMIML: { value: 'volume_in_milliliter', transform: parseFloat },
      PRISPERLITER: { value: 'price_per_liter', transform: parseFloat },
      SALJSTART: { value: 'sales_start' },
      UTGÅTT: { value: 'expired', transform: numberToBool },
      VARUGRUPP: { value: 'product_group' },
      TYP: { value: 'type' },
      STIL: { value: 'style' },
      FORPACKNING: { value: 'packaging' },
      FORSLUTNING: { value: 'sealing' },
      URSPRUNG: { value: 'origin' },
      URSPRUNGLAND: { value: 'origin_country' },
      PRODUCENT: { value: 'producer' },
      LEVERANTOR: { value: 'provider' },
      ARGANG: { value: 'year', transform: toNumber },
      PROVADARGANG: { value: 'year_tested', transform: toNumber },
      ALKOHOLHALT: { value: 'alcohol' },
      SORTIMENT: { value: 'assortment' },
      EKOLOGISK: { value: 'ecological', transform: numberToBool },
      ETISKT: { value: 'ethical', transform: numberToBool },
      KOSCHER: { value: 'koscher', transform: numberToBool }
    }
  }

  get mapping () {
    return {
      properties: {
        nr: { type: 'keyword', index: true },
        article_id: { type: 'integer', index: true },
        article_nr: { type: 'integer', index: true },
        name: {
          type: 'text',
          index: true,
          analyzer: 'swedish',
          fields: {
            sort: {
              type: 'text',
              fielddata: true,
              analyzer: 'swedish_sort'
            }
          }
        },
        additional_name: { type: 'text', index: true, analyzer: 'swedish' },
        price: {
          properties: {
            amount: { type: 'double', index: true },
            currency: { type: 'keyword', index: true }
          }
        },
        volume_in_milliliter: { type: 'double', index: true },
        price_per_liter: { type: 'double', index: true },
        sales_start: { type: 'date', index: true },
        expired: { type: 'boolean', index: true },
        product_group: { type: 'text', index: true, analyzer: 'swedish' },
        type: { type: 'text', index: true, analyzer: 'swedish' },
        style: { type: 'text', index: true, analyzer: 'swedish' },
        packaging: { type: 'text', index: true, analyzer: 'swedish' },
        sealing: { type: 'text', index: true, analyzer: 'swedish' },
        origin: { type: 'text', index: true, analyzer: 'swedish' },
        origin_country: { type: 'text', index: true, analyzer: 'swedish' },
        producer: { type: 'text', index: true, analyzer: 'swedish' },
        provider: { type: 'text', index: true, analyzer: 'swedish' },
        year: { type: 'short', index: true },
        year_tested: { type: 'short', index: true },
        alcohol: { type: 'keyword', index: true },
        assortment: { type: 'text', index: true, analyzer: 'swedish' },
        ecological: { type: 'boolean', index: true },
        ethical: { type: 'boolean', index: true },
        koscher: { type: 'boolean', index: true }
      }
    }
  }

  transformPrice (price) {
    return {
      amount: parseFloat(price),
      currency: 'SEK'
    }
  }
}
