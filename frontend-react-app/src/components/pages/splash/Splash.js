import Grid from '@mui/material/Grid';
import HowItWorks from './how_it_works/HowItWorks';
import About from './About';
import WhyUs from './why_us/WhyUs';
import LandingPage from './landing_page/LandingPage.tsx';
import FNCEApproved from './FNCEApproved';
import Footer from './Footer';
import styles from './scss/Splash.module.scss';
import { useRef } from 'react';
import { useScrollToFNCEApprovedRef } from './hooks/useScrollToFNCEApprovedRef';
const Splash = () => {
  const fnceApprovedRef = useRef(null);
  useScrollToFNCEApprovedRef(fnceApprovedRef, '#fnce-approved');
  return (
    <Grid container item className={styles.pageContainer}>
      <LandingPage />
      <HowItWorks />
      <WhyUs />
      <FNCEApproved ref={fnceApprovedRef} />
      <About />
      <Footer />
    </Grid>
  );
};

export default Splash;
