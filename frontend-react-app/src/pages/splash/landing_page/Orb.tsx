import { useCallback, useRef, ComponentProps } from 'react';
import { useTick } from '@pixi/react';
import { getOrbBounds } from './helpers/getOrbBounds';
import { incrementOrbPosition } from './helpers/incrementOrbPosition';
import { updateOrb } from './helpers/updateOrb';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { useWindowHeight } from '../../../hooks/useWindowHeight';
import useOrbData from './hooks/useOrbData';
import { getOrbRadius } from './helpers/getOrbRadius';
import { getOrbInitialPosition } from './helpers/getOrbInitialPosition';
import { orbPositionRequiresUpdate } from './helpers/orbPositionRequiresUpdate';
import PixiPosition from './types/PixiPosition';
import { Graphics, PixiRef } from '@pixi/react';
import OrbProps from './types/OrbProps';
import ScreenSize from '../../../types/enums/ScreenSize';
const Orb = (props: OrbProps) => {
  const inc = 0.08;
  const defaultPosition = {
    position: {
      x: 0,
      y: 0,
    },
    scale: {
      x: 1,
      y: 1,
    },
  };
  const orbRef = useRef<PixiRef<PixiPosition>>(
    defaultPosition as PixiRef<PixiPosition>
  );
  const windowWidth = useWindowWidth();

  const windowHeight = useWindowHeight();
  const xsScreen = windowWidth < ScreenSize.xs;
  const bounds = (() => getOrbBounds(xsScreen, windowWidth, windowHeight))();

  const [orbData, setOrbData] = useOrbData(bounds);
  type Draw = NonNullable<ComponentProps<typeof Graphics>['draw']>;
  const draw = useCallback<Draw>(
    (g) => {
      const radius = (() => {
        return getOrbRadius(xsScreen, windowWidth);
      })();
      const initialOrbPosition = getOrbInitialPosition(
        xsScreen,
        windowWidth,
        windowHeight,
        radius
      );
      // Set relative position of Orb's bounding box to the initial position
      g.x = initialOrbPosition.xPosition;
      g.y = initialOrbPosition.yPosition;
      g.scale.set(1);

      // Clear anything currently drawn to graphics
      g.clear();

      // Tell graphics to fill any shapes drawn after this with the orb's fill color
      g.beginFill(props.fill);
      // Draw a circle with the given radius at the origin relative to the orb's bounding box
      g.drawCircle(0, 0, radius);
      // Let graphics know we won't be filling in any more shapes
      g.endFill();
    },
    [xsScreen, props.fill, windowHeight, windowWidth]
  );
  useTick((delta) => {
    const yDelta = 0.5;
    const xDelta = 0.5;
    const scaleDelta = 0.001;
    const updatedValues = (() => {
      // If the orb has moved to it's destination, update the destination
      if (
        orbPositionRequiresUpdate(
          orbRef.current.position.x,
          orbRef.current.position.y,
          orbRef.current.scale.x,
          orbData.xPosition,
          orbData.yPosition,
          orbData.scale,
          xDelta,
          yDelta,
          scaleDelta
        )
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
    const newCoordinates = incrementOrbPosition(
      updatedValues.xPosition,
      orbRef.current.position.x,
      updatedValues.yPosition,
      orbRef.current.position.y,
      updatedValues.scale,
      orbRef.current.scale.x,
      xDelta,
      yDelta,
      scaleDelta
    );

    orbRef.current.position.x = newCoordinates.xPosition;
    orbRef.current.position.y = newCoordinates.yPosition;
    orbRef.current.scale.x = newCoordinates.scale;
    orbRef.current.scale.y = newCoordinates.scale;
  });
  return <Graphics draw={draw} ref={orbRef} />;
};
export default Orb;
