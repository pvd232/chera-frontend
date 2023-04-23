import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';

const ReasonBullet = (props) => (
  <Grid
    item
    container
    justifyContent={'flex-start'}
    alignItems={'center'}
    sx={{
      marginTop: '1vh',
    }}
    onClick={props.setReasonOpen}
  >
    <Grid item justifyContent={'center'} alignContent={'center'}>
      <Icon
        sx={{
          transform: `scale(1.3)`,
          paddingTop: '2px',
        }}
      >
        {props.icon ?? 'ac_unit'}
      </Icon>
    </Grid>
    <Grid item>
      <CardContent
        sx={{
          paddingBottom: '16px !important',
        }}
      >
        <Typography
          fontWeight={500}
          fontSize={props.customTheme.fontEqualizer(18)}
        >
          {props.bulletPrimaryText}
        </Typography>
      </CardContent>
    </Grid>
    <Grid item sx={{ marginLeft: 'auto' }}>
      <Icon
        sx={{
          transform: `scale(1.3)`,
        }}
      >
        arrow_drop_down
      </Icon>
    </Grid>
    <Grid container item>
      <CardContent
        sx={{
          paddingBottom: '16px !important',
          paddingLeft: '0px !important',
          display: props.reasonOpen ? 'block' : 'none',
        }}
      >
        <Typography>{props.bulletSecondaryText}</Typography>
      </CardContent>
    </Grid>
  </Grid>
);
export default ReasonBullet;
