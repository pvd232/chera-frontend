import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import NewMenuListComposition from '../AboutDropDown';
import styles from '../scss/SplashLinks.module.scss';
const SplashLinks = () => (
  <Grid container className={styles.splashLinksContainer}>
    <Grid item>
      <NewMenuListComposition />
    </Grid>
    <Grid item>
      <Button variant="contained" className={styles.dietitianSignupButton}>
        Dietitian sign up
      </Button>
    </Grid>

    <Grid item>
      <Button variant="outlined" className={styles.loginButton}>
        Login
      </Button>
    </Grid>
  </Grid>
);
export default SplashLinks;
