import OrbBounds from '../types/OrbBounds';

export const getOrbBounds = (
  smallerScreen: boolean,
  windowWidth: number,
  windowHeight: number
): OrbBounds => {
  // how far from the { x, y } origin can each orb move
  const maxDistX = smallerScreen ? windowWidth / 10 : windowWidth / 6;
  const maxDistY = smallerScreen ? windowHeight / 12 : windowHeight / 4;
  // the { x, y } origin for each orb (the bottom right of the screen)
  const originX = smallerScreen ? windowWidth / 3.5 : windowWidth / 1.25;
  const originY = smallerScreen ? windowHeight * 0.65 : windowHeight * 0.55;
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
};
