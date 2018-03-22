import Court from './court';
import * as d3 from 'd3';
import { calcPxDistance } from './calc';

const visibleCanvas = d3.select("#container")
  .append("canvas")
  .attr('width', 750)
  .attr('height', 705);

const court = new Court(visibleCanvas.node());

court.draw();
