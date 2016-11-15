import { expect } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { stringToBool } from '../utils'

chai.use(chaiAsPromised)
chai.should()

describe('Utils', function () {
  it('string to bool', function () {
    expect(stringToBool('true')).to.be.true
  })
})
