import {assert} from 'chai'

import {DEdge, makeEdge, Util} from '../build/quadedge'

describe('DEdge', function() {
  let edge = makeEdge()
  edge._org = 'single'
  let polygon = Util.buildEdgeFromNewPolygon(['a', 'b', 'c', 'd'])
  describe('#sym()', function() {
    it('should be unitary', function() {
      assert.equal(edge.sym().sym(), edge)
    })
  })
  describe('#rot()', function() {
    it('should not be identity (orientable manifold)', function() {
      assert.notEqual(edge.rot(), edge)
    })
    it('should be invertible', function() {
      assert.equal(edge.rot().rot_inv(), edge)
    })
  })
  describe('#lnext()', function() {
    it('should be n-cyclic', function() {
      function degree(startingEdge) {
	var side = startingEdge,
	    n = 0
	do {
	  console.log(side.org())
	  side = side.lnext()
	  n ++
	} while (side !== startingEdge)
	return n
      }

      assert.equal(degree(edge), 1)
      assert.equal(degree(polygon), 4)
    })
  })
})
