import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

const LogisticsStep = (props) => (
  <Grid container spacing={2} justifyContent={'center'}>
    {/* center the logo */}
    <Grid container item justifyContent={'center'}>
      <Icon
        sx={{
          fontSize: '4rem',
          color: `${props.customTheme.palette.olive.secondary}`,
        }}
      >
        {props.symbolName}
      </Icon>
    </Grid>
    <Grid item xs={12}>
      <Typography
        fontFamily={'Inter'}
        fontSize={props.customTheme.fontEqualizer(18)}
        fontWeight={800}
        color={props.customTheme.palette.darkGrey.main}
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
