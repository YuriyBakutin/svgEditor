class SVGCanvas extends LSVGContainer {
  constructor(width, height, html_container_id) {
    super();
    this.lsvg_canvas = this;
    this.id = html_container_id + "_";

    this._elements = new Object(); // Словарь элементов с ключом id.
    this._elements[this.id] = this;

    this.width = width;
    this.height = height;

    this.snaping = true;
    this.snaping_radius = 6;
    this.all_cap_points = new Array;


    this._html_container = window.document.getElementById(html_container_id);
    this._html_container.addEventListener("mousedown", this.SVGCanvas_onmousedown.bind(this));
    this._html_container.addEventListener("mousemove", this.SVGCanvas_onmousemove.bind(this));
    this._html_container.addEventListener("mouseup", this.SVGCanvas_onmouseup.bind(this));
    this._html_container.addEventListener("click", this.SVGCanvas_onclick.bind(this));

    this.moving_point_marker = undefined;
    this.moving_point_marker_shift = undefined;

    this._lsvg_head = `
<svg xmlns="http://www.w3.org/2000/svg"
     xml:space="preserve"
     width="${width}px"
     height="${height}px"
     version="1.1"
     style="shape-rendering:geometricPrecision; fill-rule:evenodd; clip-rule:evenodd"
     viewbox="0 0 ${width} ${height}"
     xmlns:xlink="http://www.w3.org/1999/xlink
     FunnyWorms:version="0.01 alpha"
>
  <style>
    @charset "UTF-8";
    .backgrownd {fill:#c0c0c0; stroke:none;}
    .str_black {stroke:black}
    .str3 {stroke-width:3; fill:none}
    .str2 {stroke-width:2; fill:none}
    .str1 {stroke-width:1; fill:none}
    .css_hint_line {stroke:red;stroke-width:2}
    .css_point_marker {fill:red;}
    .css_selected_point_marker {fill:red;}
  </style>
  <g>
    <rect id="${this.id}"
          x="0" y="0"
          width="${width}"
          height="${height}"
          class="backgrownd" />`;
    this._lsvg_tail = `
  </g>
</svg>`;
  }

  SVGCanvas_onmousedown(event) {
    let target_element = this._elements[event.target.id];
    let event_page_point = new Point(event.pageX, event.pageY)
    if(target_element instanceof PointMarker){
      this.moving_point_marker = target_element;
      target_element.select();
      this.moving_point_marker_shift = new Vector(event_page_point, target_element.control_point);
    }
  }

  SVGCanvas_onmousemove(event) {
    if(this.moving_point_marker) {
      let event_page_point = new Point(event.pageX, event.pageY)
      let canvas_picker_point = new Point(event_page_point.x +
                                   this.moving_point_marker_shift.x,
                                   event_page_point.y +
                                   this.moving_point_marker_shift.y
                                  )
      if(this.snaping) {
        for(let point of this.all_cap_points) {
          if(distance(point, canvas_picker_point) < this.snaping_radius) {
            canvas_picker_point = point;
            break;
          }
        }
      }


      let step_x = canvas_picker_point.x -
          this.moving_point_marker.control_point.x;
      let step_y = canvas_picker_point.y -
          this.moving_point_marker.control_point.y;

      this.moving_point_marker.control_point.x = canvas_picker_point.x;
      this.moving_point_marker.control_point.y = canvas_picker_point.y;
      for (let dependent of this.moving_point_marker.selection_dependences) {
        dependent.control_point.x += step_x;
        dependent.control_point.y += step_y;
      }
      this.paint();
    }
  }


/*
this.snaping = false;
this.snaping_radius = 3;
this.all_cap_points = new Array;
*/




  SVGCanvas_onmouseup(event) {
    if (this.moving_point_marker) {
      this.moving_point_marker.deselect();
      this.moving_point_marker = undefined;
      this.paint();
    }
  }

  SVGCanvas_onclick(event) {
    let target_element = this._elements[event.target.id];
    let target_widget = undefined;
    if(target_element && target_element.parent_lsvg_container instanceof LSVGWidget){
      target_widget = target_element.parent_lsvg_container;
      target_widget.select();
    }
   // Снимаем выделение с других выделенных виджетов.
    for (let id in this._elements) {
      let element = this._elements[id];
      if (element == target_widget) {
        continue;
      }
      if (element instanceof LSVGWidget && element.is_selected) {
        element.deselect();
      }
    }
  }

  paint() {
//    alert(this.all_cap_points);
    this.all_cap_points.length = 0;
    let content = this.get_lsvg_content();
    this._html_container.innerHTML = content;
  }

  save() {
    let for_save = true;
    choose_path_and_save_File(this.get_lsvg_content(for_save));
  }

  deselect_all(repaint = "repaint") {
    for (let id in this._elements) {
      let element = this._elements[id];
      if (element instanceof LSVGWidget && element.is_selected) {
        element.deselect(repaint);
      }
    }
  }

  clearSelected() {
    for (let id in this._elements) {
      let element = this._elements[id];
      if (element instanceof LSVGWidget && element.is_selected) {
        // Удалить виджет из родительского контейнера _children (Array)
        element.parent_lsvg_container._children.splice(this._children.indexOf(element), 1);
        // удалить из словаря _elements (Object)
        delete this._elements[id];
      }
    }
    this.paint();
  }


  clearAll() {
    this._children.length = 0;
    this.paint();
  }
}
