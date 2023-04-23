import mapValues from './mapValues';
export default function normalizeDimensions(
  xPosition = false,
  yPosition = false,
  bounds
) {
  if (xPosition) {
    return mapValues(
      xPosition,
      bounds['x'].min,
      bounds['x'].max,
      0,
      window.innerWidth
    );
  } else if (yPosition) {
    return mapValues(
      yPosition,
      bounds['y'].min,
      bounds['y'].max,
      0,
      window.innerWidth < 1000
        ? window.innerHeight * 0.5
        : window.innerHeight * 0.85
    );
  }
}
