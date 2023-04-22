export default function getOrbBounds() {
  // how far from the { x, y } origin can each orb move
  const maxDist =
    window.innerWidth < 1000 ? window.innerWidth / 3 : window.innerWidth / 5;
  // the { x, y } origin for each orb (the bottom right of the screen)
  const originX = window.innerWidth / 1.25;
  const originY =
    window.innerWidth < 1000 ? window.innerHeight : window.innerHeight / 1.375;

  // allow each orb to move x distance away from it's { x, y } origin
  return {
    x: {
      min: originX - maxDist,
      max: originX + maxDist,
    },
    y: {
      min: originY - maxDist,
      max: originY + maxDist,
    },
  };
}
