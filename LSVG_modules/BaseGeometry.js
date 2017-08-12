class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}


class Vector {
  constructor(point_from, point_to) {
    this.x = point_to.x - point_from.x;
    this.y = point_to.y - point_from.y;
  }
}

function distance(point0, point1) {
  let d = new Vector(point0, point1);
  return Math.sqrt(d.x * d.x + d.y * d.y);
}
