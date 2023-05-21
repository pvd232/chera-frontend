import randomNum from './randomNum';
export default function getOrbRadius(
  smallerScreen: boolean,
  windowWidth: number,
  windowHeight: number
): number {
  if (smallerScreen) {
    return randomNum(windowWidth / 8, windowWidth / 6);
  } else {
    return randomNum(windowHeight / 10, windowHeight / 7);
  }
}
