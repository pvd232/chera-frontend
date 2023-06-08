import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import ScreenSize from '../../../../types/enums/ScreenSize';
import styles from '../scss/SplashLinks.module.scss';
import AboutDropDown from '../AboutDropDown';
import MobileDropDown from '../MobileDropDown';
import LogInDropDown from '../LogInDropDown';

const SplashLinks = () => {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < ScreenSize.xs;
  return (
    <Grid container item className={styles.splashLinksContainer}>
      {isMobile ? (
        <Grid item id="mobile-dropdown-grid-item">
          <MobileDropDown />
        </Grid>
      ) : (
        <>
          <Grid item>
            <AboutDropDown />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className={styles.dietitianSignupButton}
              onClick={() => navigate('/dietitian-sign-up')}
            >
              Dietitian sign up
            </Button>
          </Grid>

          <Grid item>
            <LogInDropDown />
            {/* <Button
              variant="outlined"
              className={styles.loginButton}
              onClick={() => navigate('/login')}
            >
              Login
            </Button> */}
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default SplashLinks;
