import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import BlackButton from '../../../reusable_ui_components/BlackButton';

const IntroTextBox = (props) => {
  const customTheme = useTheme();
  return (
    <Grid
      container
      item
      lg={10}
      justifyContent={'center'}
      sx={{ position: 'absolute', top: '22%', bottom: '25%' }}
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
            <Grid item mb={5}>
              <Typography
                fontSize={customTheme.pages.splash.fontSize.header}
                textAlign={'center'}
                fontWeight={'bold'}
              >
                Simplifying daily regular eating and meal planning for eating
                disorder recovery.
              </Typography>
            </Grid>
            <Grid item lg={12}>
              <Typography
                textAlign={'center'}
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                Chera is a team of dietitians, doctors, and engineers dedicated
                to eating disorder recovery.
              </Typography>
            </Grid>
            <BlackButton
              variant={'contained'}
              onClick={props.executeScroll}
              id="getStartedButton"
              sx={{
                fontSize: customTheme.pages.splash.fontSize.button,
                marginTop: '5vh',
                padding: '1.5vh 1.5vh',
                borderRadius: '30px',
              }}
            >
              Get started
            </BlackButton>
          </Grid>
        </div>
      </CardContent>
    </Grid>
  );
};
export default IntroTextBox;
