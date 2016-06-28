import http from 'http'
import xml2js from 'xml2js'

class Request {
  constructor (endpoint, mapping) {
    this.endpoint = endpoint
    this.mapping = mapping
  }

  get () {
    return new Promise((resolve, reject) => {
      var req = http.get(this.endpoint, res => {
        let xml = ''
        res.on('data', chunk => {
          xml += chunk
        })

        res.on('end', () => {
          return resolve(xml)
        })
      })

      req.on('error', reject)
    })
  }

  map (data) {
    if (!this.mapping) {
      return data
    }

    let mapped = []

    data.forEach(obj => {
      let mappedData = {}
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          mappedData[this.mapping[prop]] = obj[prop]
        }
      }

      mapped.push(mappedData)
    })

    return mapped
  }

  parse (xml) {
    let parse = xml2js.parseString
    return new Promise((resolve, reject) => {
      parse(xml, {
        strict: false,
        parseNumbers: true,
        parseBooleans: true,
        explicitArray: false,
        trim: true
      }, (err, data) => {
        if (err) {
          return reject(err)
        }

        return resolve(data)
      })
    })
  }
}

export default Request
