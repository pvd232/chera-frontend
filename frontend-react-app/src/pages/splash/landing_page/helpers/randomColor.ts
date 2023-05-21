import randomNum from './randomNum';
import * as hsl from 'hsl';
export default function randomColor(): string {
  // pick a random hue somewhere between 270 and 340
  const hue = ~~randomNum(310, 370);
  // define a fixed saturation and lightness
  const saturation = 95;
  const lightness = 50;
  const opacity = 0.15;
  // define a base color
  const baseColor: string = hsl(hue, saturation, lightness, opacity);

  // store the color choices in an array so that a randomNum one can be picked later

  // Pick a random color from the colorChoices array
  return baseColor.replace('#', '0x');
}
