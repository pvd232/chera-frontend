import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MealItem from './MealItem';
const MealPlanRow = (props) => (
  <Grid
    container
    item
    lg={3.5}
    md={8}
    xs={10}
    direction="column"
    marginLeft={'2vw'}
    marginRight={'2vw'}
  >
    <Grid item>
      <Typography
        fontSize={props.customTheme.fontEqualizer(8, true)}
        fontWeight={'bold'}
        textAlign={'center'}
        paddingBottom={'1.5vh'}
      >
        {props.mealPlan.number === 1
          ? `Meal Plan ${props.mealPlan.number}: ${props.mealPlan.statedCaloricLowerBound}-${props.mealPlan.statedCaloricUpperBound} calories*`
          : `Meal Plan ${props.mealPlan.number}: ${props.mealPlan.statedCaloricLowerBound}-${props.mealPlan.statedCaloricUpperBound} calories`}
      </Typography>
    </Grid>
    <Grid
      item
      container
      justifyContent={'flex-start'}
      sx={{
        border: 'solid 2px black',

        // this makes the columns equal length
        flex: 1,
      }}
    >
      <CardContent>
        <>
          <MealItem
            customTheme={props.customTheme}
            mealTime={'Breakfast'}
            calories={props.mealPlan.breakfastCalories}
          ></MealItem>
          <MealItem
            customTheme={props.customTheme}
            mealTime={'Lunch'}
            calories={props.mealPlan.lunchCalories}
          ></MealItem>
          <MealItem
            customTheme={props.customTheme}
            mealTime={'Dinner'}
            calories={props.mealPlan.dinnerCalories}
          ></MealItem>
        </>
        <Typography
          fontSize={props.customTheme.fontEqualizer(8, true)}
          textAlign={'left'}
          paddingBottom={'1.5vh'}
        >
          {`Snacks: ${props.mealPlan.formattedNumberOfSnacks} snacks with ${props.mealPlan.perSnackCaloricLowerBound}-${props.mealPlan.perSnackCaloricUpperBound} calories each (not included)`}
        </Typography>
      </CardContent>
    </Grid>
  </Grid>
);
export default MealPlanRow;
