import * as d3 from 'd3';

export default class Player {
  constructor(pos, id) {
    this.x = pos[0];
    this.y = pos[1];
    this.speed = 4.000;
    this.id = id;
    this.clickedOn = false;

    this.harden = new Image();
    this.westbrook = new Image();
    this.davis = new Image();

    this.harden.src = "./assets/harden.png";
    this.westbrook.src = "./Ballernoi/assets/westbrook.png";
    this.davis.src = "./Ballernoi/assets/davis.png";

    this.updateSpeed = this.updateSpeed.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  drawPlayer (ctx) {
    let img;
    if (this.speed <= 4) {
      img = this.harden;
    } else if (this.speed <= 5) {
      img = this.westbrook;
    } else {
      img = this.davis;
    }
    ctx.beginPath();
    ctx.drawImage(img, this.x-8, this.y-15);
    if (this.clickedOn) {
      ctx.arc(this.x, this.y, 15, 0, 2*Math.PI);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgb(255,255,255)";
    }

    ctx.stroke();
    ctx.closePath();
  }

  drawRange (ctx, r) {
    const gradient = ctx.createRadialGradient(this.x, this.y, 15, this.x, this.y, r);
    gradient.addColorStop(0, 'rgba(255,0,0,1.0)');
    gradient.addColorStop(0.1, 'rgba(255,0,15,0.7)');
    gradient.addColorStop(0.2, 'rgba(225,0,45,0.7)');
    gradient.addColorStop(0.3, 'rgba(195,0,75,0.5)');
    gradient.addColorStop(0.4, 'rgba(165,0,105,0.5)');
    gradient.addColorStop(0.5, 'rgba(135,0,135,0.5)');
    gradient.addColorStop(0.6, 'rgba(105,0,165,0.5)');
    gradient.addColorStop(0.7, 'rgba(75,0,195,0.4)');
    gradient.addColorStop(0.8, 'rgba(45,0,225,0.4)');
    gradient.addColorStop(0.9, 'rgba(0,0,255,0.4)');
    gradient.addColorStop(1, 'rgba(0,0,255,0.4)');
    ctx.beginPath();
    ctx.moveTo(this.x + r, this.y);
    ctx.arc(this.x, this.y, r, 0, 2 * Math.PI);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,0,0,0.2)';
    ctx.stroke();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
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
