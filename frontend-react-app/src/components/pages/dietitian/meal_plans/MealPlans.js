import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MealPlanRow from './MealPlanRow';
import mealPlans from './scss/MealPlans.module.scss';
const MealPlans = (props) => {
  const customTheme = useTheme();
  return (
    <Grid container className={mealPlans.container}>
      <Grid item xs={10} className={mealPlans.headerContainer}>
        <Typography className={mealPlans.header}>
          Find the right meal plan
        </Typography>
        <Typography className={mealPlans.emphasizedHeader}>
          for your clients
        </Typography>
      </Grid>
      <Grid container item xs={10} className={mealPlans.contentContainer}>
        {props.mealPlans.mealPlansArray.map((mealPlan, i) => {
          return (
            <MealPlanRow
              customTheme={customTheme}
              mealPlan={mealPlan}
              key={i}
            />
          );
        })}
        <Grid item>
          <Typography className={mealPlans.subtext}>
            * Feeding anyone under 1600 kcal is discouraged even when at risk
            for re-feeding.
          </Typography>
          <Typography className={mealPlans.subtext}>
            Those on Meal Plan 1 should quickly move up meal plans to reduce
            length of underfeeding time.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default MealPlans;
