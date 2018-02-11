import nock from 'nock'
import Task from './task'
import Model from './model'
import { fuzzyMatch, sleep } from '../../lib/utils'

describe('Stores', () => {
  describe('Task', () => {
    it('fetch and index', () => {
      const task = new Task()

      nock('https://www.systembolaget.se/api/assortment/stores/xml')
        .get(/\w*/)
        .replyWithFile(200, `${__dirname}/mock.xml`)

      return task.fetch().then(stores => task.index(stores))
    })
  })

  describe('Model', () => {
    beforeEach(async () => {
      await sleep(1)
    })

    it('#getById()', () => {
      return Model.getById('0102')
        .then(data => expect(data.nr).toBe('0102'))
    })

    it('#find()', () => {
      let query = {
        bool: {
          must: [
            fuzzyMatch('city', 'Stockho')
          ]
        }
      }

      let sort = { 'city.sort': { 'order': 'asc' } }

      Model.find(query, 0, 1, sort)
        .then(({ result, count }) => expect(result[0].city).toBe('Stockholm'))
    })
  })
})
