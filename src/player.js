import * as d3 from 'd3';

export default class Player {
  constructor(pos, id) {
    this.x = pos[0];
    this.y = pos[1];
    this.speed = 4;
    this.id = id;

    this.updateSpeed = this.updateSpeed.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  updateSpeed (speed) {
    this.speed = speed;
    // call court.draw()
  }

  openMenu () {
    console.log('open the menu!');
    // open up the menu for individual player
    // toggle class of the menu
    // add hidden input
    // pass id to the menu
    // pass speed to the menu for prefilled form
  }
}
