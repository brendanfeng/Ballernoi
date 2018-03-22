export default class Player {
  constructor(pos, key) {
    this.x = pos[0];
    this.y = pos[1];
    this.speed = 4;
    this.key = key;
  }

  updateAttr (pos, speed) {
    this.x = pos[0];
    this.y = pos[1];
    this.speed = speed;
  }


}
