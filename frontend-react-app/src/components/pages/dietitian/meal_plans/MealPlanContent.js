import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import mealPlanContent from './scss/MealPlanContent.module.scss';
const MealPlanContent = (props) => (
  <Grid container className={mealPlanContent.container}>
    <Grid item>
      <Typography className={mealPlanContent.bodyText}>
        {`${props.mealTime}: ${props.calories} kCal`}
      </Typography>
    </Grid>
  </Grid>
);
export default MealPlanContent;
