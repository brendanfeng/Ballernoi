import Court from "./court";
import * as d3 from "d3";
import {
  addModal,
  addClickable,
  addDraggable,
  addNBAListener,
  addSpeedListener,
  addTimeListener
} from "./listeners";

document.addEventListener("DOMContentLoaded", () => {
  const vExplanation = document.getElementById("voronoi-explanation");
  const vClose = document.getElementById("close-voronoi");
  const vOpen = document.getElementById("open-voronoi");
  const dataExplanation = document.getElementById("data-explanation");
  const dataClose = document.getElementById("close-data");
  const dataOpen = document.getElementById("open-data");
  const menuExplanation = document.getElementById("menu-explanation");
  const menuClose = document.getElementById("close-menu");
  const menuOpen = document.getElementById("open-menu");
  const canvas = d3
    .select("#container")
    .append("canvas")
    .attr("width", 750)
    .attr("height", 705);
  const court = new Court(canvas.node());
  const animate = time => {
    court.draw();
    requestAnimationFrame(animate);
  };

  addModal(vExplanation, vClose, vOpen);
  addModal(dataExplanation, dataClose, dataOpen);
  addModal(menuExplanation, menuClose, menuOpen);
  addClickable(canvas, court);
  addDraggable(canvas, court);
  addNBAListener(court);
  addSpeedListener(court);
  addTimeListener(court);
  requestAnimationFrame(animate);
});
