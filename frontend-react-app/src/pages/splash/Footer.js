import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styles from './scss/Footer.module.scss';

const Footer = () => (
  <Grid container item className={styles.footerContainer}>
    <Grid container item lg={10}>
      <Grid container item lg={3} justifyContent={'center'}>
        <Grid item></Grid>
        <Grid
          container
          item
          flexDirection={'column'}
          alignItems={'left'}
          justifyContent={'space-around'}
          rowSpacing={'1vh'}
          color={'white'}
        >
          <Grid item>
            <Typography id="footerTextLeft" fontWeight="bold">
              Questions?
            </Typography>
          </Grid>
          <Grid item>
            <Link to="/FAQs">
              <Typography>FAQs</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Typography>contact@cherahealth.com</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item lg={3} className={styles.footerColumn}>
        <Grid item>
          <Typography className={styles.header}>
            Catch us on Social Media
          </Typography>
        </Grid>
        <Grid container item className={styles.socialMediaIcons}>
          {/* <Grid item>
            <a href="https://www.facebook.com">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </Grid> */}
          <Grid item>
            <a href="https://www.linkedin.com/company/91413752">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </Grid>
          <Grid item>
            <a href="https://www.instagram.com/chera_health/">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default Footer;
