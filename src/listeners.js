import * as d3 from 'd3';
import { clicked, playerCollision } from './calc';

export const addDraggable = (canvas, court) => {
  canvas.call( d3.drag()
    .subject(() => dragSubject(court))
    .on("start", dragStart)
    .on("drag", () => dragged(court))
    .on("end", dragEnd)
    .on("start.render drag.render end.render", court.draw)
  );
};

export const addClickable = (canvas, court) => {
  canvas.on("click", () => {
    const pos = {
      x: d3.event.offsetX,
      y: d3.event.offsetY
    };
    for (let i = 0, n = court.players.length; i < n; ++i) {
      let player = court.players[i];
      if (clicked(pos, player)) {
        player.toggleSelect();
        player.clickedOn ? player.openMenu() : player.closeMenu();
      } else {
        player.clickedOn = false;
      }
    }
  });
};

export const addSpeedListener = (court) => {
  const speed = d3.select("#player-speed");
  speed.on("input", () => {
    d3.event.preventDefault();
    court.players.forEach( (player) => {
      if (player.id === +speed.attr("playerId")) {
        player.updateSpeed(court, d3.event.target.value);
      }
    });
  });
};

export const addTimeListener = (court) => {
  const slider = d3.select("#coverage-time");
  const time = d3.select("#time-text");
  time.html((slider.property("value") / 100) + " sec");
  slider.on('input', () => {
    d3.event.preventDefault();
    time.html(d3.event.target.value / 100);
    court.updateTime(d3.event.target.value * 10);
  });
};

const dragSubject = (court) => {
  let subject, i, n, player, site;
  for (i = 0, n = court.players.length; i < n; ++i) {
    player = court.players[i];
    site = court.diagram.find(d3.event.x, d3.event.y);
    if (site[0] === player.x && site[1] === player.y) {
      subject = player;
      break;
    }
  }
  return subject;
};

const dragStart = () => {
  d3.event.subject.active = true;
};

const dragged = (court) => {
  const subjectIdx = court.players.indexOf(d3.event.subject);
  const otherPlayers = Array.from(court.players);
  otherPlayers.splice(subjectIdx, 1);
    if (otherPlayers.every((currentValue) => !playerCollision([d3.event.x, d3.event.y], currentValue))) {
      d3.event.subject.x = d3.event.x;
      d3.event.subject.y = d3.event.y;
    }
};

const dragEnd =() => {
  d3.event.subject.active = false;
};
