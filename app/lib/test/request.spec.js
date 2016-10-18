import { expect, assert } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Request from '../request'

chai.use(chaiAsPromised)
chai.should()

describe('Request', function () {
  it('should exist', function () {
    expect(Request).to.exist
  })

  describe('Get', function () {
    this.timeout(60 * 2 * 1000)

    it('products', function () {
      const request = new Request('https://www.systembolaget.se/api/assortment/products/xml')
      return request.get().should.be.fulfilled
    })

    it('stores', function () {
      const request = new Request('https://www.systembolaget.se/api/assortment/stores/xml')
      return request.get().should.be.fulfilled
    })
  })
})
