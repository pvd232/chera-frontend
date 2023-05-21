import { useState } from 'react';
import randomNum from '../helpers/randomNum';
import getOrbPosition from '../helpers/getOrbPosition';
import ExtendedOrbPosition from '../types/RelativeOrbPosition';
import OrbBounds from '../types/OrbBounds';
export default function useOrbData(bounds: OrbBounds): [
  ExtendedOrbPosition,
  React.Dispatch<
    React.SetStateAction<{
      xPosition: number;
      yPosition: number;
      xOffSet: number;
      yOffSet: number;
      scale: number;
    }>
  >
] {
  const [orbData, setOrbData] = useState({
    xPosition: getOrbPosition('x', bounds),
    yPosition: getOrbPosition('y', bounds),
    xOffSet: randomNum(0, 1000),
    yOffSet: randomNum(0, 1000),
    scale: 1,
  });
  console.log('orbData', orbData);
  return [orbData, setOrbData];
}
