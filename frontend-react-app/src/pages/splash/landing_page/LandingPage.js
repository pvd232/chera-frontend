import Grid from '@mui/material/Grid';
import OrbContainer from './OrbContainer';
import IntroTextBox from './IntroTextBox';

const LandingPage = (props) => (
  <Grid item container justifyContent={'center'}>
    <OrbContainer customTheme={props.customTheme} />
    <IntroTextBox executeScroll={props.executeScroll} />
  </Grid>
);
export default LandingPage;
