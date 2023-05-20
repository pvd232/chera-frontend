import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useReducer } from 'react';
import { useTheme } from '@mui/material/styles';
import splashImage2 from '../../../static/images/splash_image_2_blue.png';
import ListOfReasons from './ListOfReasons';
import CalendlyButton from './CalendlyButton';
import '../scss/Splash.scss';

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
          className="splash-page-header"
          textAlign={{
            xs: 'center !important',
            sm: 'center !important',
            md: 'left !important',
            lg: 'left !important',
          }}
        >
          Why Chera?
        </Typography>
      </Grid>
      <Grid item lg={6}>
        {ListOfReasons({
          reasonOpen: reasonOpen,
          setReasonOpen: (reason) => handleSetReasonOpen(reason),
        })}
      </Grid>
    </>
  );
  const RHS = () => (
    <Grid item lg={4}>
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
    <Grid container item className="splash-page-container">
      <Grid
        container
        item
        justifyContent={'space-around'}
        rowGap={'5vh'}
        xs={10}
      >
        {/* spacer */}

        {LHS()}

        {RHS()}

        {/* RHS: image of woman with tattoo on left */}
      </Grid>
    </Grid>
  );
};
export default WhyUs;
