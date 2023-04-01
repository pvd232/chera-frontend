import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IngredientRow from './IngredientRow';
import { FormControl } from '@mui/material';
const MealPlanMealRow = (props) => {
  console.log('props.mealPlanMeal', props.mealPlanMeal);
  const customTheme = useTheme();
  const handleUpdateIngredient = (ingredientIndex, newIngredient) => {
    props.updateIngredient(ingredientIndex, newIngredient);
  };
  return (
    <Grid container rowSpacing={4} columnGap={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography fontWeight={'bold'}>Meal Item</Typography>
        </Grid>
        {/* Meal information */}
        <Grid item lg={3}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ style: { color: 'black' } }}
              disabled={true}
              fullWidth
              name="mealName"
              multiline
              label={props.mealPlanMeal.name}
            />
          </FormControl>
        </Grid>

        <Grid item lg={3} sx={{ textAlign: 'right' }}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ style: { color: 'black' } }}
              disabled={true}
              fullWidth
              name="mealPlanNumber"
              multiline
              label={`Meal Plan ${props.mealPlanNumber} (${props.mealPlanMeal.mealPlanCalories} kCal)`}
            />
          </FormControl>
        </Grid>
        <Grid item lg={6} sx={{ textAlign: 'right' }}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ style: { color: 'black' } }}
              disabled={true}
              fullWidth
              name="mealDescription"
              multiline
              label={props.mealPlanMeal.description}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid item lg={3}>
        <FormControl fullWidth>
          <TextField
            InputLabelProps={{ style: { color: 'black' } }}
            disabled={true}
            sx={{
              backgroundColor:
                Math.abs(
                  props.mealPlanMeal.kCal - props.mealPlanMeal.mealPlanCalories
                ) /
                  props.mealPlanMeal.mealPlanCalories >
                0.1
                  ? customTheme.palette.rose.secondary
                  : customTheme.palette.lightGreen.secondary,
            }}
            label={`${props.mealPlanMeal.kCal.toFixed()} kCal`}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          InputLabelProps={{ style: { color: 'black' } }}
          disabled={true}
          sx={{
            backgroundColor:
              props.mealPlanMeal.macroData.fat > 0.35 ||
              props.mealPlanMeal.macroData.fat < 0.1
                ? customTheme.palette.rose.secondary
                : customTheme.palette.lightGreen.secondary,
          }}
          label={`Protein ${Math.round(
            props.mealPlanMeal.macroData.protein * 100
          )}%`}
        ></TextField>
      </Grid>
      <Grid item>
        <TextField
          InputLabelProps={{ style: { color: 'black' } }}
          disabled={true}
          sx={{
            backgroundColor:
              props.mealPlanMeal.macroData.carb > 0.65 ||
              props.mealPlanMeal.macroData.carb < 0.45
                ? customTheme.palette.rose.secondary
                : customTheme.palette.lightGreen.secondary,
          }}
          label={`Carb ${Math.round(props.mealPlanMeal.macroData.carb * 100)}%`}
        ></TextField>
      </Grid>
      <Grid item>
        <TextField
          InputLabelProps={{ style: { color: 'black' } }}
          disabled={true}
          sx={{
            backgroundColor:
              props.mealPlanMeal.macroData.fat > 0.35 ||
              props.mealPlanMeal.macroData.fat < 0.2
                ? customTheme.palette.rose.secondary
                : customTheme.palette.lightGreen.secondary,
          }}
          label={`Fat ${Math.round(props.mealPlanMeal.macroData.fat * 100)}%`}
        ></TextField>
      </Grid>
      {/* Ingredients */}
      <Grid item xs={12}>
        <Typography fontWeight={'bold'} paddingBottom={2}>
          Ingredients
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {props.mealPlanMeal.recipe.map((ingredient, i) => (
          <IngredientRow
            mealPlanNumber={props.mealPlanNumber}
            key={ingredient.id}
            ingredient={ingredient}
            index={i}
            updateIngredient={(newIngredient) =>
              handleUpdateIngredient(i, newIngredient)
            }
          />
        ))}
      </Grid>
    </Grid>
  );
};
export default MealPlanMealRow;
