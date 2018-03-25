import Court from './court';
import * as d3 from 'd3';
import {
  addClickable,
  addDraggable,
  addSpeedListener,
  addTimeListener
} from './listeners';



const canvas = d3.select("#container")
  .append("canvas")
  .attr('width', 750)
  .attr('height', 705);
const court = new Court(canvas.node());

addClickable(canvas, court);
addDraggable(canvas, court);
addSpeedListener(court);
addTimeListener(court);
court.draw();
