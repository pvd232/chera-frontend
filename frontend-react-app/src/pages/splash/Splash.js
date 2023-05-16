import Grid from '@mui/material/Grid';

import { useTheme } from '@mui/material/styles';
import HowItWorks from './how_it_works/HowItWorks';
import About from './About';
import CommitmentToInclusivity from './CommitmentToInclusivity';
import FAQs from './faqs/FAQs';
import WhyUs from './why_us/WhyUs';
import LandingPage from './landing_page/LandingPage';
import FNCEApproved from './FNCEApproved';
import DietitianSignUp from './dietitian_sign_up/DietitianSignUp';
const Splash = () => {
  const customTheme = useTheme();
  return (
    <Grid
      container
      justifyContent={'center'}
      marginBottom={'20vh'}
      sx={{
        backgroundColor: customTheme.palette.fucia2.light,
      }}
    >
      <Grid item>
        <LandingPage customTheme={customTheme} />
      </Grid>
      <Grid container item>
        <HowItWorks customTheme={customTheme} />
      </Grid>
      <Grid container item>
        <WhyUs customTheme={customTheme} />
      </Grid>
      <Grid container item>
        <FNCEApproved customTheme={customTheme} />
      </Grid>

      {/* <Grid container item>
        <DietitianSignUp customTheme={customTheme} ref={myRef} />
      </Grid> */}
      {/* <Grid container item>
        <FAQs customTheme={customTheme} />
      </Grid> */}
      <Grid container item>
        <About customTheme={customTheme} />
      </Grid>
      <Grid container item>
        <CommitmentToInclusivity customTheme={customTheme} />
      </Grid>
    </Grid>
  );
};

export default Splash;
