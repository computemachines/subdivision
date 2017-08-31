/* Geometric Predicates */

import {Matrix} from 'sylvester';
import _ from 'lodash';

export function circular(radius=1, center=[0, 0], options) {
  const defaults = {
    num_verts: 10,
    d_arc_length: radius*2*Math.PI / 10
  };
  let options_completion = {};
  if (options.d_arc_length) {
    options_completion.num_verts =
      Math.round(2*Math.PI*radius/options.d_arc_length);
  }
  let {num_verts} = Object.assign({}, defaults, options, options_completion);

  let verts = [];
  for (let i of _.range(num_verts)) {
    let angle = i*2*Math.PI/num_verts;
    verts.push([
      radius*Math.cos(angle) + center[0],
      radius*Math.sin(angle) + center[1]
    ]);
  }
  return verts;
}

export function incircle(a, b, c ,d) {
  let m = $M([[a[0]-d[0], a[1]-d[1], (a[0]-d[0])^2+(a[1]-d[1])^2],
	      [b[0]-d[0], b[1]-d[1], (b[0]-d[0])^2+(b[1]-d[1])^2],
	      [c[0]-d[0], c[1]-d[1], (c[0]-d[0])^2+(c[1]-d[1])^2]]);
  return m.det() > 0;
}

