import Court from './court';
import * as d3 from 'd3';

const court = new Court(d3.select("canvas").node());

court.draw();
