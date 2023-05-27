import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import HowItWorks from './how_it_works/HowItWorks';
import About from './About';
import WhyUs from './why_us/WhyUs';
import LandingPage from './landing_page/LandingPage.tsx';
import FNCEApproved from './FNCEApproved';
import Footer from './Footer';
const Splash = () => {
  const customTheme = useTheme();
  return (
    <Grid
      container
      item
      flexDirection={'column'}
      alignItems={'center'}
      sx={{
        backgroundColor: customTheme.palette.fucia2.light,
      }}
    >
      <LandingPage customTheme={customTheme} />
      <HowItWorks customTheme={customTheme} />
      <WhyUs customTheme={customTheme} />
      <FNCEApproved customTheme={customTheme} />
      <About customTheme={customTheme} />
      <Footer customTheme={customTheme} />
    </Grid>
  );
};

export default Splash;
