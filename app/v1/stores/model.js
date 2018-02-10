import Elastic from '../../lib/elastic'
import { capitalize, notEmpty, toNumber } from '../../lib/utils'

export default class Model extends Elastic {
  static get alias () {
    return 'stores'
  }

  constructor (data) {
    super(data['BUTIKEROMBUD']['BUTIKOMBUD'])
  }

  get model () {
    return {
      NR: { value: 'nr' },
      NAMN: { value: 'name' },
      TYP: { value: 'type' },
      ADDRESS1: { value: 'address' },
      ADDRESS2: { value: 'additional_address' },
      ADDRESS3: { value: 'zip_code' },
      ADDRESS4: { value: 'city', transform: capitalize },
      ADDRESS5: { value: 'county' },
      TELEFON: { value: 'phone', transform: this.transformPhone },
      BUTIKSTYP: { value: 'shop_type' },
      TJANSTER: { value: 'services' },
      SOKORD: { value: 'labels', transform: this.transformLabels },
      OPPETTIDER: { value: 'opening_hours', transform: this.transformOpeningHours },
      RT90X: { value: 'RT90x', transform: toNumber },
      RT90Y: { value: 'RT90y', transform: toNumber }
    }
  }

  get mapping () {
    return {
      properties: {
        nr: { type: 'keyword', index: true },
        name: { type: 'text', index: true, analyzer: 'swedish' },
        address: {
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
        additional_address: { type: 'text', index: true, analyzer: 'swedish' },
        zip_code: { type: 'keyword', index: true },
        city: {
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
        county: {
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
        phone: { type: 'integer', index: true },
        shop_type: { type: 'text', index: true, analyzer: 'swedish' },
        services: { type: 'text', index: true, analyzer: 'swedish' },
        labels: { type: 'text', index: true, analyzer: 'swedish' },
        opening_hours: { type: 'keyword', index: true },
        RT90x: { type: 'integer', index: true, coerce: false },
        RT90y: { type: 'integer', index: true, coerce: false }
      }
    }
  }

  transformOpeningHours (str) {
    const list = str ? str.split(/;;;0?-?;/g) : []

    return list
      .filter(notEmpty)
      .map(str => {
        let opening = str.replace('_*', '').split(';')
        const [day, openingHours, closingHours] = opening

        if ((parseInt(closingHours, 10) - parseInt(openingHours, 10)) <= 0) {
          return null
        }

        return `${day} ${openingHours}-${closingHours}`
      })
      .filter(notEmpty)
  }

  transformLabels (str) {
    const labels = str ? str.split(';') : []

    return labels
      .filter(notEmpty)
      .map(capitalize)
  }

  transformPhone (str) {
    return str.replace(/[/-]|\s/g, '')
  }
}
