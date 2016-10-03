import { expect, assert } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Elastic from '../elastic'

chai.should()

describe('Elastic', () => {
  it('should exist', () => {
    expect(Elastic).to.exist
  })

  describe('indexing()', () => {
    const index = 'test'

    after(async () => {
      const promise = await Elastic.deleteIndex(index)
      return promise.should.be.fulfilled
    })

    it('delete index', async () => {
      const promise = await Elastic.deleteIndex(index)
      return promise.should.be.fulfilled
    })

    it('create new index', async () => {
      const promise = await Elastic.createIndex(index)
      return promise.should.be.fulfilled
    })
  })
})
