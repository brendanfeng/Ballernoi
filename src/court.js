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
    const positions = this.players.map((player) => [player.x, player.y]);
    this.diagram = vDiagram(this);
    const polygons = this.diagram.polygons();
    this.context.clearRect(0, 0, this.width, this.height);

    this.context.beginPath();
    for (let i = 0, n = polygons.length; i < n; ++i) this.drawPoly(polygons[i]);
      this.context.strokeStyle = "#F60";
      this.context.stroke();

    this.context.beginPath();
    for (let i = 0, n = positions.length; i < n; ++i) {
      this.drawPos(positions[i]);
      this.context.fillStyle = "#000";
      this.context.fill();
      this.context.strokeStyle = "#000";
      this.context.stroke();
    }

    this.context.beginPath();
    for (let i = 0, n = this.players.length; i < n; ++i) {
      let player = this.players[i];
      let r = calcPxDistance(player.speed, this.time);
      this.drawRange(player.x, player.y, r);
    }
      this.context.strokeStyle = "#000";
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
    this.context.moveTo(pos[0] + 15, pos[1]);
    this.context.arc(pos[0], pos[1], 15, 0, 2 * Math.PI);
  }

  drawRange (x, y, r) {
    this.context.moveTo(x + r, y);
    this.context.arc(x, y, r, 0, 2 * Math.PI);
  }

  updateTime(time) {
    this.time = time;
    this.draw();
  }
}
