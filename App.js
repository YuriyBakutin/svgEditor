"use strict";

//let fs = require('fs');

function choose_path_and_save_File(content_to_save) {
/*
  let chooser = document.getElementById("fileDialog");
  chooser.addEventListener("change", (function(evt) {
    let chooser = document.getElementById("fileDialog");
    if (chooser.value) {
      fs.writeFileSync(chooser.value, content_to_save);
      chooser.value = undefined;
    }
  }).bind(this), false);
  chooser.click();
*/
}


function get_random(min, max){
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
    x = get_random(PointMarker.radius, x_max-PointMarker.radius);
    y = get_random(PointMarker.radius, y_max-PointMarker.radius);
    let point = new Point(x, y);
    p.push(point)
  }
  let segment_widget = new SegmentWidget(base_canvas, base_canvas, p[0], p[1], "str_black str3");
//        base_canvas.deselect_all();
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
    x = get_random(PointMarker.radius, x_max-PointMarker.radius);
    y = get_random(PointMarker.radius, y_max-PointMarker.radius);
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

function open_lsvg() {

}

let base_canvas = new SVGCanvas(640, 480, "LSVG_frame");

window.onload = function() {
  base_canvas.paint();
}
