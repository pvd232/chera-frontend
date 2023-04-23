import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import logo from '../../static/images/bendito-small.png';
import academy from '../../static/images/eat_right_4.png';
import academy2 from '../../static/images/eat_right_logo_5.png';
import FNCElogo from '../../static/images/fnce_logo.png';
import { useTheme } from '@mui/material/styles';

const FNCEApproved = () => {
  const customTheme = useTheme();
  return (
    <Grid
      item
      container
      justifyContent={'center'}
      rowSpacing={customTheme.largerScreen() ? '15vh' : '5vh'}
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
      <Grid
        item
        container
        md={12}
        xs={10}
        justifyContent={'center'}
        alignItems={'flex-end'}
      >
        {customTheme.largerScreen() ? (
          <Grid
            container
            item
            justifyContent={'space-evenly'}
            alignItems={'flex-end'}
            padding={'0 !important'}
            lg={6}
            md={10}
            sx={{ marginRight: '15vw' }}
          >
            <Grid item lg={3} md={2.5} xs={10}>
              <Typography
                sx={{
                  fontSize: '5rem',
                  color: `${customTheme.palette.olive.main}`,
                  fontWeight: 'bold',
                  fontFamily: 'Lilita One',
                }}
              >
                Chera
              </Typography>
            </Grid>
            <Grid item marginBottom={'2vh'} lg={1} md={0.5} xs={4}>
              <Icon
                style={{
                  fontSize: '3rem',
                }}
              >
                add
              </Icon>
            </Grid>
            <Grid item paddingBottom={'0vh'} lg={4} md={5} xs={10}>
              <img
                src={academy}
                height={!customTheme.mediumScreen() ? '110vh' : '90vh'}
                alt=""
              />
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            item
            justifyContent={'center'}
            alignItems={'flex-end'}
            padding={'0 !important'}
            spacing={2}
          >
            <Grid item container justifyContent={'center'} lg={4} xs={10}>
              <img src={logo} alt="" height={'70vh'} />
            </Grid>
            <Grid container item marginTop={'4vh'} justifyContent={'center'}>
              <Icon
                style={{
                  fontSize: '4rem',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                }}
              >
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
      <Grid
        item
        container
        lg={6}
        md={7}
        justifyContent={'space-evenly'}
        alignItems={'flex-end'}
        rowSpacing={customTheme.smallerScreen() ? 2 : 0}
      >
        <Typography
          sx={{
            fontSize: customTheme.fontEqualizer(20),

            fontWeight: '500',
            textAlign: 'center',
          }}
        >
          Proud to have presented as an Exhibitor at
        </Typography>
        <Grid item>
          <Grid item>
            <img src={FNCElogo} height={'75'} alt="" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default FNCEApproved;
