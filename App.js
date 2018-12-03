"use strict";

let snapping = false;

function get_random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function addSegment() {
  base_canvas.deselect_all("no_repaint");
  let p = [];
  let x;
  let y;
  let x_max = base_canvas.width;
  let y_max = base_canvas.height;

  for (let i = 0; i < 2; i++) {
    x = get_random(PointMarker.radius, x_max - PointMarker.radius);
    y = get_random(PointMarker.radius, y_max - PointMarker.radius);
    let point = new Point(x, y);
    p.push(point)
  }
  let segment_widget = new SegmentWidget(base_canvas, base_canvas, p[0], p[1], "str_black str3");
  segment_widget.select("no_repaint");
  base_canvas.paint();
}

function addBezier() {
  base_canvas.deselect_all("no_repaint");
  let p = [];
  let x;
  let y;
  let x_max = base_canvas.width;
  let y_max = base_canvas.height;
  for (let i = 0; i < 4; i++) {
    x = get_random(PointMarker.radius, x_max - PointMarker.radius);
    y = get_random(PointMarker.radius, y_max - PointMarker.radius);
    let point = new Point(x, y);
    p.push(point)
  }
  let bezier_widget = new BezierWidget(base_canvas, base_canvas, p[0], p[1], p[2], p[3], "str_black str3");
  bezier_widget.select("no_repaint");
  base_canvas.paint();
}

function clearSelected() {
  base_canvas.clearSelected();
}

function clearAll() {
  base_canvas.clearAll();
}

function toggleSnapping() {
  snapping = document.getElementById("snapping").checked;
  base_canvas.snapping = snapping;
}

let base_canvas = new SVGCanvas(640, 480, "LSVG_frame", snapping);

window.onload = function () {
  base_canvas.paint();
  document.getElementById("snapping").checked = snapping;
}
