export default function orbPositionRequiresUpdate(
  currentX: number,
  currentY: number,
  currentScale: number,
  targetX: number,
  targetY: number,
  targetScale: number,
  xDelta: number,
  yDelta: number,
  scaleDelta: number
): boolean {
  if (
    Math.abs(currentX - targetX) <= xDelta &&
    Math.abs(currentY - targetY) <= yDelta &&
    Math.abs(currentScale - targetScale) <= scaleDelta
  ) {
    return true;
  } else {
    return false;
  }
}
