import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const MealItem = (props) => (
  <Grid container justifyContent={'flex-start'} sx={{ marginBottom: '3vh' }}>
    <Grid item>
      <Typography
        fontSize={props.customTheme.fontEqualizer(8, true)}
        textAlign={'left'}
      >
        {`${props.mealTime}: ${props.calories} calories`}
      </Typography>
    </Grid>
  </Grid>
);
export default MealItem;
