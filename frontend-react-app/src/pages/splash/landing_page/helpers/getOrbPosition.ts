import OrbBounds from '../types/OrbBounds';
import randomNum from './randomNum';
export default function getOrbPosition(
  axis: string,
  bounds: OrbBounds
): number {
  if (axis === 'x') {
    return randomNum(bounds['x'].min, bounds['x'].max);
  } else {
    return randomNum(bounds['y'].min, bounds['y'].max);
  }
}
