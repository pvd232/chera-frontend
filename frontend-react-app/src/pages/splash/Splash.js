import Grid from '@mui/material/Grid';

import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import HowItWorks from './how_it_works/HowItWorks';
import About from './About';
import CommitmentToInclusivity from './CommitmentToInclusivity';
import FAQs from './faqs/FAQs';
import WhyBendito from './WhyBendito';
import BenditoIntro from './BenditoIntro';
import FNCEApproved from './FNCEApproved';
import DietitianSignUp from './dietitian_sign_up/DietitianSignUp';
const Splash = () => {
  const customTheme = useTheme();
  const myRef = useRef();
  const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <Grid
      container
      justifyContent={'center'}
      rowSpacing={20}
      marginBottom={'20vh'}
    >
      <Grid item xs={12}>
        {
          <BenditoIntro
            executeScroll={executeScroll}
            customTheme={customTheme}
          />
        }
      </Grid>
      <Grid item xs={12}>
        <HowItWorks customTheme={customTheme} />
      </Grid>
      <Grid item xs={12}>
        <WhyBendito customTheme={customTheme} />
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
