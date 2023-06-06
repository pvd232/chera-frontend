import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styles from './scss/IntroTextBox.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
const IntroTextBox = () => {
  const navigate = useNavigate();
  return (
    <Grid
      id="introTextBox"
      container
      item
      className={styles.introTextBoxContainer}
      xs={10}
    >
      <Grid item id="introTextBoxHeader">
        <Typography className={styles.header}>Simplifying</Typography>
        <Typography className={styles.header}>meal planning for</Typography>
        <Typography className={styles.header}>
          eating disorder recovery
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={styles.subheader}>
          Chera designed to enable faster recovery, sustained by regular eating
          habits.
        </Typography>
      </Grid>
      <Grid item container className={styles.signupButtonContainer}>
        <Button
          id="getStartedButton"
          variant={'contained'}
          onClick={() => navigate('/dietitian-sign-up')}
          className={styles.button}
        >
          Get started
        </Button>
      </Grid>
    </Grid>
  );
};
export default IntroTextBox;
