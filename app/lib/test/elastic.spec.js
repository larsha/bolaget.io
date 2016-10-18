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

    after(function () {
      const promise = Elastic.deleteIndex(index)
      return promise.should.be.fulfilled
    })

    it('delete index', function () {
      const promise = Elastic.deleteIndex(index)
      return promise.should.be.fulfilled
    })

    it('create new index', function () {
      const promise = Elastic.createIndex(index)
      return promise.should.be.fulfilled
    })
  })
})
