class LSVGGroup extends LSVGContainer {
  constructor(lsvg_canvas, parent_lsvg_container) {
    super();
    this.id = undefined;
    this.visibility = "visble"
    this.lsvg_canvas = lsvg_canvas;
    this.parent_lsvg_container = parent_lsvg_container;
    parent_lsvg_container.registry(this);
    this._lsvg_head = `
    <g id="${this.id}">`;
          this._lsvg_tail = `
    </g>`;
  }
}
