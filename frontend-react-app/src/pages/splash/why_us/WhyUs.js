import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useReducer } from 'react';
import { useTheme } from '@mui/material/styles';
import splashImage2 from '../../../static/images/splash_image_2_blue.png';
import ListOfReasons from './ListOfReasons';
import CalendlyButton from './CalendlyButton';
const WhyUs = () => {
  const customTheme = useTheme();
  const [reasonOpen, setReasonOpen] = useReducer(
    (state, name) => {
      const newState = { ...state };
      const newStateValue = !state[name];
      newState[name] = newStateValue;
      return { ...state, ...newState };
    },
    {
      first: false,
      second: false,
      third: false,
      fourth: false,
      fifth: false,
    }
  );
  const handleSetReasonOpen = (reasonNumber) => {
    setReasonOpen(reasonNumber);
  };

  const LHS = () => (
    <>
      <Grid item xs={11}>
        <Typography
          sx={{
            fontSize: customTheme.pages.splash.fontSize.header,

            fontWeight: '500',
            textAlign: 'left',
          }}
          color={customTheme.palette.black.main}
        >
          Why Chera?
        </Typography>
      </Grid>
      <Grid item xs={11} sm={10} lg={6}>
        {ListOfReasons({
          reasonOpen: reasonOpen,
          setReasonOpen: (reason) => handleSetReasonOpen(reason),
        })}
      </Grid>
    </>
  );
  const RHS = () => (
    <Grid item lg={4} sm={6} xs={8}>
      <CardMedia
        src={splashImage2}
        component="img"
        alt="smiling lady"
      ></CardMedia>
      <Stack
        marginTop={customTheme.smallerScreen() ? '3vh' : '5vh'}
        direction="row"
        alignItems="center"
        justifyContent={'center'}
        columnGap={3}
        sx={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Typography fontSize={customTheme.fontEqualizer(18)}>
          Questions?
        </Typography>
        <CalendlyButton></CalendlyButton>
      </Stack>
    </Grid>
  );
  return (
    <Grid
      container
      item
      justifyContent={'space-around'}
      rowGap={5}
      sx={{
        backgroundColor: customTheme.pages.splash.color.lightBlue,
        py: '20vh',
        paddingLeft: customTheme.smallerScreen()
          ? '0vw'
          : customTheme.extraLargeScreen()
          ? '10vw'
          : '5vw',
        paddingRight: customTheme.smallerScreen()
          ? '0vw'
          : customTheme.extraLargeScreen()
          ? '10vw'
          : '5vw',
      }}
    >
      {/* spacer */}

      {LHS()}

      {RHS()}

      {/* RHS: image of woman with tattoo on left */}
    </Grid>
  );
};
export default WhyUs;
