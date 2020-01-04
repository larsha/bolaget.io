import nock from 'nock'
import Task from './task'
import Model from './model'
import { fuzzyMatch, sleep } from '../../lib/utils'

describe('Stores', () => {
  describe('Task', () => {
    afterAll(async () => {
      await sleep(3)
    })

    it('fetch and index', () => {
      const task = new Task()

      nock('https://www.systembolaget.se')
        .get('/api/assortment/stores/xml')
        .replyWithFile(200, `${__dirname}/mock.xml`)

      return task.fetch().then(stores => task.index(stores))
    })
  })

  describe('Model', () => {
    it('#getById()', () => {
      return Model.getById('0102')
        .then(data => expect(data.nr).toBe('0102'))
    })

    it('#find()', () => {
      const query = {
        bool: {
          must: [
            fuzzyMatch('city', 'Stockho')
          ]
        }
      }

      const sort = { 'city.sort': { order: 'asc' } }

      Model.find(query, 0, 1, sort)
        .then(({ result, count }) => {
          expect(count).toBe(5)
          expect(result[0].city).toBe('Stockholm')
        })
    })
  })
})
