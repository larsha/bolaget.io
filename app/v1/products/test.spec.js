import nock from 'nock'
import Task from './task'
import Model from './model'
import { fuzzyMatch, rangeMatch, sleep } from '../../lib/utils'

describe('Products', () => {
  describe('Task', () => {
    it('fetch and index', () => {
      const task = new Task()

      nock('https://www.systembolaget.se/api/assortment/products/xml')
        .get(/\w*/)
        .replyWithFile(200, `${__dirname}/mock.xml`)

      return task.fetch().then(products => task.index(products))
    })
  })

  describe('Model', () => {
    beforeEach(async () => {
      await sleep(1)
    })

    it('#getById()', () => {
      return Model.getById('7599701')
        .then(data => expect(data.nr).toBe('7599701'))
    })

    it('#find()', () => {
      let query = {
        bool: {
          must: [
            rangeMatch('year', 2011, 2012)
          ]
        }
      }

      let sort = { 'name.sort': { 'order': 'asc' } }

      return Model.find(query, 0, 1, sort)
        .then(({ result, count }) => expect(result[0].year).toBe(2011))
    })
  })
})
