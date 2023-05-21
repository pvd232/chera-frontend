import OrbBounds from '../types/OrbBounds';

export default function getOrbBounds(
  smallerScreen: boolean,
  windowWidth: number,
  windowHeight: number
): OrbBounds {
  // how far from the { x, y } origin can each orb move
  const maxDistX = smallerScreen ? windowWidth / 4 : windowWidth / 6;
  const maxDistY = smallerScreen ? windowHeight / 8 : windowHeight / 4;
  // the { x, y } origin for each orb (the bottom right of the screen)
  const originX = windowWidth / 1.25;
  const originY = windowHeight * 0.55;
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
