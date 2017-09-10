import { expect } from 'chai'
import chai from 'chai'
import nock from 'nock'
import chaiAsPromised from 'chai-as-promised'
import Elastic from '../elastic'
import ProductsTask from '../worker/tasks/products'
import StoresTask from '../worker/tasks/stores'
import Product from '../../models/v1/product'
import Store from '../../models/v1/store'
import { fuzzyMatch, rangeMatch } from '../utils'

chai.use(chaiAsPromised)
chai.should()

describe('Elastic', function () {
  it('should exist', function () {
    expect(Elastic).to.exist
  })

  it('index should match', function () {
    expect(Elastic.index).to.equal('bolaget_test')
  })

  describe('Methods', function () {
    it('static method index exists and has a value', function () {
      expect(Elastic.index).to.be.a('string')
    })

    it('static method type exists and has a value', function () {
      expect(Product.type).to.equal('product')
      expect(Store.type).to.equal('store')
    })
  })

  describe('Indices', function () {
    before(function () {
      this.index = Date.now().toString()
    })

    after(function () {
      return Elastic.deleteIndex(this.index).should.be.fulfilled
    })

    it('create index', function () {
      return Elastic.createIndex(this.index).should.be.fulfilled
    })

    it('put alias', function () {
      return Elastic.putAlias(this.index).should.be.fulfilled
    })

    it('get index', function () {
      return Elastic.getIndex(this.index).should.be.fulfilled
    })

    it('get index that does not exist should throw', function () {
      return Elastic.getIndex(Date.now().toString()).should.be.rejected
    })

    describe('Entities', function () {
      it('get and index products', function () {
        const productsTask = new ProductsTask()

        // mock request
        nock('https://www.systembolaget.se/api/assortment/products/xml')
          .get(/\w*/)
          .replyWithFile(200, `${__dirname}/mocks/products.xml`)

        return productsTask.get()
          .then(products => productsTask.index(products, this.index))
          .then(data => {
            expect(data).to.be.an('object')
            expect(data.errors).to.be.false
            expect(data.items).to.be.instanceof(Array)
          })
          .should.be.fulfilled
      })

      it('get and index stores', function () {
        const storesTask = new StoresTask()

        // mock request
        nock('https://www.systembolaget.se/api/assortment/stores/xml')
          .get(/\w*/)
          .replyWithFile(200, `${__dirname}/mocks/stores.xml`)

        return storesTask.get()
          .then(stores => storesTask.index(stores, this.index))
          .then(data => {
            expect(data).to.be.an('object')
            expect(data.errors).to.be.false
            expect(data.items).to.be.instanceof(Array)
          })
          .should.be.fulfilled
      })

      describe('Store', function () {
        it('#getById()', function () {
          return Store.getById('0102')
            .then(data => {
              expect(data).to.be.an('object')
              expect(data.nr).to.be.a('string')
              expect(data.nr).to.equal('0102')
            })
            .should.be.fulfilled
        })

        it('#find()', function (done) {
          let query = {
            bool: {
              must: [
                fuzzyMatch('city', 'Stockho')
              ]
            }
          }

          let sort = { 'city.sort': { 'order': 'asc' } }

          // ES search API is not realtime
          // Takes some time to sync, using setTimeout here.
          setTimeout(() => {
            Store.find(query, 0, 1, sort)
              .then(({ result, count }) => {
                expect(result).to.be.instanceof(Array)
                expect(count).to.be.above(0)
                expect(result[0]).to.be.an('object')
                expect(result[0].city).to.equal('Stockholm')
              })
              .should.be.fulfilled.and.notify(done)
          }, 1000)
        })
      })

      describe('Product', function () {
        it('#getById()', function () {
          return Product.getById('7599701')
            .then(data => {
              expect(data).to.be.an('object')
              expect(data.nr).to.be.a('string')
              expect(data.nr).to.equal('7599701')
            })
            .should.be.fulfilled
        })

        it('#find()', function (done) {
          let query = {
            bool: {
              must: [
                rangeMatch('year', 2011, 2012)
              ]
            }
          }

          let sort = { 'name.sort': { 'order': 'asc' } }

          // ES search API is not realtime
          // Takes some time to sync, using setTimeout here.
          setTimeout(() => {
            Product.find(query, 0, 1, sort)
              .then(({ result, count }) => {
                expect(result).to.be.instanceof(Array)
                expect(count).to.be.above(0)
                expect(result[0]).to.be.an('object')
                expect(result[0].year).to.equal(2011)
              })
              .should.be.fulfilled.and.notify(done)
          }, 1000)
        })
      })
    })
  })
})
