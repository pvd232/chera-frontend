import Grid from '@mui/material/Grid';

import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import HowItWorks from './how_it_works/HowItWorks';
import About from './About';
import CommitmentToInclusivity from './CommitmentToInclusivity';
import FAQs from './faqs/FAQs';
import WhyUs from './why_us/WhyUs';
import Intro from './Intro';
import LandingPage from './landing_page/LandingPage';
import FNCEApproved from './FNCEApproved';
import DietitianSignUp from './dietitian_sign_up/DietitianSignUp';
const Splash = () => {
  const customTheme = useTheme();
  const myRef = useRef();
  const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <Grid container justifyContent={'center'} marginBottom={'20vh'}>
      <Grid item xs={12}>
        {
          // <CheraIntro
          //   executeScroll={executeScroll}
          //   customTheme={customTheme}
          // />
          <LandingPage customTheme={customTheme} />
        }
      </Grid>
      <Grid item xs={12}>
        <HowItWorks customTheme={customTheme} />
      </Grid>
      <Grid item xs={12}>
        <WhyUs customTheme={customTheme} />
      </Grid>
      <Grid item xs={12}>
        <FNCEApproved customTheme={customTheme} />
      </Grid>

      <Grid item xs={12}>
        <DietitianSignUp customTheme={customTheme} ref={myRef} />
      </Grid>
      <Grid item xs={12}>
        <FAQs customTheme={customTheme} />
      </Grid>
      <Grid item xs={12}>
        <About customTheme={customTheme} />
      </Grid>
      <Grid item xs={12}>
        <CommitmentToInclusivity customTheme={customTheme} />
      </Grid>
    </Grid>
  );
};

export default Splash;
