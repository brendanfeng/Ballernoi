import Court from './court';
import * as d3 from 'd3';
import {
  addClickable,
  addDraggable,
  addNBAListener,
  addSpeedListener,
  addTimeListener
} from './listeners';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = d3.select("#container")
  .append("canvas")
  .attr('width', 750)
  .attr('height', 705);
  const court = new Court(canvas.node());

  addClickable(canvas, court);
  addDraggable(canvas, court);
  addNBAListener(court);
  addSpeedListener(court);
  addTimeListener(court);
  setInterval(court.draw, 1000);
});
