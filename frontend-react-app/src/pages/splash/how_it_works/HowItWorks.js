import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LogisticsStep from './LogisticsStep';
const HowItWorks = (props) => {
  return (
    <Grid
      container
      item
      justifyContent={'center'}
      py={props.customTheme.pages.splash.spacing.pages}
      px={0}
      my={props.customTheme.largerScreen() ? '10vh' : '10vh'}
    >
      <Grid item xs={12} lg={10} sx={{ padding: '0 !important' }}>
        <Typography
          sx={{
            fontSize: props.customTheme.pages.splash.fontSize.header,
            fontWeight: '500',
            textAlign: 'center',
          }}
          mb={props.customTheme.largerScreen() ? 10 : 5}
        >
          How it works
        </Typography>
      </Grid>
      <Grid
        item
        container
        justifyContent={
          props.customTheme.largerScreen() ? 'space-evenly' : 'center'
        }
        rowSpacing={5}
      >
        <Grid item lg={2.5} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'Dietitian Refers Client'}
            bodyText={
              'Add clients via our dashboard and select which of our ten different meal plans best fit their needs.'
            }
            symbolName={'format_list_numbered'}
          />
        </Grid>
        <Grid item lg={2.5} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'Pick Weekly Meals'}
            bodyText={
              'Client creates account and chooses their weekly meals. (Dietitian may also preselect meals)'
            }
            symbolName={'dinner_dining'}
          />
        </Grid>
        <Grid item lg={2.5} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'We Cook and Ship Meals'}
            bodyText={
              'Personalized, dietitian approved meals are shipped with discreet packaging and delivered on Monday.'
            }
            symbolName={'delivery_dining_outlined'}
          />
        </Grid>
        <Grid item lg={2.5} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'Heat, Sit Back and Enjoy'}
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
