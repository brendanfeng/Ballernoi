import * as d3 from 'd3';

export default class Player {
  constructor(pos, id) {
    this.x = pos[0];
    this.y = pos[1];
    this.speed = 4.000;
    this.id = id;
    this.clickedOn = false;

    this.updateSpeed = this.updateSpeed.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  updateSpeed (court, speed) {
    this.speed = speed;
    court.draw();
  }

  toggleSelect () {
    if (this.clickedOn) {
      this.clickedOn = false;
    } else {
      this.clickedOn = true;
    }
  }

  openMenu () {
    const menu = d3.select(".player-menu");
    const input = d3.select("#player-speed");
    input.attr('playerId', this.id);
    input.property("value", this.speed);
    menu.classed('show', true);
  }

  closeMenu () {
    const menu = d3.select(".player-menu");
    menu.classed('show', null);
  }
}
