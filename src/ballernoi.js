import Court from './court';
import * as d3 from 'd3';
import { calcPxDistance } from './calc';

const canvas = d3.select("#container")
  .append("canvas")
  .attr('width', 750)
  .attr('height', 705);

const court = new Court(canvas.node());

court.addClickable(canvas);
court.addDraggable(canvas);
court.draw();

// d3.select(".player-speed")
// add event listener to menu that called updateSpeed;

// d3.select(".coverage-time")
// add event listenter to menu that edits court.time;
