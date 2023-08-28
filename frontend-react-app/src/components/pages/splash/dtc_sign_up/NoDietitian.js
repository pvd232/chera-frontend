import { Button, Grid, Typography } from '@mui/material';
import styles from './scss/NoDietitian.module.scss';
import { useNavigate } from 'react-router-dom';

export const NoDietitian = () => {
  const navigate = useNavigate();
  const handleContinue = () => {};
  const handleNavigate = (event) => {
    const id = event.currentTarget.id;
    switch (id) {
      case 'find-dietitian':
        navigate('/find-dietitian');
        break;
      case 'no-dietitian':
        handleContinue();
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
            We're commited to increasing access to care
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={styles.subHeader}>
            Are you sure you don't want to work with a dietitian? Chera is
            intended to be used with a dietitian.
          </Typography>
          <Typography className={styles.subHeader}>
            We <strong> strongly recommend </strong> you work with a dietitian
            if you want to get the most out of Chera.
          </Typography>
        </Grid>
        <Grid container item className={styles.buttons}>
          <Grid
            item
            container
            lg={1.5}
            md={2}
            sm={3}
            xs={4}
            className={styles.container}
          >
            <Button
              id="find-dietitian"
              variant="contained"
              className={styles.button}
              onClick={handleNavigate}
            >
              Find a dietitian
            </Button>
          </Grid>
          <Grid
            item
            container
            lg={1.5}
            md={2}
            sm={3}
            xs={4}
            className={styles.container}
          >
            <Button
              id="no-dietitian"
              variant="contained"
              className={styles.button}
              onClick={handleNavigate}
            >
              Continue without a dietitian
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
