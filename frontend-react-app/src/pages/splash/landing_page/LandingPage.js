import Grid from '@mui/material/Grid';
import OrbContainer from './OrbContainer';
import IntroTextBox from './IntroTextBox';

const LandingPage = (props) => (
  <Grid
    item
    container
    justifyContent={'center'}
    sx={{
      backgroundColor: props.customTheme.palette.white1.main,
      height: props.customTheme.smallerScreen() ? '90vh' : '100vh',
    }}
  >
    <OrbContainer customTheme={props.customTheme} />
    <IntroTextBox executeScroll={props.executeScroll} />
  </Grid>
);
export default LandingPage;
