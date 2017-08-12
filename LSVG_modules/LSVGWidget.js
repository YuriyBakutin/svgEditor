class LSVGWidget extends LSVGGroup {
  constructor(lsvg_canvas, parent_lsvg_container) {
    super(lsvg_canvas, parent_lsvg_container);
    this.controls_visibility = "hidden";
    this.is_selected = false;
  }

  select(repaint = "repaint") {
    this.is_selected = true;
    this.parent_lsvg_container.to_top(this);
    this.controls_visibility = "visible";
    if(repaint === "repaint") {
      this.lsvg_canvas.paint();
    }
  }

  deselect(repaint = "repaint") {
    this.is_selected = false;
    this.controls_visibility = "hidden";
    for (let child of this._children) {
      if (child.css_class === "css_point_marker") {
        child.deselect();
      }
    }
    if(repaint === "repaint") {
      this.lsvg_canvas.paint();
    }
  }
}
