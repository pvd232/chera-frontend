import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import Stack from '@mui/material/Stack';
import { useState, useReducer } from 'react';
import { PopupModal } from 'react-calendly';
import { useTheme } from '@mui/material/styles';
import BlackButton from '../../reusable_ui_components/BlackButton';
import splashImage2 from '../../static/images/splash_image_2.png';

const WhyBendito = () => {
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
  const CalendlyButton = () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <BlackButton
          variant="contained"
          sx={{
            paddingLeft: '2vw',
            paddingRight: '2vw',
            width: 'fit-content',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '0vh',
            fontSize: customTheme.fontEqualizer(16),
          }}
          onClick={() => setOpen(true)}
        >
          Meet with us
        </BlackButton>

        <PopupModal
          url="https://calendly.com/peterdriscoll27/discovery-call"
          onModalClose={() => setOpen(false)}
          open={open}
          rootElement={document.getElementById('root')}
        />
      </div>
    );
  };
  const ReasonBullet = (props) => (
    <Grid
      item
      container
      justifyContent={'flex-start'}
      alignItems={'center'}
      sx={{
        marginTop: '1vh',
      }}
      onClick={props.setReasonOpen}
    >
      <Grid item justifyContent={'center'} alignContent={'center'}>
        <Icon
          sx={{
            transform: `scale(1.3)`,
            paddingTop: '2px',
          }}
        >
          {props.icon ?? 'ac_unit'}
        </Icon>
      </Grid>
      <Grid item>
        <CardContent
          sx={{
            paddingBottom: '16px !important',
          }}
        >
          <Typography fontWeight={500} fontSize={customTheme.fontEqualizer(18)}>
            {props.bulletPrimaryText}
          </Typography>
        </CardContent>
      </Grid>
      <Grid item sx={{ marginLeft: 'auto' }}>
        <Icon
          sx={{
            transform: `scale(1.3)`,
          }}
        >
          arrow_drop_down
        </Icon>
      </Grid>
      <Grid container item>
        <CardContent
          sx={{
            paddingBottom: '16px !important',
            paddingLeft: '0px !important',
            display: props.reasonOpen ? 'block' : 'none',
          }}
        >
          <Typography>{props.bulletSecondaryText}</Typography>
        </CardContent>
      </Grid>
    </Grid>
  );
  const ListOfReasons = (props) => {
    return (
      <Grid item container>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: customTheme.palette.white1.main,
            borderRadius: '10px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {/* first reason bullet */}
          <ReasonBullet
            reasonOpen={props.reasonOpen.first}
            setReasonOpen={() => props.setReasonOpen('first')}
            bulletPrimaryText={'Personalized Meals'}
            bulletSecondaryText={
              'Unlike other "one size fits all" meal delivery services, we fine tune our meal serving sizes according to the precise nutritional needs of your clients.'
            }
            icon={'tune'}
          ></ReasonBullet>
          <ReasonBullet
            reasonOpen={props.reasonOpen.second}
            setReasonOpen={() => props.setReasonOpen('second')}
            bulletPrimaryText={'Thoughtful Labeling & Packaging '}
            bulletSecondaryText={
              "We don't place nutrition labels on our meals, easing meal time stress, and use discreet packaging when shipping your clients their weekly Bendito Box."
            }
            icon={'redeem'}
          ></ReasonBullet>
          <ReasonBullet
            reasonOpen={props.reasonOpen.third}
            setReasonOpen={() => props.setReasonOpen('third')}
            bulletPrimaryText={'Client Nutritional Insights'}
            bulletSecondaryText={
              "Our platform provides an easy-to-use dashboard to manage your client's meal plan, view your client's meals, and comprehensively monitor their nutritional intake using the 25+ nutrient daily values we track."
            }
            icon={'monitor_heart'}
          ></ReasonBullet>
          <ReasonBullet
            reasonOpen={props.reasonOpen.fourth}
            setReasonOpen={() => props.setReasonOpen('fourth')}
            bulletPrimaryText={'Trusted Food Science Credentials'}
            bulletSecondaryText={
              'All our meals are all dietitian approved, and were served to hundreds of nutritional experts at FNCE 2022.'
            }
            icon={'verified'}
          ></ReasonBullet>
          <ReasonBullet
            reasonOpen={props.reasonOpen.fifth}
            setReasonOpen={() => props.setReasonOpen('fifth')}
            bulletPrimaryText={'Fully Prepared Meals'}
            bulletSecondaryText={
              'Our meals come fully prepared and are freezer friendly – maximizing convenience and removing barriers to meal compliance!'
            }
            icon={'dinner_dining'}
          ></ReasonBullet>
        </Grid>
      </Grid>
    );
  };
  const LHS = () => (
    <>
      <Grid item xs={11}>
        <Typography
          sx={{
            fontSize: customTheme.fontEqualizer(48),

            fontWeight: '500',
            textAlign: 'left',
          }}
          color={customTheme.palette.black.main}
        >
          Why Bendito?
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
        backgroundColor: customTheme.palette.olive.quaternary,
        paddingTop: '10vh',
        paddingBottom: '10vh',
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
export default WhyBendito;
