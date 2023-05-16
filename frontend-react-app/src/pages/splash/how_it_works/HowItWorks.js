import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LogisticsStep from './LogisticsStep';
import '../css/Splash.css';
import './css/HowItWorks.css';
const HowItWorks = (props) => {
  return (
    <Grid
      className="how-it-works-container splash-page-container"
      container
      item
    >
      <Grid item xs={12} lg={10}>
        <Typography
          fontSize={props.customTheme.pages.splash.fontSize.header}
          className="splash-page-title"
          mb={props.customTheme.largerScreen() ? '10vh' : '5vh'}
        >
          How Chera works
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={10.5}
        justifyContent={
          props.customTheme.largerScreen() ? 'space-evenly' : 'center'
        }
      >
        <Grid item lg={2.8} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'Dietitian refers client'}
            bodyText={
              'Simple interface for adding clients and selecting a meal plan that best fits their needs.'
            }
            symbolName={'format_list_numbered'}
          />
        </Grid>
        <Grid item lg={2.8} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'Pick weekly meals'}
            bodyText={
              'Client creates account and chooses weekly meals and snacks. (Dietitian may also preselect meals)'
            }
            symbolName={'dinner_dining'}
          />
        </Grid>
        <Grid item lg={2.8} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'We cook and ship meals'}
            bodyText={
              'Personalized, dietitian approved meals thoughtfully labeled and home delivered.'
            }
            symbolName={'delivery_dining_outlined'}
          />
        </Grid>
        <Grid item lg={2.8} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'Heat, sit back and enjoy'}
            bodyText={
              'Simple instructions + microwave safe = ready in minutes! Skip a week or pause deliveries anytime.'
            }
            symbolName={'sentiment_very_satisfied_outlined'}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default HowItWorks;
