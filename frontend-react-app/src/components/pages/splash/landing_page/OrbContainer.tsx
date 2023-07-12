import { Grid } from '@mui/material';
import { Stage } from '@pixi/react';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import useOrbs from './hooks/useOrbs';
import { useWindowHeight } from '../../../hooks/useWindowHeight';
const OrbContainer = () => {
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();
  const orbs = useOrbs();

  return (
    <Grid container item>
      <Stage
        options={{
          autoDensity: true,
          backgroundAlpha: 0,
        }}
        width={0.989 * windowWidth}
        height={0.85 * windowHeight}
      >
        {orbs.map((orb) => {
          return orb;
        })}
      </Stage>
    </Grid>
  );
};
export default OrbContainer;
