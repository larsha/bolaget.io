import http from 'http'
import xml2js from 'xml2js'

class Request {
  constructor (endpoint) {
    this.endpoint = endpoint
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

  parse (xml) {
    let parse = xml2js.parseString
    return new Promise((resolve, reject) => {
      parse(xml, {
        strict: false,
        parseNumbers: true,
        parseBooleans: true,
        explicitArray: false,
        emptyTag: null,
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
