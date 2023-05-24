import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MealPlanRow from './MealPlanRow';
const MealPlans = (props) => {
  const customTheme = useTheme();
  return (
    <Grid
      container
      justifyContent={'center'}
      sx={{
        backgroundColor: customTheme.palette.lightGrey.secondary,
      }}
    >
      <Grid
        item
        xs={10}
        lg={5}
        sx={{ marginBottom: '15vh', marginTop: '10vh' }}
      >
        <Typography
          fontSize={customTheme.fontEqualizer(48)}
          textAlign={'center'}
          color={customTheme.palette.black.main}
          fontWeight={500}
        >
          Find a meal plan that best fits
          <span style={{ color: customTheme.palette.olive.main }}>
            {' '}
            your client's needs
          </span>
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={11}
        justifyContent={'center'}
        rowSpacing={10}
        columnSpacing={10}
        marginBottom={'10vh'}
      >
        {props.dataProps.mealPlans.mealPlansArray.map((mealPlan, i) => {
          return (
            <MealPlanRow
              customTheme={customTheme}
              mealPlan={mealPlan}
              key={i}
            />
          );
        })}
        <Grid item>
          <Typography fontSize={customTheme.fontEqualizer(14)}>
            * Feeding anyone under 1600 kcal is discouraged even when at risk
            for re-feeding. Those on Meal Plan 1 should quickly move up meal
            plans to reduce length of underfeeding time.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default MealPlans;
