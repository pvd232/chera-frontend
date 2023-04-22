import randomNum from './helpers/randomNum';
import * as hsl from 'hsl';
export default class ColorPalette {
  static randomColor() {
    // pick a random hue somewhere between 270 and 340
    this.hue = ~~randomNum(320, 370);
    // define a fixed saturation and lightness
    this.saturation = 95;
    this.lightness = 50;
    this.opacity = 0.5;
    // define a base color
    this.baseColor = hsl(
      this.hue,
      this.saturation,
      this.lightness,
      this.opacity
    );

    // store the color choices in an array so that a randomNum one can be picked later

    // Pick a random color from the colorChoices array
    return this.baseColor.replace('#', '0x');
  }
}
