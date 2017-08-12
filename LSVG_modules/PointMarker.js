class PointMarker extends LSVGPrimitive {
  constructor(parent_lsvg_container, control_point) {
    super(parent_lsvg_container, "css_point_marker");
    this.not_for_save = true;
    this.control_point = control_point;
    this.selection_dependences = new Array();
  }

  get_lsvg_content() {
    let content =  `
<circle class="${this.css_class}"
        style="visibility:${this.parent_lsvg_container.controls_visibility}"
        id="${this.id}"
        cx="${this.control_point.x}"
        cy="${this.control_point.y}"
        r="${PointMarker.radius}" />`;
    return content;
  }

  static get radius() {
    return 4;
  }

  select() {
    this.css_class = "css_selected_point_marker";
    for (let elem of this.selection_dependences) {
      elem.css_class = this.css_class;
    }
  }

  deselect() {
    this.css_class = "css_point_marker";
    for (let elem of this.selection_dependences) {
      elem.css_class = this.css_class;
    }
  }
}
