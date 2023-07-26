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
        fontSize={'1.1rem'}
        textAlign={props.customTheme.smallerScreen() ? 'center' : 'start'}
        margin={'0 auto'}
        fontWeight={'bold'}
        color={props.customTheme.palette.olive.main}
      >
        How it works
      </Typography>
    </Grid>

    <Stack direction={'column'} rowGap={0}>
      <LogisticsStep
        customTheme={props.customTheme}
        headerText={'Get a referral'}
        bodyText={
          "Your dietitian has already referred you and selected a meal program that's right for you!"
        }
        symbolName={'menu_book_outlined'}
        primaryFontSize={6.5}
        secondaryFontSize={5.5}
      ></LogisticsStep>
      <LogisticsStep
        customTheme={props.customTheme}
        headerText={'Select your meals'}
        bodyText={
          'Choose meals from the menu, or have them pre-selected by your dietitian. All our meals come pre-cooked and ready to go.'
        }
        symbolName={'dinner_dining_outlined'}
        primaryFontSize={6.5}
        secondaryFontSize={5.5}
      ></LogisticsStep>
      <LogisticsStep
        customTheme={props.customTheme}
        headerText={'We cook and deliver meals'}
        bodyText={'Meals are shipped directly to your doorstep on Mondays.'}
        symbolName={'delivery_dining_outlined'}
        primaryFontSize={6.5}
        secondaryFontSize={5.5}
      ></LogisticsStep>
      <LogisticsStep
        customTheme={props.customTheme}
        headerText={'Heat up, sit back and enjoy'}
        bodyText={
          'Easy instructions + microwave safe packaging = ready to go in minutes! Skip a week or cancel anytime.'
        }
        symbolName={'sentiment_very_satisfied_outlined'}
        primaryFontSize={6.5}
        secondaryFontSize={5.5}
      ></LogisticsStep>
    </Stack>
  </Grid>
);
export default HowItWorks;
