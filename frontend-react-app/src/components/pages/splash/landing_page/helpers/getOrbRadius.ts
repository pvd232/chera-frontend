import { randomNum } from './randomNum';
export const getOrbRadius = (
  smallerScreen: boolean,
  windowWidth: number
): number => {
  if (smallerScreen) {
    return randomNum(windowWidth / 10, windowWidth / 8);
  } else {
    return randomNum(windowWidth / 16, windowWidth / 19);
  }
};
