import { Button, Grid, Typography } from '@mui/material';
import styles from './scss/SignUpChoice.module.scss';
import { useAuth0 } from '@auth0/auth0-react';

export const SignUpChoice = () => {
  const { loginWithRedirect } = useAuth0();
  const handleDieitianClick = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
      appState: {
        returnTo: '/dietitian-sign-up',
      },
    });
  };
  const handleClientClick = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
      appState: {
        returnTo: '/dtc-sign-up',
      },
    });
  };
  return (
    <Grid container item className={styles.pageContainer}>
      <Grid container item xs={10} className={styles.contentContainer}>
        <Grid item>
          <Typography className={styles.header}>Let's get started</Typography>
        </Grid>
        <Grid item>
          <Typography className={styles.subHeader}>
            How will you be using Chera?
          </Typography>
        </Grid>
        <Grid container item className={styles.buttons}>
          <Grid
            item
            container
            lg={1}
            md={2}
            sm={3}
            xs={4}
            className={styles.container}
          >
            <Button
              variant="contained"
              className={styles.button}
              onClick={handleClientClick}
            >
              Client
            </Button>
          </Grid>
          <Grid
            item
            container
            lg={1}
            md={2}
            sm={3}
            xs={4}
            className={styles.container}
          >
            <Button
              variant="contained"
              className={styles.button}
              onClick={handleDieitianClick}
            >
              Dietitian
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
