class BezierWidget extends LSVGWidget {
  constructor(lsvg_canvas, parent_lsvg_container, point0, point1, point2, point3, css_class) {
    super(lsvg_canvas, parent_lsvg_container);
    this.point0 = point0;
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.bezier_path = new Bezier(this, point0, point1, point2, point3, css_class);

    this.control_segment01 = new HintLine(this, point0, point1);
    this.control_segment32 = new HintLine(this, point3, point2);

    this.point_marker0 = new PointMarker(this, point0);
    this.point_marker1 = new PointMarker(this, point1);
    this.point_marker0.selection_dependences.push(this.point_marker1)

    this.point_marker2 = new PointMarker(this, point2);
    this.point_marker3 = new PointMarker(this, point3);
    this.point_marker3.selection_dependences.push(this.point_marker2)
  }
}
