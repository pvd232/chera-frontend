import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import ScreenSize from '../../../../types/enums/ScreenSize';
import styles from '../scss/SplashLinks.module.scss';
import AboutDropDown from '../AboutDropDown';
import MobileDropDown from '../MobileDropDown';
import LogInDropDown from '../LogInDropDown';
import { useAuth0 } from '@auth0/auth0-react';

const SplashLinks = () => {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const { loginWithRedirect } = useAuth0();
  
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
              onClick={() =>
                loginWithRedirect({
                  authorizationParams:{
                    screen_hint: 'signup',
                  },
                  appState: {
                    returnTo: '/dietitian-sign-up'
                  }
                })
              }
            >
              Dietitian sign up
            </Button>
          </Grid>

          <Grid item>
            <LogInDropDown />
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default SplashLinks;
