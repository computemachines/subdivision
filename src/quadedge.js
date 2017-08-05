/** Quadedge data structure */

class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function makeEdge(from='a', to='b') {
  let up = new DEdge(),
      left = new DEdge(),
      down = new DEdge(),
      right = new DEdge();
  up._rot = left;
  up._onext = up;
  up._org = from;
  left._rot = down;
  left._onext = right;
  left._org = Infinity;
  down._rot = right;
  down._onext = down;
  down._org = to;
  right._rot = up;
  right._onext = left;
  right._org = Infinity;
  return up;
}

/**
 * Topological operator taken from Guibas and Stolfi.
 *
 */
export function splice(a, b) {
  const alpha = a.onext().rot(),
	beta = b.onext().rot();

  { // swap a.onext, b.onext
    let t = a._onext;
    a._onext = b._onext;
    b._onext = t;
  }

  { // swap alpha.onext, beta.onext
    let t = alpha._onext;
    alpha._onext = beta._onext;
    beta._onext = t;
  }
}


export function connect(a, b) {
  let e = makeEdge(a.dest(), b.org());
  splice(e, a.lnext());
  splice(e.sym(), b);
  return e;
}

export const Util = {
  num_verts: 0,
  
  make_debug() {
    let edge = makeEdge();
    edge._org = Util.num_verts ++;
    edge.sym()._org = Util.num_verts ++;
    return edge;
  },
  
  fold_iterator(edge, operation, done) {
    do {
      console.log(`${edge.org()} -> ${edge.dest()}`);
      edge = operation(edge);
    } while (!done(edge))
  },
  
  buildEdgeFromNewPolygon(verticies) {
    let edge = makeEdge();
    edge._org = verticies[0];
    return edge;
  }
}

const Infinity = "Infinity"; //new Vertex()

/** Class representing a Directed Edge */
class DEdge {
  constructor(rot, onext=this, org=Infinity) {
    this._rot = rot;
    this._onext = onext;
    this._org = org;
  }
  toString(separator='->') {
    return `(${this.org()}) ${separator} (${this.dest()})`;
  };
  
  /**
   * Get Dual Edge directed 90 degrees counter clockwise to this.
   * @return {DEdge}
   */
  rot() {
    return this._rot;
  }

  /**
   * Get Dual Edge directed 90 degrees *clockwise* to this.
   * @return {DEdge}
   */
  rot_inv() {
    return this.rot().rot().rot();
  }

  /**
   * Get Edge directed opposite to this.
   * @return {DEdge}
   */
  sym() {
    return this.rot().rot();
  }
    
  /**
   * Get Origin Vertex
   * @return {Vertex} Origin Vertex */
  org() {
    return this._org;
  }

  /**
   * Get Destination Vertex
   * @return {Vertex} Destination Vertex */
  dest() {
    return this.sym().org();//lnext().org()
  }

  onext() {
    return this._onext;
  }
  lnext() {
    return this.rot_inv().onext().rot();
  }
}

// const a = Util.makeDebug();
// const b = Util.makeDebug();


export {DEdge, makeEdge}
