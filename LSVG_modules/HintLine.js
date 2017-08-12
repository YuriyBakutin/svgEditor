class HintLine extends Line {
  constructor(parent_lsvg_container, start_point, end_point) {
    super(parent_lsvg_container, start_point, end_point, "css_hint_line")
    this.not_for_save = true;
  }

  get_lsvg_content() {
    let content = `
      <line class="${this.css_class}"
            style="visibility:${this.parent_lsvg_container.controls_visibility}"
            id="${this.id}"
            x1="${this.points[0].x}"
            y1="${this.points[0].y}"
            x2="${this.points[1].x}"
            y2="${this.points[1].y}" />`;
    return content;
  }
}
