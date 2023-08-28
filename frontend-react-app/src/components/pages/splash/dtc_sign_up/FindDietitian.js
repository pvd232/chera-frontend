import { Grid, Typography } from '@mui/material';
import styles from './scss/FindDietitian.module.scss';
import nourishLogo from '../../../../static/images/nourish_logo.png';
import ariseLogo from '../../../../static/images/arise_logo.png';
import equipLogo from '../../../../static/images/equip_logo.png';
export const FindDietitian = () => {
  const handleNavigate = (event) => {
    const id = event.currentTarget.id;
    switch (id) {
      case 'nourish':
        window.location.assign('https://usenourish.com/');
        break;
      case 'arise':
        window.location.assign('https://www.wearise.com/');
        break;
      case 'equip':
        window.location.assign('https://equip.health');
        break;
      default:
        break;
    }
  };
  return (
    <Grid container item className={styles.pageContainer}>
      <Grid container item xs={10} className={styles.contentContainer}>
        <Grid item>
          <Typography className={styles.header}>
            We're all in this together
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={styles.subHeader}>
            We recommend the following telemedince providers
          </Typography>
        </Grid>
        <Grid container item className={styles.buttons}>
          <Grid
            item
            container
            lg={2}
            md={2}
            sm={3}
            xs={4}
            className={styles.container}
          >
            <img
              id="arise"
              src={ariseLogo}
              alt="Arise logo"
              className={styles.button}
              onClick={handleNavigate}
            />
          </Grid>
          <Grid
            item
            container
            lg={2}
            md={2}
            sm={3}
            xs={4}
            className={styles.container}
          >
            <img
              id="equip"
              src={equipLogo}
              alt="Equipt logo"
              className={styles.button}
              onClick={handleNavigate}
            />
          </Grid>
          <Grid
            item
            container
            lg={2}
            md={2}
            sm={3}
            xs={4}
            className={styles.container}
          >
            <img
              id="nourish"
              src={nourishLogo}
              alt="Nourish logo"
              className={styles.button}
              onClick={handleNavigate}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
