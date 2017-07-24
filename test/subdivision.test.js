import {assert} from 'chai'

import {Triangle} from '../build/subdivision'

describe('subdivision', function() {
  it('should be visible', function() {
    assert.typeOf(Triangle, 'function')
  })
})
