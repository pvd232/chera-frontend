import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import FNCElogo from '../../static/images/fnce_logo.png';
import cheraPlusFNCE from '../../static/images/chera_plus_fnce.png';
import logo from '../../static/images/chera_logo.png';
import academy2 from '../../static/images/eat_right_logo_5.png';
import './scss/Splash.scss';
import './scss/FNCEApproved.scss';

const FNCEApproved = () => {
  const customTheme = useTheme();
  return (
    <Grid
      container
      item
      className="splash-page-container"
      sx={{
        backgroundColor: 'white',
      }}
    >
      <Grid container item className="fnce-approved-page-container" xs={10}>
        <Grid item>
          <Typography
            className="splash-page-header"
            mb={{
              xs: '5vh',
              sm: '5vh',
              md: '10vh',
              lg: '10vh',
            }}
          >
            Dietitian vetted & approved
          </Typography>
        </Grid>
        {customTheme.largerScreen() ? (
          <Grid container item className="fnce-image-container-desktop">
            <Grid item>
              <img
                src={cheraPlusFNCE}
                height="55vh"
                alt="chera plus fnce"
              ></img>
            </Grid>
            <Grid item>
              <Typography fontSize={'3rem'}>=</Typography>
            </Grid>
            <Grid item>
              <img src={FNCElogo} height={'80vh'} alt="" />
            </Grid>
          </Grid>
        ) : (
          <Grid container item className="fnce-image-container-mobile">
            <Grid item lg={4} xs={10}>
              <img src={logo} alt="" height={'50vh'} />
            </Grid>
            <Grid item>
              <Icon fontSize={'large'}>add</Icon>
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
      </Grid>{' '}
    </Grid>
  );
};

export default FNCEApproved;
