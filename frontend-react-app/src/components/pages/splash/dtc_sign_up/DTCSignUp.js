import { Button, Grid, Typography } from '@mui/material';
import styles from './scss/DTCSignUp.module.scss';
import { useNavigate } from 'react-router-dom';

export const DTCSignUp = () => {
  const navigate = useNavigate();

  const handleNavigate = (event) => {
    const id = event.currentTarget.id;
    switch (id) {
      case 'refer-dietitian':
        navigate('/refer-dietitian');
        break;
      case 'find-dietitian':
        navigate('/find-dietitian');
        break;
      case 'no-dietitian':
        navigate('/no-dietitian');
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
            Tell us about yourself
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={styles.subHeader}>
            Which best describes you?
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
              id="refer-dietitian"
              variant="contained"
              className={styles.button}
              onClick={handleNavigate}
            >
              I have a dietitian already
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
              id="find-dietitian"
              variant="contained"
              className={styles.button}
              onClick={handleNavigate}
            >
              I would like to find a dietitian
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
              I'm using Chera without a dietitian
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
