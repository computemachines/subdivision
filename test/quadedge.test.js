import {assert} from 'chai';

import {DEdge, makeEdge, Util} from './quadedge';

describe('DEdge', function() {
  let edge = makeEdge();
  let edges = [edge];
  it("should satisfy e.rot().rot().rot().rot() == e", function () {
    for(let e of edges) {
      assert.equal(e.rot().rot().rot().rot(), e);
    }
  });
  it("should satisfy e.rot().onext().rot().onext() == e", function () {
    for(let e of edges) {
      assert.equal(e.rot().onext().rot().onext(), e);
    }
  });
  it("should satisfy e.rot().rot() != e", function () {
    for(let e of edges) {
      assert.notEqual(e.rot().rot(), e);     
    }
  });
  it("should satisfy e.sym().sym() == e", function () {
    for(let e of edges) {
      assert.equal(e.sym().sym(), e);
    }
  });
  it("should satisfy e.rot() != e", function () {
    for(let e of edges) {
      assert.notEqual(e.rot(), e);
    }
  });
  it("should satisfy e.rot().rot_inv() == e", function () {
    for(let e of edges) {
      assert.equal(e.rot().rot_inv(), e);
    }
  });
  describe('#lnext()', function() {
    it('should be n-cyclic', function() {
      function degree(startingEdge) {
	var side = startingEdge,
	    n = 0;
	do {
	  side = side.lnext();
	  n ++;
	} while (side !== startingEdge);
	return n;
      };
      assert.equal(degree(edge.rot()), 1);
      assert.equal(degree(edge), 2);
      // assert.equal(degree(square), 4);
    });
  });
  describe('#oprev', function() {
    it('should be inverse of #onext()');
  });
});

