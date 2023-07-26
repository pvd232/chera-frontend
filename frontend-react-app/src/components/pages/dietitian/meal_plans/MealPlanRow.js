import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MealPlanContent from './MealPlanContent';
import mealPlanRow from './scss/MealPlanRow.module.scss';
const MealPlanRow = (props) => (
  <Grid
    container
    item
    lg={3.5}
    md={8}
    xs={10}
    className={mealPlanRow.container}
  >
    <Grid item>
      <Typography className={mealPlanRow.headerText}>
        {props.mealPlan.number === 1
          ? `Meal Plan ${props.mealPlan.number}: ${props.mealPlan.statedCaloricLowerBound}-${props.mealPlan.statedCaloricUpperBound} kCal*`
          : `Meal Plan ${props.mealPlan.number}: ${props.mealPlan.statedCaloricLowerBound}-${props.mealPlan.statedCaloricUpperBound} kCal`}
      </Typography>
    </Grid>
    <Grid item container className={mealPlanRow.contentContainer}>
      <CardContent>
        <>
          <MealPlanContent
            mealTime={'Breakfast'}
            calories={props.mealPlan.breakfastCalories}
          />
          <MealPlanContent
            mealTime={'Lunch'}
            calories={props.mealPlan.lunchCalories}
          />
          <MealPlanContent
            mealTime={'Dinner'}
            calories={props.mealPlan.dinnerCalories}
          />
        </>
        <Typography className={mealPlanRow.bodyText}>
          {`Snacks: ${props.mealPlan.formattedNumberOfSnacks} snacks with ${props.mealPlan.perSnackCaloricLowerBound}-${props.mealPlan.perSnackCaloricUpperBound} kCal each`}
        </Typography>
      </CardContent>
    </Grid>
  </Grid>
);
export default MealPlanRow;
