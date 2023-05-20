export default function getOrbBounds() {
  // how far from the { x, y } origin can each orb move
  const maxDistX =
    window.innerWidth < 1000 ? window.innerWidth / 7 : window.innerWidth / 40;
  const maxDistY =
    window.innerWidth < 1000 ? window.innerHeight / 8 : window.innerHeight / 12;
  // the { x, y } origin for each orb (the bottom right of the screen)
  const originX = maxDistX * 4;
  const originY = maxDistY;
  // allow each orb to move x distance away from it's { x, y } origin
  return {
    x: {
      min: originX - maxDistX,
      max: originX + maxDistX,
    },
    y: {
      min: originY - maxDistY,
      max: originY + maxDistY,
    },
  };
}
