import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import splashImage2 from '../../../static/images/splash_image_2_blue.png';
import CalendlyButton from './CalendlyButton.js';
import styles from './scss/WhyUs.module.scss';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RHS = () => {
  const navigate = useNavigate();
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
          <Typography>Questions?</Typography>
          {/* <CalendlyButton></CalendlyButton> */}
          <Button onClick={() => navigate('/faqs')} className={styles.button}>
            Contact us
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
export default RHS;
