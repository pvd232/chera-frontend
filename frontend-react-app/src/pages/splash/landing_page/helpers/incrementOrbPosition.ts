import OrbPosition from '../types/OrbPosition';

export default function incrementOrbPosition(
  newX: number,
  oldX: number,
  newY: number,
  oldY: number,
  newScale: number,
  oldScale: number,
  xDelta: number,
  yDelta: number,
  scaleDelta: number
): OrbPosition {
  let updatedXPosition = oldX;
  let updatedYPosition = oldY;
  let updatedScale = oldScale;
  if (Math.abs(newX - oldX) > xDelta) {
    if (newX > oldX) {
      updatedXPosition += xDelta;
    } else {
      updatedXPosition -= xDelta;
    }
  } else {
    updatedXPosition = newX;
  }
  if (Math.abs(newY - oldY) > yDelta) {
    if (newY > oldY) {
      updatedYPosition += yDelta;
    } else {
      updatedYPosition -= yDelta;
    }
  } else {
    updatedYPosition = newY;
  }
  if (Math.abs(newScale - oldScale) > scaleDelta) {
    if (newScale > oldScale) {
      updatedScale += scaleDelta;
    } else {
      updatedScale -= scaleDelta;
    }
  } else {
    updatedScale = newScale;
  }
  return {
    xPosition: updatedXPosition,
    yPosition: updatedYPosition,
    scale: updatedScale,
  };
}
