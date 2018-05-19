import * as chai from 'chai'
import * as mocha from 'mocha'
import * as config from './../src/config'

const expect = chai.expect
describe('Config file', () => {
  it('Default context property should be a string', () => {
    expect(config).to.be.a('object')
    expect(config).to.haveOwnProperty('DEFAULT_CTX_PROPERTY')
    expect(config.DEFAULT_CTX_PROPERTY).to.be.a('string')
  })
})
