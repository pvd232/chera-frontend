import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import FNCElogo from '../../static/images/fnce_logo.png';
import cheraPlusFNCE from '../../static/images/chera_plus_fnce.png';
import logo from '../../static/images/chera_logo.png';
import academy2 from '../../static/images/eat_right_logo_5.png';
import { useTheme } from '@mui/material/styles';

const FNCEApproved = () => {
  const customTheme = useTheme();
  return (
    <Grid
      item
      container
      justifyContent={'center'}
      rowSpacing={customTheme.largerScreen() ? '10vh' : '5vh'}
      columnSpacing={5}
      py={customTheme.pages.splash.spacing.pages}
      px={0}
    >
      <Grid item xs={10}>
        <Typography
          sx={{
            fontSize: customTheme.pages.splash.fontSize.header,
            fontWeight: '500',
            textAlign: 'center',
            marginBottom: customTheme.smallerScreen() ? '5vh' : '',
          }}
        >
          Dietitian vetted & approved
        </Typography>
      </Grid>
      {customTheme.largerScreen() ? (
        <>
          <Grid item container justifyContent={'center'}>
            <img src={cheraPlusFNCE} height="50vh" alt="chera plus fnce"></img>
          </Grid>
          <Grid
            item
            container
            lg={6}
            md={9}
            justifyContent={'space-evenly'}
            alignItems={'center'}
            rowSpacing={2}
          >
            <Grid item>
              <Typography
                sx={{
                  fontSize: customTheme.fontEqualizer(22),

                  fontWeight: '500',
                  textAlign: 'center',
                }}
              >
                Proud to have been chosen as an exhibitor at
              </Typography>
            </Grid>
            <Grid item>
              <img src={FNCElogo} height={'75vh'} alt="" />
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid
          container
          item
          justifyContent={'center'}
          spacing={2}
          alignItems={'center'}
        >
          <Grid item container justifyContent={'center'} lg={4} xs={10}>
            <img src={logo} alt="" height={'50vh'} />
          </Grid>
          <Grid container item justifyContent={'center'}>
            <Icon mx={'auto'} fontSize={'large'}>
              add
            </Icon>
          </Grid>
          <Grid
            container
            item
            justifyContent={'center'}
            paddingBottom={'0vh'}
            lg={4}
            xs={8}
          >
            <img src={academy2} height={'130vh'} alt="" />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default FNCEApproved;
