class Bezier extends LSVGPrimitive {
  constructor(parent_lsvg_container, point0, point1, point2, point3, css_class) {
    super(parent_lsvg_container, css_class);
    this.points = [point0, point1, point2, point3];
  }

  get_lsvg_content() {
    let content = `
      <path class="${this.css_class}"
            stroke-linecap="round"
            id="${this.id}"` +
`
            d= "M${this.points[0].x} ${this.points[0].y}` +
` C${this.points[1].x},${this.points[1].y}` +
` ${this.points[2].x},${this.points[2].y}` +
` ${this.points[3].x},${this.points[3].y}"/>`;
    return content;
  }
}
