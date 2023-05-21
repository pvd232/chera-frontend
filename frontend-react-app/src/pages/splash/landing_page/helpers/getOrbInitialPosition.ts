import OrbGeometry from '../types/OrbGeometry';
import randomNum from './randomNum';
export default function getInitialOrbGeometry(
  smallerScreen: boolean,
  windowWidth: number,
  windowHeight: number,
  radius: number
): OrbGeometry {
  if (smallerScreen) {
    return {
      xPosition: randomNum(0, windowWidth / 4),
      yPosition: randomNum(0, windowHeight * 0.5),
      radius: radius,
    };
  } else {
    return {
      xPosition: randomNum(3 * (windowWidth / 4), 4 * (windowWidth / 4)),
      yPosition: randomNum(windowHeight * 0.5, windowHeight * 0.575),
      radius,
    };
  }
}
