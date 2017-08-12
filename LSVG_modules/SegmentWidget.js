class SegmentWidget extends LSVGWidget {
  constructor(lsvg_canvas, parent_lsvg_container, point0, point1, css_class) {
    super(lsvg_canvas, parent_lsvg_container);
    this.point0 = point0;
    this.point1 = point1;
    this.segment = new Line(this, point0, point1, css_class);
    this.point_marker0 = new PointMarker(this, point0);
    this.point_marker1 = new PointMarker(this, point1);
  }
}
