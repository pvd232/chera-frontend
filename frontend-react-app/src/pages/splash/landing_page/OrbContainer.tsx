import { Grid } from '@mui/material';
import { Container, Stage, withFilters } from '@pixi/react';
import useWindowWidth from './hooks/useWindowWidth';
import KawaseBlurFilterOverride from './helpers/KawaseBlurFilterOverride';
import useOrbs from './hooks/useOrbs';
const OrbContainer = () => {
  const windowWidth = useWindowWidth();
  const orbs = useOrbs();
  const KawaseBlurFilterImpl = withFilters(Container, {
    blur: KawaseBlurFilterOverride,
  });

  return (
    <Grid container item>
      <Stage
        options={{
          autoDensity: true,
          backgroundAlpha: 0,
        }}
        width={windowWidth}
      >
        <KawaseBlurFilterImpl blur={{ blur: 30, quality: 10 }}>
          {/* Create the graphics component here */}
          {orbs.map((orb) => {
            return orb;
          })}
        </KawaseBlurFilterImpl>
      </Stage>
    </Grid>
  );
};
export default OrbContainer;
