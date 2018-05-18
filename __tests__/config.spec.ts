import * as chai from 'chai'
import * as mocha from 'mocha'
import { DEFAULT_CTX_PROPERTY } from './../src/config'

const expect = chai.expect
describe('Config file', () => {
  it('Default context property should be a string', () => {
    expect(DEFAULT_CTX_PROPERTY).to.be.a('string')
  })
})
