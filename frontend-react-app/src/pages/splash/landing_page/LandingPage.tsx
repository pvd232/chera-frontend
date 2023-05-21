import Grid from '@mui/material/Grid';
import OrbContainer from './OrbContainer.tsx';
import IntroTextBox from './IntroTextBox.tsx';
import styles from './scss/LandingPage.module.scss';
const LandingPage = () => (
  <Grid id="landingPage" container item className={styles.landingPageContainer}>
    <IntroTextBox />
    <OrbContainer />
  </Grid>
);
export default LandingPage;
