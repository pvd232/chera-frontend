import { useTheme } from '@mui/material/styles';
import { useRef, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Container, Stage, withFilters } from '@pixi/react';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';
import Orb from './Orb';
import ColorPalette from './ColorPalette';
class KawaseOverride extends KawaseBlurFilter {
  constructor(blur, quality, clamp) {
    super(blur, quality, true);
  }
}
const OrbContainer = () => {
  const customTheme = useTheme();
  const canvasWidth = (() => {
    if (window.innerWidth / 1000) {
      return 3;
    } else {
      return 10;
    }
  })();
  const orbRef = useRef();
  const [mounted, setMounted] = useState(false);

  //   Divide the width of the window by 12 and multiply by 10 to get the width of the canvas
  useEffect(() => {
    setMounted(true);
  }, []);
  const KawaseBlurFilterImpl = withFilters(Container, {
    blur: KawaseOverride,
  });

  return (
    <Grid container item>
      <Stage
        options={{
          autoDensity: true,
          backgroundAlpha: 0,
        }}
        width={window.innerWidth}
      >
        <KawaseBlurFilterImpl
          blur={{ blur: 30, quality: 10 }}
          width={window.innerWidth * (canvasWidth / 12)}
        >
          {/* Create the graphics component here */}
          <Orb
            width={window.innerWidth * (canvasWidth / 12)}
            ref={orbRef}
            fill={ColorPalette.randomColor()}
            smallerScreen={customTheme.smallerScreen()}
          />
          {mounted &&
            (() => {
              const orbArray = [];
              for (let i = 0; i < 10; i++) {
                orbArray.push(
                  <Orb
                    key={i}
                    geometry={orbRef}
                    width={window.innerWidth * (canvasWidth / 12)}
                    fill={ColorPalette.randomColor()}
                    smallerScreen={customTheme.smallerScreen()}
                  />
                );
              }
              return orbArray;
            })()}
        </KawaseBlurFilterImpl>
      </Stage>
    </Grid>
  );
};
export default OrbContainer;
