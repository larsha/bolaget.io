import { expect, assert } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Elastic from '../elastic'

chai.use(chaiAsPromised)
chai.should()

describe('Elastic', function () {
  it('should exist', function () {
    expect(Elastic).to.exist
  })

  describe('Methods', function () {
    it('static get index', function () {
      expect(Elastic.index).to.be.a('string')
    })
  })

  describe('Indexing', function () {
    const index = 'test'

    it('create index', function () {
      const promise = Elastic.createIndex(index)
      return promise.should.be.fulfilled
    })

    it('get index', function () {
      const promise = Elastic.getIndex(index)
      return promise.should.be.fulfilled
    })

    it('get index that does not exist should throw', function () {
      const promise = Elastic.getIndex(Date.now().toString())
      return promise.should.be.rejected
    })

    it('delete index', function () {
      const promise = Elastic.deleteIndex(index)
      return promise.should.be.fulfilled
    })
  })
})
