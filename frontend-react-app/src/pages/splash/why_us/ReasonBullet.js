import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import { IconButton, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const ReasonBullet = (props) => (
  <Grid
    item
    container
    justifyContent={'flex-start'}
    alignItems={'center'}
    my={2}
    mx={0}
    px={1}
    onClick={props.setReasonOpen}
  >
    <Grid item justifyContent={'center'} alignContent={'center'}>
      <Icon fontSize="large">{props.icon}</Icon>
    </Grid>
    <Grid item>
      <CardContent>
        <Typography
          fontWeight={500}
          fontSize={props.customTheme.fontEqualizer(18)}
        >
          {props.bulletPrimaryText}
        </Typography>
      </CardContent>
    </Grid>
    <Grid item container lg={1} xs={1} sx={{ marginLeft: 'auto' }}>
      <Stack>
        <IconButton
          sx={{
            padding: '0',
            color: 'rgba(0, 0, 0, 1)',
            background: `${props.customTheme.palette.lightGrey.main}`,
          }}
        >
          {props.reasonOpen ? (
            <ArrowDropUpIcon fontSize="large" />
          ) : (
            <ArrowDropDownIcon fontSize="large" />
          )}
        </IconButton>
      </Stack>
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
