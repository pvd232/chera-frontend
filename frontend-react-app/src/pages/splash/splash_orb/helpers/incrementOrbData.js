export default function incrementOrbData(
  newX,
  oldX,
  newY,
  oldY,
  newScale,
  oldScale,
  xDelta,
  yDelta,
  scaleDelta
) {
  let updatedXPosition = oldX;
  let updatedYPosition = oldY;
  let updatedScale = oldScale;
  if (newX > oldX) {
    updatedXPosition += xDelta;
  } else {
    updatedXPosition -= xDelta;
  }

  if (newY > oldY) {
    updatedYPosition += yDelta;
  } else {
    updatedYPosition -= yDelta;
  }
  if (newScale > oldScale) {
    updatedScale += scaleDelta;
  } else {
    updatedScale -= scaleDelta;
  }
  return {
    xPosition: updatedXPosition,
    yPosition: updatedYPosition,
    scale: updatedScale,
  };
}
