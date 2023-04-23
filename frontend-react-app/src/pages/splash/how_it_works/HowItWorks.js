import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LogisticsStep from './LogisticsStep';
const HowItWorks = (props) => {
  return (
    <Grid
      container
      item
      justifyContent={'center'}
      rowSpacing={5}
      py={'30vh'}
      sx={{}}
    >
      <Grid item xs={10} sx={{ padding: '0 !important' }}>
        <Typography
          sx={{
            fontSize: props.customTheme.pages.splash.fontSize.header,
            fontWeight: '500',
            textAlign: 'center',
          }}
          mb={'10vh'}
        >
          How Chera Works
        </Typography>
      </Grid>
      <Grid
        item
        container
        justifyContent={
          props.customTheme.largerScreen() ? 'space-evenly' : 'center'
        }
      >
        <Grid item lg={2.5} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'Dietitian Refers Client'}
            bodyText={
              'After creating your account, add clients via your dashboard and select which of our ten different meal plans best fit their needs.'
            }
            symbolName={'format_list_numbered'}
          />
        </Grid>
        <Grid item lg={2.5} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'Client or Dietitian Picks Weekly Meals'}
            bodyText={
              'Client receives sign up email, creates account and chooses at least 6 weekly meals, then receives confirmation email with delivery details.'
            }
            symbolName={'dinner_dining'}
          />
        </Grid>
        <Grid item lg={2.5} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'We Cook and Ship Meals'}
            bodyText={
              'Meals are fined tuned according to personalized meal plans. Meals are shipped in discreetly labeled boxes and delivered on Saturday.'
            }
            symbolName={'delivery_dining_outlined'}
          />
        </Grid>
        <Grid item lg={2.5} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'Heat Up, Sit Back and Enjoy'}
            bodyText={
              'Simple instructions + microwave safe packaging = ready to go in minutes! Skip a week or cancel anytime.'
            }
            symbolName={'sentiment_very_satisfied_outlined'}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default HowItWorks;
