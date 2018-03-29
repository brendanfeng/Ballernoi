import * as d3 from 'd3';

export const calcPxDistance = (speed, time) => {
  return Math.floor(speed * 5280 / 3600 * 15 * time / 1000);
};

export const vDiagram = (court) => {
  const voronoi = d3.voronoi().extent([[0, 0], [court.width, court.height]]);
  const positions = court.players.map((player) => [player.x, player.y]);
  const voronoiDiagram = voronoi(positions);
  return voronoiDiagram;
};

export const clicked = (mousePos, player) => {
  const distance = Math.sqrt((player.y - mousePos.y) ** 2 + (player.x - mousePos.x) ** 2);
  return distance < 15
}

export const playerCollided = (currentPos, otherPlayer) => {
  const distance = Math.sqrt((currentPos[0] - otherPlayer.x) ** 2 + (currentPos[1] - otherPlayer.y) ** 2);
  const outsideBounds = currentPos[0] > 750 || currentPos[1] > 705 || currentPos[0] < 0 || currentPos[1] < 0;
  return distance < 30 || outsideBounds;
}
