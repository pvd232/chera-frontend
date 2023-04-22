import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
const IntroTextBox = () => {
  const customTheme = useTheme();
  return (
    <Grid
      container
      item
      lg={8}
      justifyContent={'center'}
      sx={{ position: 'absolute', top: '25%', bottom: '25%' }}
    >
      <CardContent>
        <div
          style={{
            boxShadow: customTheme.border.boxShadow.medium,
            padding: '10vh 5vw',
            boxSizing: 'border-box',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.375)',
          }}
        >
          <Grid
            item
            container
            xs={12}
            justifyContent={'center'}
            alignItems={'center'}
            height={'100%'}
          >
            <Grid item>
              <Typography
                fontSize={'3rem'}
                textAlign={'center'}
                margin={'0 auto'}
                mb={10}
                fontWeight={'bold'}
              >
                Meal planning is hard. We make it easy.
              </Typography>
            </Grid>
            <Typography variant="h2" className="intro-text">
              <span className="intro-text__bold">Chera</span> is a community of
              dietitians, doctors, and engineers who are passionate about
              helping you overcome your eating disorder.
            </Typography>
          </Grid>
        </div>
      </CardContent>
    </Grid>
  );
};
export default IntroTextBox;
