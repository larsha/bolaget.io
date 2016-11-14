import { expect } from 'chai'
import chai from 'chai'
import nock from 'nock'
import chaiAsPromised from 'chai-as-promised'
import Elastic from '../elastic'
import ProductsTask from '../worker/tasks/products'
import StoresTask from '../worker/tasks/stores'

chai.use(chaiAsPromised)
chai.should()

describe('Elastic', function () {
  it('should exist', function () {
    expect(Elastic).to.exist
  })

  describe('Methods', function () {
    it('static method index exists and has a value', function () {
      expect(Elastic.index).to.be.a('string')
    })

    it('static method type exists and has a value', function () {
      expect(Elastic.type).to.be.a('string')
    })
  })

  describe('Indexing', function () {
    const newIndex = new Date().getTime().toString()

    it('create index', function () {
      const promise = Elastic.createIndex(newIndex)
      return promise.should.be.fulfilled
    })

    it('get index', function () {
      const promise = Elastic.getIndex(newIndex)
      return promise.should.be.fulfilled
    })

    it('get index that does not exist should throw', function () {
      const promise = Elastic.getIndex(Date.now().toString())
      return promise.should.be.rejected
    })

    it('delete index', function () {
      const promise = Elastic.deleteIndex(newIndex)
      return promise.should.be.fulfilled
    })

    describe('Entities', function () {
      before(function () {
        return Elastic.createIndex(newIndex).should.be.fulfilled
      })

      after(function () {
        return Elastic.deleteIndex(newIndex).should.be.fulfilled
      })

      it('get and index products', function () {
        const productsTask = new ProductsTask()

        // mock request
        nock('https://www.systembolaget.se/api/assortment/products/xml')
          .get(/\w*/)
          .replyWithFile(200, `${__dirname}/mocks/products.xml`)

        return productsTask.get()
          .then(products => productsTask.index(products, newIndex))
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
          .then(stores => storesTask.index(stores, newIndex))
          .then(data => {
            expect(data).to.be.an('object')
            expect(data.errors).to.be.false
            expect(data.items).to.be.instanceof(Array)
          })
          .should.be.fulfilled
      })
    })
  })
})
