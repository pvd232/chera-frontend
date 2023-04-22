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
                fontSize={
                  customTheme.largerScreen()
                    ? '3rem'
                    : customTheme.smallScreen()
                    ? '2rem'
                    : '1.6rem'
                }
                textAlign={'center'}
                margin={'0 auto'}
                mb={10}
                fontWeight={'bold'}
              >
                Meal planning is hard. We make it easy.
              </Typography>
            </Grid>
            <Typography
              fontSize={
                customTheme.largerScreen()
                  ? '1.4rem'
                  : customTheme.smallScreen()
                  ? '1.2rem'
                  : '1.1rem'
              }
            >
              Chera is a community of dietitians, doctors, and engineers
              dedicated to eating disorder recovery.
            </Typography>
          </Grid>
        </div>
      </CardContent>
    </Grid>
  );
};
export default IntroTextBox;
