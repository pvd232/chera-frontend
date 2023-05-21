import { Grid } from '@mui/material';
import { Container, Stage, withFilters } from '@pixi/react';
import Orb from './Orb';
import randomColor from './helpers/randomColor';
import useWindowWidth from './hooks/useWindowWidth';
import KawaseBlurFilterOverride from './helpers/KawaseBlurFilterOverride';
import useMounted from './hooks/useMounted';
const OrbContainer = () => {
  const mounted = useMounted();
  const windowWidth = useWindowWidth();

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
          {mounted &&
            (() => {
              const orbArray = [];
              for (let i = 0; i < 10; i++) {
                orbArray.push(<Orb key={i} fill={randomColor()} />);
              }
              return orbArray;
            })()}
        </KawaseBlurFilterImpl>
      </Stage>
    </Grid>
  );
};
export default OrbContainer;
