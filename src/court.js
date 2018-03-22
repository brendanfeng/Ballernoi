import * as d3 from "d3";
import Player from './player';
import { calcPxDistance } from './calc';

export default class Court {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;

    this.time = 1000;

    this.positions =
    [
      [0.35 * this.width, 0.5 * this.height],
      [0.65 * this.width, 0.5 * this.height],
      [0.2 * this.width, 0.8 * this.height],
      [0.5 * this.width, 0.8 * this.height],
      [0.8 * this.width, 0.8 * this.height]
    ];

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

    this.court = d3.select(document.createElement('court'));

    this.voronoi = d3.voronoi().extent([[0, 0], [this.width, this.height]]);

    // this.drawPoly = this.drawPoly.bind(this);
    // this.drawPos = this.drawPos.bind(this);
    // this.draw = this.draw.bind(this);
    // this.updateTime = this.updateTime.bind(this);
  }


  // canvas.call( d3.drag()
  //   .subject(dragsubject)
  //   .on("start", dragStart)
  //   .on("drag", dragged)
  //   .on("end", dragEnd)
  //   .on("start.render drag.render end.render", draw)
  // );

  dataBind() {
    const join = this.court.selectAll('court.player').data(this.players);
    join.enter()
      .append('court')
      .attr('class', 'player')
      .attr('x', (d) => {
        return d.x;
      })
      .attr('y', (d) => {
        return d.y;
      })
      .attr('speed', (d) => {
        return d.speed;
      })
      .attr('r', (d) => {
        return calcPxDistance(d.speed, this.time);
      });
    join.exit()
    .transition()
      .attr('speed', 0)
      .remove();
  }

  draw() {
    const a = this.court.selectAll('court.player');
    const positions = this.players.map((player) => [player.x, player.y]);
    const diagram = this.voronoi(this.positions);
    const polygons = diagram.polygons();
    this.context.clearRect(0, 0, this.width, this.height);

    this.context.beginPath();
    for (let i = 0, n = polygons.length; i < n; ++i) this.drawPoly(polygons[i]);
      this.context.strokeStyle = "#F60";
      this.context.stroke();

    this.context.beginPath();
    for (let i = 0, n = this.positions.length; i < n; ++i) this.drawPos(this.positions[i]);
      this.context.fillStyle = "#000";
      this.context.fill();
      this.context.strokeStyle = "#000";
      this.context.stroke();

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
    this.context.moveTo(pos[0] + 3, pos[1]);
    this.context.arc(pos[0], pos[1], 3, 0, 2 * Math.PI);
  }

  drawRange (x, y, r) {
    this.context.moveTo(x + r, y);
    this.context.arc(x, y, r, 0, 2 * Math.PI);
  }

  updateTime(time) {
    this.time = time;
    this.draw();
  }

  updateSpeed(player, speed) {
    player.speed = speed;
    this.draw();
  }
}
