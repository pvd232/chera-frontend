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
    }}
  >
    <OrbContainer customTheme={props.customTheme} />
    <IntroTextBox />
  </Grid>
);
export default LandingPage;
