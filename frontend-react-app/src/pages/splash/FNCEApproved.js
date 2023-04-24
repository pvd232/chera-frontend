import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FNCElogo from '../../static/images/fnce_logo.png';
import cheraPlusFNCE from '../../static/images/chera_plus_fnce.png';
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
    >
      <Grid item xs={10}>
        <Typography
          sx={{
            fontSize: customTheme.pages.splash.fontSize.header,
            fontWeight: '500',
            textAlign: 'center',
          }}
        >
          Dietitian Vetted & Approved
        </Typography>
      </Grid>
      <Grid item container justifyContent={'center'}>
        <img src={cheraPlusFNCE} height="60vh" alt="chera plus fnce"></img>
      </Grid>
      <Grid
        item
        container
        lg={8}
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
          <Grid item>
            <img src={FNCElogo} height={'80vh'} alt="" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default FNCEApproved;
