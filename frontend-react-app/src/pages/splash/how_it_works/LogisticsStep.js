import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import './css/LogisticsStep.css';
import '../css/Splash.css';
const LogisticsStep = (props) => (
  <Grid container spacing={3} justifyContent={'center'}>
    {/* center the logo */}
    <Grid container item justifyContent={'center'}>
      <div className="logistics-step-icon-container splash-light-theme-filled">
        <Icon className="logistics-step-icon splash-theme-text">
          {props.symbolName}
        </Icon>
      </div>
    </Grid>
    <Grid item xs={12}>
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
