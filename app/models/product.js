import { toNumber, numberToBool } from '../lib/utils'
import Elastic from '../lib/elastic'

class Product extends Elastic {
  static reduce (data) {
    return data['ARTIKLAR']['ARTIKEL']
  }

  static get model () {
    return {
      NR: { value: 'nr' },
      ARTIKELID: { value: 'article_id', transform: toNumber },
      VARNUMMER: { value: 'article_nr', transform: toNumber },
      NAMN: { value: 'name' },
      NAMN2: { value: 'additional_name' },
      PRISINKLMOMS: { value: 'price', transform: parseFloat },
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

  static get mapping () {
    return {
      _all: {
        enabled: false
      },
      properties: {
        nr: { type: 'string', index: 'not_analyzed' },
        article_id: { type: 'long', index: 'not_analyzed' },
        article_nr: { type: 'long', index: 'not_analyzed' },
        name: {
          type: 'string',
          index: 'analyzed',
          analyzer: 'swedish',
          fields: {
            sort: {
              type: 'string',
              analyzer: 'swedish_sort'
            }
          }
        },
        additional_name: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        price: { type: 'double', index: 'not_analyzed' },
        volume_in_milliliter: { type: 'double', index: 'not_analyzed' },
        price_per_liter: { type: 'double', index: 'not_analyzed' },
        sales_start: { type: 'string', index: 'not_analyzed' },
        expired: { type: 'boolean', index: 'not_analyzed' },
        product_group: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        type: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        style: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        packaging: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        sealing: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        origin: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        origin_country: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        producer: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        provider: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        year: { type: 'long', index: 'not_analyzed' },
        year_tested: { type: 'long', index: 'not_analyzed' },
        alcohol: { type: 'string', index: 'not_analyzed' },
        assortment: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        ecological: { type: 'boolean', index: 'not_analyzed' },
        ethical: { type: 'boolean', index: 'not_analyzed' },
        koscher: { type: 'boolean', index: 'not_analyzed' }
      }
    }
  }
}

export default Product
