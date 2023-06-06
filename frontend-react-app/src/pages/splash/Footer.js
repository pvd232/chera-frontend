import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styles from './scss/Footer.module.scss';

const Footer = () => (
  <Grid container item className={styles.footerContainer}>
    <Grid container item lg={10}>
      <Grid container item lg={3} xs={5} className={styles.footerSubContainer}>
        <Grid container item className={styles.questionsColumn}>
          <Grid item>
            <Typography id="footerTextLeft" className={styles.header}>
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
      <Grid container item lg={3} xs={5} className={styles.socialsColumn}>
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
