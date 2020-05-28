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

      nock('https://www.systembolaget.se')
        .get('/api/assortment/products/xml')
        .replyWithFile(200, `${__dirname}/mock.xml`)

      return task.fetch().then((products) => task.index(products))
    })
  })

  describe('Model', () => {
    describe('#find()', () => {
      it('single product by `nr`', () => {
        const query = {
          multi_match: {
            query: '7599701',
            fields: ['nr', 'article_nr']
          }
        }

        return Model.find(query, 0, 1).then(({ result }) =>
          expect(result[0].nr).toBe('7599701')
        )
      })

      it('single product by `article_nr`', () => {
        const query = {
          multi_match: {
            query: '75997',
            fields: ['nr', 'article_nr']
          }
        }

        return Model.find(query, 0, 1).then(({ result }) =>
          expect(result[0].article_nr).toBe(75997)
        )
      })

      it('product contains all properties', () => {
        const query = {
          multi_match: {
            query: '8962603',
            fields: ['nr', 'article_nr']
          }
        }

        return Model.find(query, 0, 1).then(({ result }) => {
          expect(Object.keys(result[0]).length).toBe(28)
          expect(result[0].nr).toBe('8962603')
          expect(result[0].article_id).toBe(1000158)
          expect(result[0].article_nr).toBe(89626)
          expect(result[0].name).toBe('Barbarossa')
          expect(result[0].additional_name).toBe('Imperial Red Ale')
          expect(Object.keys(result[0].price).length).toBe(2)
          expect(result[0].price.amount).toBe(35.9)
          expect(result[0].price.currency).toBe('SEK')
          expect(result[0].volume_in_milliliter).toBe(330.0)
          expect(result[0].price_per_liter).toBe(108.79)
          expect(result[0].sales_start).toBe('2015-09-01')
          expect(result[0].expired).toBe(false)
          expect(result[0].product_group).toBe('Öl')
          expect(result[0].type).toBe('Ale brittisk-amerikansk stil')
          expect(result[0].style).toBe('Strong ale')
          expect(result[0].packaging).toBe('Flaska')
          expect(result[0].sealing).toBe('Kork')
          expect(result[0].origin).toBe('Stockholm')
          expect(result[0].origin_country).toBe('Sverige')
          expect(result[0].producer).toBe('Imperiebryggeriet AB')
          expect(result[0].provider).toBe('Imperiebryggeriet AB')
          expect(result[0].year).toBe(2015)
          expect(result[0].year_tested).toBe(2016)
          expect(result[0].alcohol).toBe('7.50%')
          expect(result[0].assortment).toBe('BS')
          expect(result[0].assortment_text).toBe('Övrigt sortiment')
          expect(result[0].ecological).toBe(false)
          expect(result[0].ethical).toBe(false)
          expect(result[0].koscher).toBe(false)
          expect(result[0].commodities).toBe('Säd.')
        })
      })

      it('multiple products', () => {
        const query = {
          bool: {
            must: [rangeMatch('year', 2011, 2012)]
          }
        }

        const sort = { 'name.sort': { order: 'asc' } }

        return Model.find(query, 0, 1, sort).then(({ result, count }) => {
          expect(count).toBe(1)
          expect(result[0].year).toBe(2011)
        })
      })
    })
  })
})
