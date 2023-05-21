import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import splashImage2 from '../../../static/images/splash_image_2_blue.png';
import CalendlyButton from './CalendlyButton.js';
import styles from './scss/WhyUs.module.scss';

const RHS = () => (
  <Grid container item lg={4} className={styles.rhsContainer}>
    <CardMedia
      src={splashImage2}
      component="img"
      alt="smiling lady"
    ></CardMedia>
    <Grid item>
      <Stack className={styles.stack}>
        <Typography>Questions?</Typography>
        <CalendlyButton></CalendlyButton>
      </Stack>
    </Grid>
  </Grid>
);
export default RHS;
