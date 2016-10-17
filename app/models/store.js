import { capitalize, empty, toNumber } from '../lib/utils'
import Elastic from '../lib/elastic'

class Store extends Elastic {
  static reduce (data) {
    return data['BUTIKEROMBUD']['BUTIKOMBUD']
  }

  static transformOpeningHours (str) {
    const list = str ? str.split(/;;;0?\-?;/g) : []

    return list
      .filter(empty)
      .map(str => {
        let opening = str.replace('_*', '').split(';')
        const [day, openingHours, closingHours] = opening

        if ((parseInt(closingHours, 10) - parseInt(openingHours, 10)) <= 0) {
          return null
        }

        return `${day} ${openingHours}-${closingHours}`
      })
      .filter(empty)
  }

  static transformLabels (str) {
    const labels = str ? str.split(';') : []

    return labels
      .filter(empty)
      .map(capitalize)
  }

  static transformPhone (str) {
    return str.replace(/[\/\-]|\s/g, '')
  }

  static get model () {
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

  static get mapping () {
    return {
      _all: {
        enabled: false
      },
      properties: {
        nr: { type: 'string', index: 'not_analyzed' },
        name: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        address: {
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
        additional_address: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        zip_code: { type: 'string', index: 'not_analyzed' },
        city: {
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
        county: {
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
        phone: { type: 'long', index: 'not_analyzed' },
        shop_type: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        services: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        labels: { type: 'string', index: 'analyzed', analyzer: 'swedish' },
        opening_hours: { type: 'string', index: 'not_analyzed' },
        RT90x: { type: 'long', index: 'not_analyzed', coerce: false },
        RT90y: { type: 'long', index: 'not_analyzed', coerce: false }
      }
    }
  }
}

export default Store
