class LSVGContainer {
  constructor() {
    this.lsvg_canvas = undefined;
    this.id = undefined;
    this._children = new Array();
    this._lsvg_head = undefined;
    this._lsvg_tail = undefined;
    this._lsvg_content = undefined;
    this.parent_lsvg_container = undefined;
  }

  get_lsvg_content(for_save = false) {
    this._lsvg_content = this._lsvg_head;

    for(let child of this._children) {
      if(for_save && child.not_for_save) {
        continue;
      }
      this._lsvg_content += child.get_lsvg_content(for_save);

      if( !(child instanceof HintLine ||
            child instanceof PointMarker ||
            child instanceof LSVGContainer ))
      {
        let point_string = "";
        for(let point of child.points) {
          this.lsvg_canvas.all_cap_points.push(point);
        }
      }
    }
    this._lsvg_content += this._lsvg_tail;
    return this._lsvg_content;
  }

  registry(svg_object) {
    svg_object.id = this.id + "_" + this._children.length;
    this._children.push(svg_object);
    this.lsvg_canvas._elements[svg_object.id] = svg_object;
  }

  to_top(element) {
    this._children.splice(this._children.indexOf(element), 1);
    this._children.push(element);
    if (this.parent_lsvg_container) {
      this.parent_lsvg_container.to_top(this);
    }
  }
}
