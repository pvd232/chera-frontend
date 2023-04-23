import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

const LogisticsStep = (props) => (
  <Grid container spacing={5} justifyContent={'center'}>
    {/* center the logo */}
    <Grid container item justifyContent={'center'}>
      <div
        style={{
          borderRadius: '50%',
          padding: '1.5rem',
          backgroundColor: `#ffd5da`,
        }}
      >
        <Icon
          sx={{
            fontSize: '4.5rem',
            color: `${props.customTheme.palette.olive.main}`,
          }}
        >
          {props.symbolName}
        </Icon>
      </div>
    </Grid>
    <Grid item xs={12}>
      <Typography
        fontSize={props.customTheme.pages.splash.fontSize.subHeader}
        fontWeight={'bold'}
        color={props.customTheme.palette.black.main}
        textAlign={'center'}
      >
        {props.headerText}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography
        fontFamily={'Inter'}
        fontSize={props.customTheme.fontEqualizer(16)}
        color={props.customTheme.palette.secondaryText.main}
      >
        {props.bodyText}
      </Typography>
    </Grid>
  </Grid>
);
export default LogisticsStep;
