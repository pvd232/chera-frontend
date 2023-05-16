import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import { Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './css/ReasonBullet.css';
import '../css/Splash.css';
const ReasonBullet = (props) => (
  <Grid
    item
    container
    className="reason-bullet-container"
    onClick={props.setReasonOpen}
    sx={{
      backgroundColor: props.reasonOpen
        ? `${props.customTheme.palette.fucia2.solid} !important`
        : '',
      borderTopLeftRadius: props.edgeBullet ? '15px' : '',
      borderTopRightRadius: props.edgeBullet ? '15px' : '',
    }}
  >
    <Grid item className="reason-bullet-icon-container">
      <Icon
        fontSize="large"
        sx={{
          color: props.reasonOpen
            ? `${props.customTheme.palette.white1.main} !important`
            : '',
        }}
      >
        {props.icon}
      </Icon>
    </Grid>
    <Grid item>
      <CardContent>
        <Typography
          className={
            props.reasonOpen
              ? 'reason-bullet-header-open'
              : 'reason-bullet-header-closed'
          }
          fontSize={props.customTheme.fontEqualizer(18)}
        >
          {props.bulletPrimaryText}
        </Typography>
      </CardContent>
    </Grid>
    <Grid item container lg={1} xs={1} sx={{ marginLeft: 'auto' }}>
      <Stack>
        <div
          className="arrow-container"
          style={{
            backgroundColor: `${props.customTheme.palette.lightGrey.secondary}`,
          }}
        >
          {props.reasonOpen ? (
            <ArrowDropUpIcon fontSize="large" />
          ) : (
            <ArrowDropDownIcon fontSize="large" />
          )}
        </div>
      </Stack>
    </Grid>
    <Grid container item>
      <CardContent
        sx={{
          paddingTop: '0px !important',
          paddingBottom: '16px !important',
          paddingLeft: '0px !important',
          display: props.reasonOpen ? 'block' : 'none',
        }}
      >
        <Typography
          className={
            props.reasonOpen
              ? 'reason-bullet-body-open'
              : 'reason-bullet-body-closed'
          }
        >
          {props.bulletSecondaryText}
        </Typography>
      </CardContent>
    </Grid>
  </Grid>
);
export default ReasonBullet;
