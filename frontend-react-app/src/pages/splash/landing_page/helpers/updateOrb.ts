import { createNoise2D } from 'simplex-noise';
import mapValues from './mapValues';
import OrbBounds from '../types/OrbBounds';
import ExtendedOrbPosition from '../types/RelativeOrbPosition';
export default function updateOrb(
  xOff: number,
  yOff: number,
  bounds: OrbBounds,
  inc: number
): ExtendedOrbPosition {
  // self similar "psuedo-random" or noise values at a given point in "time"
  const createXNoise = createNoise2D();
  const createYNoise = createNoise2D();
  const createScaleNoise = createNoise2D();
  const xNoise = createXNoise(xOff, xOff);
  const yNoise = createYNoise(yOff, yOff);
  const scaleNoise = createScaleNoise(xOff, yOff);

  // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds

  const xPosition = mapValues(xNoise, -1, 1, bounds['x'].min, bounds['x'].max);
  console.log('xPosition', xPosition);
  const yPosition = mapValues(yNoise, -1, 1, bounds['y'].min, bounds['y'].max);
  console.log('yPosition', yPosition);
  // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
  const scale = mapValues(scaleNoise, -1, 1, 0.5, 1);

  // step through "time"
  const xOffSet = xOff + inc;
  const yOffSet = yOff + inc;
  return {
    xPosition,
    yPosition,
    xOffSet,
    yOffSet,
    scale,
  };
}
