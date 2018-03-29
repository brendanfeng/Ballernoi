import * as d3 from 'd3';
import Player from './player';
import { calcPxDistance, vDiagram } from './calc';

export default class Court {
  constructor(canvas) {
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;

    this.time = 1000;
    this.players =
    [
      [0.35 * this.width, 0.5 * this.height],
      [0.65 * this.width, 0.5 * this.height],
      [0.2 * this.width, 0.8 * this.height],
      [0.5 * this.width, 0.8 * this.height],
      [0.8 * this.width, 0.8 * this.height]
    ].map( (pos, i) => {
      return new Player(pos, i); }
    );

    this.diagram = vDiagram(this);

    this.draw = this.draw.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  draw() {
    this.diagram = vDiagram(this);
    const polygons = this.diagram.polygons();
    this.context.clearRect(0, 0, this.width, this.height);

    for (let i = 0, n = this.players.length; i < n; ++i) {
      let player = this.players[i];
      let r = calcPxDistance(player.speed, this.time);
      player.drawRange(this.context, r);
    }

    for (let i = 0, n = polygons.length; i < n; ++i) {
      this.drawPoly(polygons[i]);
    }

    for (let i = 0, n = this.players.length; i < n; ++i) {
      let player = this.players[i];
      player.drawPlayer(this.context);
    }

  }

  drawPoly (poly) {
    this.context.beginPath();
    this.context.moveTo(poly[0][0], poly[0][1]);
    for (let i = 1, n = poly.length; i < n; ++i) {
      this.context.lineTo(poly[i][0], poly[i][1]);
    }
    this.context.lineWidth = 2;
    this.context.strokeStyle = "rgb(0,0,60)";
    this.context.stroke();
    this.context.closePath();
  }

  updateTime(time) {
    this.time = time;
    this.draw();
  }
}
