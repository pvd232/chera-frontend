import { useRef, useState, useMemo } from 'react';
import { Color } from 'three';
import { useFrame } from '@react-three/fiber';
import getOrbBounds from './helpers/getOrbBounds';
import randomNum from './helpers/randomNum';
import getOrbPosition from './helpers/getOrbPosition';
import normalizeForThreeFiber from './helpers/normalizeForThreeFiber';
import incrementOrbData from './helpers/incrementOrbData';
import updateOrb from './helpers/updateOrb';
const Orb = (props) => {
  const bounds = getOrbBounds();

  const [orbData, setOrbData] = useState({
    xPosition: getOrbPosition('x', bounds),
    yPosition: getOrbPosition('y', bounds),
    xOffSet: randomNum(0, 1000),
    yOffSet: randomNum(0, 1000),
    scale: 1,
  });
  const inc = 0.02;
  const myMesh = useRef();

  useFrame(({ state }) => {
    const yDelta = 0.01;
    const xDelta = 0.01;
    const scaleDelta = 0.001;
    const updatedValues = (() => {
      // If the orb has moved to it's destination, update the destination
      if (
        Math.abs(
          myMesh.current.position.x -
            normalizeForThreeFiber(orbData.xPosition, false, bounds)
        ) <= 0.1 &&
        Math.abs(
          myMesh.current.position.y -
            normalizeForThreeFiber(false, orbData.yPosition, bounds)
        ) <= 0.1 &&
        Math.abs(myMesh.current.scale.x - orbData.scale) <= 0.002
      ) {
        const updatedValues = updateOrb(
          orbData.xOffSet,
          orbData.yOffSet,
          bounds,
          inc
        );
        setOrbData(updatedValues);
        return updatedValues;
      } else {
        return orbData;
      }
    })();

    const newCoordinates = incrementOrbData(
      normalizeForThreeFiber(updatedValues.xPosition, false, bounds),
      myMesh.current.position.x,
      normalizeForThreeFiber(false, updatedValues.yPosition, bounds),
      myMesh.current.position.y,
      updatedValues.scale,
      myMesh.current.scale.x,
      xDelta,
      yDelta,
      scaleDelta
    );

    myMesh.current.position.x = newCoordinates.xPosition;
    myMesh.current.position.y = newCoordinates.yPosition;
    myMesh.current.scale.x = newCoordinates.scale;
    myMesh.current.scale.y = newCoordinates.scale;
  });
  const uniforms = useMemo(
    () => ({
      iteration: { value: props.iteration },
    }),
    [props.iteration]
  );
  return (
    <mesh ref={myMesh}>
      <circleGeometry args={[1.4, 300]} />
      <meshBasicMaterial color="#c585f7" />
    </mesh>
  );
};
export default Orb;
