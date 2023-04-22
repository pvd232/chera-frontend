import { useRef, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Container, Stage, withFilters } from '@pixi/react';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';
import Orb from './Orb';
import '../../../static/css/Orb.css';
import ColorPalette from './ColorPalette';

const OrbContainer = (props) => {
  const canvasWidth = 10;
  const orbRef = useRef();
  const [mounted, setMounted] = useState(false);

  //   Divide the width of the window by 12 and multiply by 10 to get the width of the canvas
  useEffect(() => {
    setMounted(true);
  }, []);

  const KawaseBlurFilterImpl = withFilters(Container, {
    blur: KawaseBlurFilter,
  });

  return (
    <Grid
      item
      container
      xs={12}
      justifyContent={'center'}
      className="orb-canvas"
    >
      <Stage
        options={{
          autoDensity: true,
          backgroundAlpha: 0,
        }}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <KawaseBlurFilterImpl
          blur={{ blur: 30, quality: 10 }}
          width={window.innerWidth * (canvasWidth / 12)}
          height={window.innerHeight * 0.75}
          position={[0, window.innerHeight * 0.15]}
        >
          {/* create the graphics component here */}
          <Orb
            width={window.innerWidth * (canvasWidth / 12)}
            ref={orbRef}
            fill={ColorPalette.randomColor()}
          />
          {mounted &&
            (() => {
              const orbArray = [];
              for (let i = 0; i < 9; i++) {
                orbArray.push(
                  <Orb
                    key={i}
                    geometry={orbRef}
                    width={window.innerWidth * (canvasWidth / 12)}
                    fill={ColorPalette.randomColor()}
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
