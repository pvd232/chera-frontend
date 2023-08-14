import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import ScreenSize from '../../../../types/enums/ScreenSize';
import styles from '../scss/SplashLinks.module.scss';
import AboutDropDown from '../AboutDropDown';
import MobileDropDown from '../MobileDropDown';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SplashLinks = () => {
  const windowWidth = useWindowWidth();
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
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
            <Typography
              className={styles.link}
              onClick={() => navigate('/splash-menu')}
            >
              Weekly Menu
            </Typography>
          </Grid>
          <Grid item>
            <AboutDropDown />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className={styles.dietitianSignupButton}
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    screen_hint: 'signup',
                  },
                  appState: {
                    returnTo: '/dietitian-sign-up',
                  },
                })
              }
            >
              Dietitian sign up
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              className={styles.dietitianSignupButton}
              onClick={() =>
                loginWithRedirect({
                  appState: {
                    returnTo: '/loading',
                  },
                })
              }
            >
              Log In
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default SplashLinks;
