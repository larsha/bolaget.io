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
  name: { type: String, index: true },
  type: { type: String, index: true },
  address_1: { type: String, index: true },
  address_2: { type: String, index: true },
  address_3: { type: String, index: true },
  address_4: { type: String, index: true },
  address_5: { type: String, index: true },
  phone: { type: String },
  shop_type: { type: String, index: true },
  services: { type: String },
  labels: { type: Array, default: [] },
  opening_hours: { type: String },
  RT90x: { type: Number },
  RT90y: { type: Number }
})

mongoose.model('Store', productSchema)

export { mapping, model, filter }
