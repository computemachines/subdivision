/** QuadEdge data structure */


class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

function makeEdge() {
  let up = new DEdge(),
      left = new DEdge(),
      down = new DEdge(),
      right = new DEdge()
  up._rot = left
  left._rot = down
  down._rot = right
  right._rot = up
  return up
}

  

export const Util = {
  buildEdgeFromNewPolygon(verticies) {
    let edge = makeEdge()
    edge._org = verticies[0]
    return edge
  }
}


/** Class representing a Directed Edge */
class DEdge {
  constructor(rot, onext=this, org) {
    this._rot = rot
    this._onext = onext
    this._org = org
  }
  
  /**
   * Get Dual Edge directed 90 degrees counter clockwise to this.
   * @return {DEdge}
   */
  rot() {
    return this._rot
  }

  /**
   * Get Dual Edge directed 90 degrees *clockwise* to this.
   * @return {DEdge}
   */
  rot_inv() {
    return this.rot().rot().rot()
  }

  /**
   * Get Edge directed opposite to this.
   * @return {DEdge}
   */
  sym() {
    return this.rot().rot()
  }
    
  /**
   * Get Origin Vertex
   * @return {Vertex} Origin Vertex */
  org() {
    return this._org
  }

  /**
   * Get Destination Vertex
   * @return {Vertex} Destination Vertex */
  dest() {
    return this.lnext().org()
  }

  onext() {
    return this._onext
  }
  lnext() {
    return this.rot_inv().onext().rot()
  }
}


export {DEdge, makeEdge}
