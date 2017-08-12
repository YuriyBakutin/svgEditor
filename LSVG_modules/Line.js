class Line extends LSVGPrimitive {
  constructor(parent_lsvg_container, start_point, end_point, css_class) {
    super(parent_lsvg_container, css_class);
    this.points = [start_point, end_point];
  }

  get_lsvg_content() {
    let content = `
      <line class="${this.css_class}"
            stroke-linecap="round"
            id="${this.id}"
            x1="${this.points[0].x}"
            y1="${this.points[0].y}"
            x2="${this.points[1].x}"
            y2="${this.points[1].y}" />`;
    return content;
  }
}
