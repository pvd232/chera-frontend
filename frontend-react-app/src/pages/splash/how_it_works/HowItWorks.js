import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LogisticsStep from './LogisticsStep';
import ratioAdjustment from './helpers/ratioAdjustment';
const HowItWorks = (props) => {
  return (
    <Grid item container justifyContent={'center'} rowSpacing={5}>
      <Grid item xs={10}>
        <Typography
          sx={{
            fontSize: props.customTheme.fontEqualizer(48),

            fontWeight: '500',
            textAlign: 'center',
          }}
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
        rowSpacing={
          props.customTheme.smallerScreen() || props.customTheme.tablet()
            ? '5vh'
            : '2vh'
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
            scale={ratioAdjustment(props.customTheme)}
          />
        </Grid>
        <Grid item lg={2.5} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'Client or Dietitian Picks Weekly Meals'}
            bodyText={
              'Client receives sign up email, creates account and chooses at least 6 weekly meals, then receives confirmation email with delivery details.'
            }
            symbolName={'bento'}
            scale={ratioAdjustment(props.customTheme)}
          />
        </Grid>
        <Grid item lg={2.5} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'We Cook and Ship Meals'}
            bodyText={
              "Meal serving sizes fined tuned according to client's chosen meal plan. Meals are shipped in discreetly labeled Chera Box delivered on Sundays."
            }
            symbolName={'delivery_dining_outlined'}
            scale={ratioAdjustment(props.customTheme)}
          />
        </Grid>
        <Grid item lg={2.5} md={5} xs={10}>
          <LogisticsStep
            customTheme={props.customTheme}
            headerText={'Heat Up, Sit Back and Enjoy'}
            bodyText={
              'Easy-to-follow instructions + microwave safe packaging = ready to go in minutes! Skip a week or cancel anytime.'
            }
            symbolName={'sentiment_very_satisfied_outlined'}
            scale={ratioAdjustment(props.customTheme)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default HowItWorks;
