import mapValues from './mapValues';
export default function normalizeForThreeFiber(
  xPosition = false,
  yPosition = false,
  bounds
) {
  if (xPosition) {
    return mapValues(xPosition, bounds['x'].min, bounds['x'].max, -3, 3);
  } else if (yPosition) {
    return mapValues(yPosition, bounds['y'].min, bounds['y'].max, -3, 3);
  }
}
