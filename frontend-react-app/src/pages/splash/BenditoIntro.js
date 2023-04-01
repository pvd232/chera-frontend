import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import splashImage1 from '../../static/images/splash_image_1.png';
import BlackButton from '../../reusable_ui_components/BlackButton';
const BenditoIntro = (props) => (
  <Grid
    item
    container
    justifyContent={'space-around'}
    sx={{
      backgroundColor: props.customTheme.palette.olive.quaternary,
      paddingTop: '10vh',
    }}
  >
    {/* spacer */}
    {props.customTheme.largeScreen() || props.customTheme.extraLargeScreen() ? (
      <Grid item xs={1}></Grid>
    ) : (
      <></>
    )}
    <Grid item xl={4} lg={5} xs={10}>
      <Typography
        sx={{
          fontSize: props.customTheme.fontEqualizer(48),

          fontWeight: 'bold',
          textAlign: 'left',
          marginBottom: '5vh',
        }}
        color={props.customTheme.palette.black.main}
      >
        Get your clients the support they need.
      </Typography>
      <Typography
        sx={{
          fontSize: props.customTheme.fontEqualizer(20),

          textAlign: 'left',
          fontWeight: 500,
          marginBottom: '3vh',
        }}
        color={props.customTheme.palette.black.main}
      >
        Pick the right meal plan for your client and we ship delicious,
        ready-made meals to their door. Bendito is the easiest way to improve
        meal plan compliance for clients with eating disorders.
      </Typography>
      <BlackButton
        variant={'contained'}
        onClick={props.executeScroll}
        sx={{
          marginBottom: '5vh',
        }}
      >
        Get started
      </BlackButton>
    </Grid>
    <Grid container item xl={4.5} lg={5} sm={8} xs={10}>
      <img
        src={splashImage1}
        alt="smiling group"
        style={{
          maxWidth: '100%',
        }}
      ></img>
    </Grid>
  </Grid>
);
export default BenditoIntro;
