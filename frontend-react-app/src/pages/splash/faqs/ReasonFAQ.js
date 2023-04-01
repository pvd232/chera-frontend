import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import CardContent from '@mui/material/CardContent';

const ReasonFAQ = (props) => (
  <Grid
    item
    container
    justifyContent={'flex-start'}
    alignItems={'center'}
    onClick={props.setReasonOpen}
    borderBottom={`2px solid ${props.customTheme.palette.lightGreyBorderBottom.main}`}
    paddingBottom={'1vh'}
  >
    <Grid item xs={11}>
      <Typography fontSize={props.customTheme.fontEqualizer(18)}>
        {props.question}
      </Typography>
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
        <Typography
          color={props.customTheme.palette.secondaryText.main}
          fontSize={props.customTheme.fontEqualizer(18)}
        >
          {props.answer}
        </Typography>
      </CardContent>
    </Grid>
  </Grid>
);
export default ReasonFAQ;
