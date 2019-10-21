import nock from 'nock'
import Task from './task'
import Model from './model'
import { rangeMatch, sleep } from '../../lib/utils'

describe('Products', () => {
  describe('Task', () => {
    afterAll(async () => {
      await sleep(3)
    })

    it('fetch and index', () => {
      const task = new Task()

      nock('https://www.systembolaget.se/api/assortment/products/xml')
        .get(/\w*/)
        .replyWithFile(200, `${__dirname}/mock.xml`)

      return task.fetch().then(products => task.index(products))
    })
  })

  describe('Model', () => {
    it('#find() - single product by `nr`', () => {
      const query = {
        multi_match: {
          query: '7599701',
          fields: ['nr', 'article_nr']
        }
      }

      return Model.find(query, 0, 1)
        .then(({ result }) => expect(result[0].nr).toBe('7599701'))
    })

    it('#find() - single product by `article_nr`', () => {
      const query = {
        multi_match: {
          query: '75997',
          fields: ['nr', 'article_nr']
        }
      }

      return Model.find(query, 0, 1)
        .then(({ result }) => expect(result[0].article_nr).toBe(75997))
    })

    it('#find() - products', () => {
      const query = {
        bool: {
          must: [
            rangeMatch('year', 2011, 2012)
          ]
        }
      }

      const sort = { 'name.sort': { order: 'asc' } }

      return Model.find(query, 0, 1, sort)
        .then(({ result, count }) => expect(result[0].year).toBe(2011))
    })
  })
})
