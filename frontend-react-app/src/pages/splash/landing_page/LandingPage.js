import Grid from '@mui/material/Grid';
import OrbContainer from './OrbContainer';
import IntroTextBox from './IntroTextBox';

const LandingPage = (props) => (
  <Grid container item justifyContent={'center'} position={'relative'}>
    <IntroTextBox customTheme={props.customTheme} />
    <OrbContainer customTheme={props.customTheme} />
  </Grid>
);
export default LandingPage;
