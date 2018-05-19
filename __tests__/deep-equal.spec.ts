import * as chai from 'chai'
import * as mocha from 'mocha'

import { deepEquals } from '../src/lib/deep-equal'

const expect = chai.expect
describe('Deep equals', () => {
  // string, number, boolean or undefined
  it('Should handle strings', () => {
    expect(deepEquals('hello', 'world')).to.equal(false)
    expect(deepEquals('hello', 'hello')).to.equal(true)
  })
  it('Should handle numbers', () => {
    expect(deepEquals(1, -1)).to.equal(false)
    expect(deepEquals(1, 1)).to.equal(true)
  })
  it('Should handle booleans', () => {
    expect(deepEquals(true, false)).to.equal(false)
    expect(deepEquals(true, true)).to.equal(true)
  })
  it('Should handle undefined', () => {
    expect(deepEquals(undefined, false)).to.equal(false)
    expect(deepEquals(undefined, undefined)).to.equal(true)
  })

  // object, arrays or null
  // but NOT functions
  it('Should handle objects', () => {
    expect(deepEquals({}, { hello: 'world' })).to.equal(false)
    expect(deepEquals({ hello: 'world' }, { hello: 'universe' })).to.equal(
      false
    )
    expect(
      deepEquals({ hello: { world: true } }, { hello: { world: false } })
    ).to.equal(false)
    expect(
      deepEquals(
        { hello: { world: true } },
        { hello: { world: false }, something: {} }
      )
    ).to.equal(false)

    expect(deepEquals({}, {})).to.equal(true)
    expect(deepEquals({ hello: 'world' }, { hello: 'world' })).to.equal(true)
    expect(
      deepEquals({ hello: { world: true } }, { hello: { world: true } })
    ).to.equal(true)
  })
  it('Should handle arrays', () => {
    expect(deepEquals([1], [])).to.equal(false)
    expect(deepEquals([1], [2])).to.equal(false)
    expect(deepEquals([1, 2, [], [3]], [1, 2, [], []])).to.equal(false)
    expect(
      deepEquals(
        [true, 'string', [], { key: 'value' }],
        [true, 'string', [], { anotherKey: 'value' }]
      )
    ).to.equal(false)

    expect(deepEquals([], [])).to.equal(true)
    expect(deepEquals([1], [1])).to.equal(true)
  })
})
