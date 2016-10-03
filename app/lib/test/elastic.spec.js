import { expect, assert } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Elastic from '../elastic'

chai.use(chaiAsPromised)
chai.should()

describe('Elastic', () => {
  it('should exist', () => {
    expect(Elastic).to.exist
  })

  describe('indexing()', () => {
    const index = 'test'

    after(() => {
      const promise = Elastic.deleteIndex(index)
      return promise.should.be.fulfilled
    })

    it('delete index', () => {
      const promise = Elastic.deleteIndex(index)
      return promise.should.be.fulfilled
    })

    it('create new index', () => {
      const promise = Elastic.createIndex(index)
      return promise.should.be.fulfilled
    })
  })
})
