import OrbGeometry from '../types/OrbGeometry';
import { randomNum } from './randomNum';
export const getOrbInitialPosition = (
  smallerScreen: boolean,
  windowWidth: number,
  windowHeight: number,
  radius: number
): OrbGeometry => {
  if (smallerScreen) {
    return {
      xPosition: randomNum(0 * (windowWidth / 4), 1 * (windowWidth / 4)),
      yPosition: randomNum(windowHeight * 0.5, windowHeight * 0.7),
      radius: radius,
    };
  } else {
    return {
      xPosition: randomNum(3 * (windowWidth / 4), 4 * (windowWidth / 4)),
      yPosition: randomNum(windowHeight * 0.5, windowHeight * 0.575),
      radius,
    };
  }
};
