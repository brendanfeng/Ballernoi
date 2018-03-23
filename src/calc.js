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
