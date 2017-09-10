import { expect } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { stringToBool, listToArray, sleep } from '../utils'

chai.use(chaiAsPromised)
chai.should()

describe('Utils', function () {
  it('#stringToBool()', function () {
    expect(stringToBool('true')).to.be.true
  })

  it('#listToArray()', function () {
    expect(listToArray('1,2,3,4,5')).to.eql(['1', '2', '3', '4', '5'])
  })

  it('#sleep()', function () {
    expect(sleep(1)).to.be.fulfilled
  })
})
