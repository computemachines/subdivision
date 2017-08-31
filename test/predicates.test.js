import {assert} from 'chai';

import {incircle, circular} from './predicates';

import _ from 'lodash';

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

describe("circle_verts", function() {
  it("should produce n points", function() {
    assert.equal(circular(1, [0, 0], {num_verts: 55}).length, 55);
  });
});

describe("incircle", function() {
  it("should be invariant under affine transform");
  it("should be false for cocircular points", function() {
    assert.isFalse(incircle(
      ...circular(1, [1, 1], {num_verts: 4})
    ));
    assert.isFalse(incircle(
      ...circular(-1, [1, 1], {num_verts: 4})
    ));
  });
  it("should be antisymmetric with orientation", function() {
    _.times(10, function() {
      let [a, b, c, d] = _.chunk(_.range(2*4).map(()=>getRandomArbitrary(-100, 100)), 2);
      assert.notEqual(incircle(a, b, c, d), incircle(c, b, a, d));
    });
  });
});
