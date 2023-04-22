import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import '../../../static/css/Resources.css';

const AppToDownload = (props) => (
  <Grid
    container
    lg={3.7}
    md={3.7}
    xs={10}
    justifyContent="center"
    paddingTop={0}
    alignItems="flex-start"
    height={
      props.customTheme.extraLargeScreen()
        ? '35vh'
        : props.customTheme.largeScreen()
        ? '30vh'
        : '30vh'
    }
  >
    <Grid
      container
      lg={12}
      xs={12}
      justifyContent="center"
      alignItems="center"
      height={
        props.customTheme.extraLargeScreen()
          ? '35vh'
          : props.customTheme.largeScreen()
          ? '30vh'
          : '30vh'
      }
      padding={5}
      sx={{
        backgroundColor: props.customTheme.palette.white1.main,
      }}
    >
      <img
        className="hoverLink"
        src={props.imgSrc}
        alt=""
        style={{
          height: props.customTheme.extraExtraSmallScreen()
            ? '17vh'
            : props.customTheme.smallerScreen()
            ? '17vh'
            : '20vh',
          margin: '5% 5% 5% 5%',
          marginRight: 'auto',
          marginLeft: 'auto',
          objectFit: 'cover',
        }}
        onClick={() => window.location.assign(props.imgHref)}
      ></img>

      <Grid
        container
        position={'relative'}
        xl={12}
        lg={12}
        md={12}
        xs={12}
        padding={3}
        justifyContent={'center'}
        alignItems="flex-start"
        left={'50%'}
        top={'5%'}
        sx={{
          backgroundColor: props.customTheme.palette.olive.main,
          transform: 'translate(-50%,0%)',
        }}
        rowGap={2}
      >
        <Typography
          fontSize={props.customTheme.fontEqualizer(16)}
          fontWeight={'bold'}
          sx={{
            letterSpacing: '1.5px',
            textDecoration: 'none',
          }}
          textAlign={props.customTheme.smallerScreen() ? 'center' : ''}
        >
          {props.resourceTitle}
        </Typography>
        <Typography fontSize={props.customTheme.fontEqualizer(12)}>
          {props.resourceDescription}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);
export default AppToDownload;
