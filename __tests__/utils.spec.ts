import * as chai from 'chai'
import * as mocha from 'mocha'
import { h } from 'preact'
import { prepareChildren } from './../src/utils'
// tslint:disable:object-literal-sort-keys
const expect = chai.expect
describe('Utility functions', () => {
  describe('Preparing children', () => {
    it('Should return a string if child is string', () => {
      const mockString = 'mock'
      expect(prepareChildren(mockString, {}, {})).to.equal(mockString)
    })
    it('Should call and return the result if passed a function', () => {
      const mockFn = (state, actions) => ({
        attributes: { state, actions },
        children: [],
        nodeName: 'span'
      })
      const mockState = { testing: [1, 2, 3] }
      const mockActions = { test: console.log }
      const expectedNotMerged = {
        attributes: { state: mockState, actions: mockActions },
        children: [],
        nodeName: 'span'
      }
      const expectedMerged = {
        attributes: { state: mockState, actions: undefined },
        children: [],
        nodeName: 'span'
      }
      expect(prepareChildren(mockFn, mockState, mockActions)).to.deep.equal(
        expectedNotMerged
      )
      expect(
        prepareChildren(mockFn, mockState, mockActions, true)
      ).to.deep.equal(expectedMerged)
    })
    it('Should return child if nodeName is a string', () => {
      const mockVnode = {
        attributes: { lorem: 'ipsum' },
        children: [],
        nodeName: 'span'
      }

      const mockState = { testing: [1, 2, 3] }
      const mockActions = { test: console.log }

      expect(prepareChildren(mockVnode, mockState, mockActions)).to.deep.equal(
        mockVnode
      )
    })
    /* it('Should merge attributes if called with an object and call h', () => {
      const mockVnode = {
        attributes: { lorem: 'ipsum' },
        children: [],
        nodeName: 'span'
      }

      const mockState = { testing: [1, 2, 3] }
      const mockActions = { test: console.log }
      const expectedNotMerged = {
        attributes: { state: mockState, actions: mockActions, lorem: 'ipsum' },
        children: [],
        nodeName: () => 'span',
        key: undefined
      }
      const expectedMerged = {
        attributes: { ...mockState, lorem: 'ipsum' },
        nodeName: () => <div />,
        children: [],
        key: undefined
      }
      console.log(
        h(
          expectedNotMerged.nodeName,
          expectedNotMerged.attributes,
          expectedNotMerged.children
        ),
        prepareChildren(mockVnode, mockState, mockActions)
      )
      expect(prepareChildren(mockVnode, mockState, mockActions)).to.deep.equal(
        h(
          expectedNotMerged.nodeName,
          expectedNotMerged.attributes,
          expectedNotMerged.children
        )
      )
      expect(
        prepareChildren(mockVnode, mockState, mockActions, true)
      ).to.deep.equal(
        h(
          expectedMerged.nodeName,
          expectedMerged.attributes,
          expectedMerged.children
        )
      )
    })*/
  })
})
