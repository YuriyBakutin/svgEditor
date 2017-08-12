class LSVGPrimitive {
  constructor(parent_lsvg_container, css_class) {
    this.id = undefined;
    this.css_class = css_class;
    this.parent_lsvg_container = parent_lsvg_container;
    parent_lsvg_container.registry(this);
  }
}
