import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import LogisticsStep from './LogisticsStep';
const HowItWorks = (props) => (
  <Grid
    container
    item
    lg={6}
    md={12}
    xs={12}
    justifyContent={
      props.customTheme.smallerScreen() || props.customTheme.mediumScreen()
        ? 'center'
        : 'flex-start'
    }
  >
    <Grid item xs={12} justifyContent={'flex-start'}>
      <Typography
        fontSize={'0.8rem'}
        textAlign={props.customTheme.smallerScreen() ? 'center' : 'start'}
        margin={'0 auto'}
        fontWeight={'bold'}
        color={props.customTheme.palette.olive.secondary}
      >
        HOW IT WORKS
      </Typography>
    </Grid>

    <Stack direction={'column'} rowGap={0}>
      <LogisticsStep
        customTheme={props.customTheme}
        headerText={'Get a Referral'}
        bodyText={
          'Your dietitian has already referred you and selected a meal program catered to your nutritional needs!'
        }
        symbolName={'menu_book_outlined'}
        primaryFontSize={6.5}
        secondaryFontSize={5.5}
      ></LogisticsStep>
      <LogisticsStep
        customTheme={props.customTheme}
        headerText={'Select Your Meals'}
        bodyText={
          "Choose meals from your program's menu, or have them pre-selected by your dietitian. All our meals come pre-cooked and ready to go."
        }
        symbolName={'dinner_dining_outlined'}
        primaryFontSize={6.5}
        secondaryFontSize={5.5}
      ></LogisticsStep>
      <LogisticsStep
        customTheme={props.customTheme}
        headerText={'We Cook and Ship Meals'}
        bodyText={'Meals are shipped directly to your doorstep on Sundays.'}
        symbolName={'delivery_dining_outlined'}
        primaryFontSize={6.5}
        secondaryFontSize={5.5}
      ></LogisticsStep>
      <LogisticsStep
        customTheme={props.customTheme}
        headerText={'Heat Up, Sit Back and Enjoy'}
        bodyText={
          'Easy-to-follow instructions + microwave safe packaging = ready to go in minutes! Skip a week or cancel anytime.'
        }
        symbolName={'sentiment_very_satisfied_outlined'}
        primaryFontSize={6.5}
        secondaryFontSize={5.5}
      ></LogisticsStep>
    </Stack>
  </Grid>
);
export default HowItWorks;
