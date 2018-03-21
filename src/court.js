import * as d3 from "d3";
import Player from './player';
import * as calc from './calc';


export default class Court {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;

    this.positions = d3.range(5).map( (p) => {
      return [Math.random() * this.width, Math.random() * this.height];
    });

    // this.players = this.positions.map( (pos) => {
    //   return new Player(pos); }
    // );

    this.voronoi = d3.voronoi().extent([[0, 0], [this.width, this.height]]);
    // this.drawPoly = this.drawPoly.bind(this);
    // this.drawPos = this.drawPos.bind(this);
    // this.draw = this.draw.bind(this);
  }


  // canvas.call( d3.drag()
  //   .subject(dragsubject)
  //   .on("start", dragStart)
  //   .on("drag", dragged)
  //   .on("end", dragEnd)
  //   .on("start.render drag.render end.render", draw)
  // );

  draw() {
    const diagram = this.voronoi(this.positions);
    const polygons = diagram.polygons();

    this.context.beginPath();
    for (let i = 0, n = polygons.length; i < n; ++i) this.drawPoly(polygons[i]);
      this.context.strokeStyle = "#000";
      this.context.stroke();

    this.context.beginPath();
    for (let i = 0, n = this.positions.length; i < n; ++i) this.drawPos(this.positions[i]);
      this.context.fillStyle = "#000";
      this.context.fill();
      this.context.strokeStyle = "#fff";
      this.context.stroke();
  }

  drawPoly (poly) {
    this.context.moveTo(poly[0][0], poly[0][1]);
    for (let i = 1, n = poly.length; i < n; ++i) {
      this.context.lineTo(poly[i][0], poly[i][1]);
    }
    this.context.closePath();
  }

  drawPos (pos) {
    this.context.moveTo(pos[0] + 3, pos[1]);
    this.context.arc(pos[0], pos[1], 3, 0, 2 * Math.PI, false);
  }
}
