import { useState } from 'react';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import capitalize from '../../../../helpers/capitalize';
import APIClient from '../../../../helpers/APIClient';
import SnackDTOFactory from '../../../../data_models/factories/dto/SnackDTOFactory';
import ExtendedMealPlanSnackDTO from '../../../../data_models/dto/ExtendedMealPlanSnackDTO';
import ExtendedMealPlanDTOFactory from '../../../../data_models/factories/dto/ExtendedMealPlanDTOFactory';
import ExtendedRecipeIngredientDTOFactory from '../../../../data_models/factories/dto/ExtendedRecipeIngredientDTOFactory';
import USDANutrientDailyValueDTOFactory from '../../../../data_models/factories/dto/USDANutrientDailyValueDTOFactory';
import ExtendedRecipeIngredientNutrientDTOFactory from '../../../../data_models/factories/dto/ExtendedRecipeIngredientNutrientDTOFactory';
import RowBorder from '../../dietitian/dietitian_menu/nutrition_details/RowBorder';
import BlackButton from '../../../shared_components/BlackButton';
import BlueCircularProgress from '../../../shared_components/BlueCircularProgress';
import MealPlanSnackRow from './MealPlanSnackRow';
import CircularProgressPage from '../../../shared_components/CircularProgressPage';
import { getMealPlanSnack } from './helpers/getMealPlanSnack';
import { useMealPlanSnack } from './hooks/useMealPlanSnack';
import ExtendedRecipeIngredientDTO from '../../../../data_models/dto/ExtendedRecipeIngredientDTO';
import { cloneMealPlanSnack } from './helpers/cloneMealPlanSnack';
const MealPlanSnackBuilder = (props) => {
  const [mealPlanSnack, setMealPlanSnack] = useMealPlanSnack(
    props.mealPlans[0].id,
    props.snacks[0].id
  );
  const [filterMealPlanId, setFilterMealPlanId] = useState(
    props.mealPlans[0].id
  );
  const [filterSnackId, setfilterSnackId] = useState(props.snacks[0].id);
  const [multiplier, setMultiplier] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMadeChanges, setHasMadeChanges] = useState(false);
  const [hasSubmittedChanges, setHasSubmittedChanges] = useState(false);
  const [hasBeenWarned, setHasBeenWarned] = useState(false);
  const handleBlur = (event) => {
    setMultiplier(parseFloat(event.target.value));
  };
  const newHandleFilterChange = async (event) => {
    setMultiplier(1);
    if (hasMadeChanges && !hasSubmittedChanges && !hasBeenWarned) {
      alert('Your changes will be abandoned if you do not save them first.');
      setHasBeenWarned(true);
      return;
    } else {
      setHasMadeChanges(false);
      setHasSubmittedChanges(false);
      setHasBeenWarned(false);
      if (event.target.name === 'filterSnackId') {
        setfilterSnackId(event.target.value);
        const newMealPlanSnack = await getMealPlanSnack(
          filterMealPlanId,
          event.target.value
        );
        setMealPlanSnack(newMealPlanSnack);
      } else if (event.target.name === 'filterMealPlan') {
        setFilterMealPlanId(event.target.value);
        const newMealPlanSnack = await getMealPlanSnack(
          event.target.value,
          filterSnackId
        );
        setMealPlanSnack(newMealPlanSnack);
      }
    }
  };
  const handleUpdateIngredients = async (ingredientIndex, newIngredient) => {
    setHasMadeChanges(true);

    // Replace ingredient with updated ingredient
    mealPlanSnack.recipe.splice(ingredientIndex, 1, newIngredient);

    // Obtain new nutritional data from backend
    const updatedMealPlanSnackData =
      await APIClient.getUpdatedExtendedMealPlanSnack(mealPlanSnack);

    // Instantiate new object with new data
    const updatedOddMealPlanSnack = new ExtendedMealPlanSnackDTO(
      updatedMealPlanSnackData,
      new SnackDTOFactory(),
      new ExtendedMealPlanDTOFactory(new USDANutrientDailyValueDTOFactory()),
      new ExtendedRecipeIngredientDTOFactory(
        new ExtendedRecipeIngredientNutrientDTOFactory()
      ),
      new ExtendedRecipeIngredientNutrientDTOFactory()
    );
    setMealPlanSnack(updatedOddMealPlanSnack);
  };

  const handleSubmit = async () => {
    setHasSubmittedChanges(true);
    setLoading(true);

    // Default multiplier state value is 1 (no change), however if mealPlanSnack multiplier is not 1, then update recipe ingredients and nutrients
    if (multiplier !== 1 || mealPlanSnack.multiplier !== 1) {
      // Update recipe ingredients to reflect multiplier
      const multipliedRecipe = (() => {
        if (multiplier !== 1) {
          return mealPlanSnack.recipe.map((ingredient) => {
            const multipliedIngredient = new ExtendedRecipeIngredientDTO(
              ingredient.toJSON()
            );
            multipliedIngredient.quantity = ingredient.quantity * multiplier;
            return multipliedIngredient;
          });
        } else {
          return mealPlanSnack.recipe;
        }
      })();
      if (multiplier !== 1) {
        // Update recipe ingredients and nutrients in backend
        await APIClient.updateRecipeIngredientNutrients(multipliedRecipe);
        await APIClient.updateRecipeIngredients(multipliedRecipe);

        mealPlanSnack.multiplier = multiplier;
        // Update meal plan meal in backend
        await APIClient.updateMealPlanSnack(mealPlanSnack);
      }

      //  // Update recipe ingredients and nutrients in backend for sister meal plan snack, which has identical recipe
      if (
        mealPlanSnack.associatedMealPlan.number === 2 ||
        mealPlanSnack.associatedMealPlan.number === 4 ||
        mealPlanSnack.associatedMealPlan.number === 6
      ) {
        const evenMealPlan = await APIClient.getMealPlan(
          mealPlanSnack.associatedMealPlan.number + 3
        );

        const evenMealPlanSnack = await getMealPlanSnack(
          evenMealPlan.id,
          mealPlanSnack.snackId
        );
        const multiplierToUse =
          multiplier !== 1 ? multiplier : mealPlanSnack.multiplier;
        await cloneMealPlanSnack(
          multipliedRecipe,
          evenMealPlanSnack,
          multiplierToUse
        );
      }
    }
    alert('Snacks successfully updated!');
    window.location.reload();
  };
  return (
    <>
      {mealPlanSnack ? (
        <Grid
          container
          paddingTop={'5vh'}
          paddingLeft={'3vw'}
          paddingRight={'3vw'}
          paddingBottom={'10vh'}
        >
          <Grid
            item
            container
            xs={12}
            spacing={2}
            sx={{ height: 'min-content' }}
            alignItems={'flex-end'}
          >
            <Grid item lg={2}>
              <FormControl fullWidth>
                <InputLabel>Meal Plan</InputLabel>
                <Select
                  label="Meal Plan"
                  required
                  name="filterMealPlan"
                  value={filterMealPlanId}
                  onChange={newHandleFilterChange}
                >
                  {props.mealPlans.map((mealPlan, i) => (
                    <MenuItem
                      value={mealPlan.id}
                      sx={{ fontSize: '12px' }}
                      key={i}
                    >
                      {`${mealPlan.number} (${mealPlan.perSnackCaloricLowerBound}-${mealPlan.perSnackCaloricUpperBound} kCal)`}
                    </MenuItem>
                  ))}
                  <MenuItem value={'all'} sx={{ fontSize: '12px' }} key={'all'}>
                    All
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={2}>
              <FormControl fullWidth>
                <InputLabel>Meal</InputLabel>
                <Select
                  label="Meal"
                  required
                  name="filterSnackId"
                  value={filterSnackId}
                  onChange={newHandleFilterChange}
                >
                  {props.snacks.map((meal, i) => (
                    <MenuItem value={meal.id} key={i}>
                      {capitalize(meal.name)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={2}>
              <FormControl fullWidth>
                <TextField label="Multiplier" onBlur={handleBlur}>
                  {multiplier}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            item
            spacing={4}
            paddingTop={'6vh'}
            justifyContent={window.innerWidth < 450 ? 'center' : 'flex-start'}
          >
            <Grid item>
              <MealPlanSnackRow
                mealPlanNumber={mealPlanSnack.associatedMealPlan.number}
                mealPlanSnack={mealPlanSnack}
                updateIngredient={(ingredientIndex, newIngredient) =>
                  handleUpdateIngredients(ingredientIndex, newIngredient)
                }
                multiplier={multiplier}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} marginY={'3vh'}>
              <RowBorder height={'2px'}></RowBorder>
            </Grid>
          </Grid>
          <Grid item xs={2} sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <BlackButton
              variant="contained"
              onClick={handleSubmit}
              sx={{ width: '100%', padding: '1vh' }}
            >
              {loading ? <BlueCircularProgress /> : 'Submit'}
            </BlackButton>
          </Grid>
        </Grid>
      ) : (
        <CircularProgressPage />
      )}
    </>
  );
};
export default MealPlanSnackBuilder;
