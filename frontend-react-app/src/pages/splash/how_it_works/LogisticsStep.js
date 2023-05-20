import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import './scss/LogisticsStep.scss';
import '../scss/Splash.scss';
const LogisticsStep = (props) => (
  <Grid
    container
    item
    flexDirection={'column'}
    rowSpacing={'3vh'}
    alignItems={'center'}
  >
    {/* center the logo */}
    <Grid item justifyContent={'center'}>
      <div className="logistics-step-icon-container splash-light-theme-filled">
        <Icon className="logistics-step-icon splash-theme-text">
          {props.symbolName}
        </Icon>
      </div>
    </Grid>
    <Grid item>
      <Typography
        fontSize={props.customTheme.pages.splash.fontSize.subHeader}
        className="logistics-step-header splash-theme-text"
      >
        {props.headerText}
      </Typography>
    </Grid>
    <Grid item xs={11.5}>
      <Typography className="logistics-step-body-text splash-theme-text">
        {props.bodyText}
      </Typography>
    </Grid>
  </Grid>
);
export default LogisticsStep;
