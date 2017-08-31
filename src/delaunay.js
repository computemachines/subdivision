import {makeEdge, connect, deleteEdge, swap} from './quadedge';

import {incircle} from './predicates';

function pointOrdering(a, b) {
  if (a[0] === b[0]) {
    return a[1] > b[1];
  }
  return a[0] > b[0];
}

function partition(ordered_points, ordering) {
  
}

function merge_delaunay(left, right) {}

/*
 * Only call with points ordered by pointOrdering.
 */
function delaunay(points) {
  if (points.length <= 3) {
    // return triangulation
    return undefined;
  }
    
  let middle = Math.floor(points.length);
  let left = delaunay(points.slice(0, middle));
  let right = delaunay(points.slice(middle, points.length));
  return merge_delaunay(left, right);
}
