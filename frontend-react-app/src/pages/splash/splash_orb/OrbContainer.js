import { Canvas } from '@react-three/fiber';
import Grid from '@mui/material/Grid';
import Orb from './Orb';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import CustomKawaseBlurPass from './CustomKawaseBlurPass';
const OrbContainer = () => {
  const orbArray = [];
  for (let i = 0; i < 10; i++) {
    orbArray.push(<Orb key={i} />);
  }
  return (
    <>
      <Grid
        container
        id="canvas-container"
        justifyContent={'center'}
        sx={{ height: '80vh' }}
        className="orb-canvas"
      >
        <Grid item xs={10}>
          <Canvas>
            {orbArray.map((orb) => orb)}
            <EffectComposer>
              <CustomKawaseBlurPass props={{ deltaX: 1.0, deltaY: -1.0 }} />
              <CustomKawaseBlurPass props={{ deltaX: -1.0, deltaY: 1.0 }} />

              {/* <DepthOfField
                focusDistance={1.2}
                focalLength={0.1}
                bokehScale={20}
              /> */}
            </EffectComposer>
          </Canvas>
        </Grid>
      </Grid>
    </>
  );
};
export default OrbContainer;
