import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IngredientRow from './IngredientRow';
import { FormControl } from '@mui/material';

const MealPlanSnackRow = (props) => {
  const customTheme = useTheme();
  const handleUpdateIngredient = (ingredientIndex, newIngredient) => {
    props.updateIngredient(ingredientIndex, newIngredient);
  };
  const multiplied = (value) => {
    return value * props.multiplier;
  };
  return (
    <Grid container rowSpacing={4} columnGap={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography fontWeight={'bold'}>Snack Item</Typography>
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
              label={props.mealPlanSnack.name}
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
              label={`Meal Plan ${props.mealPlanNumber} (${props.mealPlanSnack.mealPlanSnackCalories} kCal)`}
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
              label={props.mealPlanSnack.description}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container item columnGap={'2vh'}>
        <Grid item lg={3}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ style: { color: 'black' } }}
              disabled={true}
              sx={{
                backgroundColor:
                  Math.abs(
                    props.mealPlanSnack.kCal -
                      props.mealPlanSnack.mealPlanSnackCalories
                  ) /
                    props.mealPlanSnack.mealPlanSnackCalories >
                  0.1
                    ? customTheme.palette.rose.secondary
                    : customTheme.palette.lightGreen.secondary,
              }}
              label={`${props.mealPlanSnack.kCal.toFixed()} kCal`}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            InputLabelProps={{ style: { color: 'black' } }}
            disabled={true}
            sx={{
              backgroundColor:
                props.mealPlanSnack.macroData.protein >= 0.35 ||
                props.mealPlanSnack.macroData.protein <= 0.1
                  ? customTheme.palette.rose.secondary
                  : customTheme.palette.lightGreen.secondary,
            }}
            label={`Protein ${Math.round(
              props.mealPlanSnack.macroData.protein * 100
            )}%`}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            InputLabelProps={{ style: { color: 'black' } }}
            disabled={true}
            sx={{
              backgroundColor:
                props.mealPlanSnack.macroData.carb >= 0.7 ||
                props.mealPlanSnack.macroData.carb <= 0.4
                  ? customTheme.palette.rose.secondary
                  : customTheme.palette.lightGreen.secondary,
            }}
            label={`Carb ${Math.round(
              props.mealPlanSnack.macroData.carb * 100
            )}%`}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            InputLabelProps={{ style: { color: 'black' } }}
            disabled={true}
            sx={{
              backgroundColor:
                props.mealPlanSnack.macroData.fat >= 0.38 ||
                props.mealPlanSnack.macroData.fat <= 0.17
                  ? customTheme.palette.rose.secondary
                  : customTheme.palette.lightGreen.secondary,
            }}
            label={`Fat ${Math.round(
              props.mealPlanSnack.macroData.fat * 100
            )}%`}
          ></TextField>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item lg={3}>
          <FormControl fullWidth>
            <Typography>New Calories</Typography>
            <TextField
              InputLabelProps={{ style: { color: 'black' } }}
              disabled={true}
              sx={{
                backgroundColor:
                  Math.abs(
                    multiplied(props.mealPlanSnack.kCal) -
                      props.mealPlanSnack.mealPlanSnackCalories
                  ) /
                    props.mealPlanSnack.mealPlanSnackCalories >=
                  0.1
                    ? customTheme.palette.rose.secondary
                    : customTheme.palette.lightGreen.secondary,
              }}
              label={`${multiplied(props.mealPlanSnack.kCal).toFixed()} kCal`}
            />
          </FormControl>
        </Grid>
      </Grid>
      {/* Ingredients */}
      <Grid item xs={12}>
        <Typography fontWeight={'bold'} paddingBottom={2}>
          Ingredients
        </Typography>
      </Grid>
      <Grid container rowGap={'5vh'}>
        {props.mealPlanSnack.recipe.map((ingredient, i) => (
          <IngredientRow
            mealPlanNumber={props.mealPlanNumber}
            key={ingredient.id}
            ingredient={ingredient}
            index={i}
            updateIngredient={(newIngredient) =>
              handleUpdateIngredient(i, newIngredient)
            }
            multiplier={props.multiplier}
          />
        ))}
      </Grid>
    </Grid>
  );
};
export default MealPlanSnackRow;
