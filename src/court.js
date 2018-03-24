import * as d3 from "d3";
import Player from './player';
import {
  calcPxDistance,
  vDiagram,
  overlapPlayer,
} from './calc';

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
    this.addDraggable = this.addDraggable.bind(this);
    this.dragSubject = this.dragSubject.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragged = this.dragged.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.addClickable = this.addClickable.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  addDraggable(canvas) {
    canvas.call( d3.drag()
      .subject(this.dragSubject)
      .on("start", this.dragStart)
      .on("drag", this.dragged)
      .on("end", this.dragEnd)
      .on("start.render drag.render end.render", this.draw)
    );
  }

  addClickable(canvas) {
    canvas.on("click", () => {
      const pos = {
        x: d3.event.offsetX,
        y: d3.event.offsetY
      };
      for (let i = 0, n = this.players.length; i < n; ++i) {
        let player = this.players[i];
        if (overlapPlayer(pos, player)) {
          player.openMenu();
        }
      }
    });
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
    for (let i = 0, n = positions.length; i < n; ++i) this.drawPos(positions[i]);
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

  dragSubject() {
    let subject, i, n, player, site;
    for (i = 0, n = this.players.length; i < n; ++i) {
      player = this.players[i];
      site = this.diagram.find(d3.event.x, d3.event.y);
      if (site[0] === player.x && site[1] === player.y) {
        subject = player;
        break;
      }
    }
    return subject;
  }

  dragStart() {
    d3.event.subject.active = true;
  }

  dragged() {
    const subjectIdx = this.players.indexOf(d3.event.subject);
    const otherPlayers = Array.from(this.players);
    otherPlayers.splice(subjectIdx, 1);
      if (otherPlayers.every((currentValue) => !overlapPlayer({x: d3.event.x, y: d3.event.y}, currentValue))) {
        d3.event.subject.x = d3.event.x;
        d3.event.subject.y = d3.event.y;
      }
  }

  dragEnd() {
    d3.event.subject.active = false;
  }

  drawPoly (poly) {
    this.context.moveTo(poly[0][0], poly[0][1]);
    for (let i = 1, n = poly.length; i < n; ++i) {
      this.context.lineTo(poly[i][0], poly[i][1]);
    }
    this.context.closePath();
  }

  drawPos (pos) {
    this.context.moveTo(pos[0] + 8, pos[1]);
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
