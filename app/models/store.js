import mongoose from 'mongoose'
const Schema = mongoose.Schema

function filter (data) {
  return data['BUTIKEROMBUD']['BUTIKOMBUD']
}

function model (data) {
  return data.map(obj => {
    const labels = obj.labels ? obj.labels.split(';') : []
    const phone = obj.phone ? obj.phone.replace(/[\/\-]|\s/g, '') : ''

    Object.assign(obj, {
      phone,
      labels
    })

    return obj
  })
}

const mapping = {
  NR: 'nr',
  NAMN: 'name',
  TYP: 'type',
  ADDRESS1: 'address_1',
  ADDRESS2: 'address_2',
  ADDRESS3: 'address_3',
  ADDRESS4: 'address_4',
  ADDRESS5: 'address_5',
  TELEFON: 'phone',
  BUTIKSTYP: 'shop_type',
  TJANSTER: 'services',
  SOKORD: 'labels',
  OPPETTIDER: 'opening_hours',
  RT90X: 'RT90x',
  RT90Y: 'RT90y'
}

let productSchema = new Schema({
  nr: { type: String, required: true },
  name: { type: String, index: true, default: '' },
  type: { type: String, index: true, default: '' },
  address_1: { type: String, index: true, default: '' },
  address_2: { type: String, index: true, default: '' },
  address_3: { type: String, index: true, default: '' },
  address_4: { type: String, index: true, default: '' },
  address_5: { type: String, index: true, default: '' },
  phone: { type: String, default: '' },
  shop_type: { type: String, index: true, default: '' },
  services: { type: String, default: '' },
  labels: { type: Array, default: [] },
  opening_hours: { type: String, default: '' },
  RT90x: { type: Number, default: null },
  RT90y: { type: Number, default: null }
})

mongoose.model('Store', productSchema)

export { mapping, model, filter }
