import https from 'https'
import xml2js from 'xml2js'

class Request {
  constructor (endpoint) {
    this.endpoint = endpoint
  }

  async get () {
    return new Promise((resolve, reject) => {
      var req = https.get(this.endpoint, res => {
        let xml = ''
        res.on('data', chunk => {
          xml += chunk
        })

        res.on('end', () => {
          return resolve(this.parse(xml))
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
