import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import splashImage2 from '../../../../static/images/splash_image_2_blue.png';
import styles from './scss/WhyUs.module.scss';

const RHS = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    window.scrollTo(0, 0);
    navigate('/faqs');
  };
  return (
    <Grid container item lg={6} className={styles.rhsContainer}>
      <Grid item xs={9}>
        <CardMedia
          src={splashImage2}
          component="img"
          alt="smiling lady"
          className={styles.img}
        ></CardMedia>
      </Grid>
      <Grid item>
        <Stack className={styles.stack}>
          <Typography className={styles.text}>Questions?</Typography>
          <Button onClick={handleNavigate} className={styles.button}>
            Contact us
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
export default RHS;
