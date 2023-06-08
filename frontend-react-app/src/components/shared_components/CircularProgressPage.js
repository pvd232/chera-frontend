import Grid from '@mui/material/Grid';
import BlueCircularProgress from './BlueCircularProgress';

const CircularProgressPage = () => (
  <Grid
    container
    justifyContent={'center'}
    alignItems={'center'}
    height={'80vh'}
    position={'fixed'}
  >
    <Grid item>
      <BlueCircularProgress />
    </Grid>
  </Grid>
);
export default CircularProgressPage;
