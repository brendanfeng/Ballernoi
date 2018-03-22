// document.getElementById('player-speed')
//   .addEventListener("change", calcDistance);
//
// document.getElementById('time')
//   .addEventListener("change", calcDistance);
//
export const calcPxDistance = (speed, time) => {
  return Math.floor(speed * 5280 / 3600 * 15 * time / 1000);
};
