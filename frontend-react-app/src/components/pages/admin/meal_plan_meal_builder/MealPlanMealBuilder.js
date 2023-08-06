import { useState } from 'react';
import { CircularProgress, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import capitalize from '../../../../helpers/capitalize';
import APIClient from '../../../../helpers/APIClient';
import ExtendedMealDTOFactory from '../../../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedMealPlanMealDTO from '../../../../data_models/dto/ExtendedMealPlanMealDTO';
import ExtendedMealPlanDTOFactory from '../../../../data_models/factories/dto/ExtendedMealPlanDTOFactory';
import ExtendedRecipeIngredientDTOFactory from '../../../../data_models/factories/dto/ExtendedRecipeIngredientDTOFactory';
import USDANutrientDailyValueDTOFactory from '../../../../data_models/factories/dto/USDANutrientDailyValueDTOFactory';
import ExtendedRecipeIngredientNutrientDTOFactory from '../../../../data_models/factories/dto/ExtendedRecipeIngredientNutrientDTOFactory';
import RowBorder from '../../dietitian/dietitian_menu/nutrition_details/RowBorder';
import BlackButton from '../../../shared_components/BlackButton';
import MealPlanMealRow from './MealPlanMealRow';
import CircularProgressPage from '../../../shared_components/CircularProgressPage';
import { getMealPlanMeal } from './helpers/getMealPlanMeal';
import { useMealPlanMeal } from './hooks/useMealPlanMeal';
import ExtendedRecipeIngredientDTO from '../../../../data_models/dto/ExtendedRecipeIngredientDTO';
import { cloneMealPlanMeal } from './helpers/cloneMealPlanMeal';
const MealPlanMealBuilder = (props) => {
  const [mealPlanMeal, setMealPlanMeal] = useMealPlanMeal(
    props.mealPlans[0].id,
    props.meals[0].id
  );
  const [filterMealPlanId, setFilterMealPlanId] = useState(
    props.mealPlans[0].id
  );
  const [filterMealId, setfilterMealId] = useState(props.meals[0].id);
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
      if (event.target.name === 'filterMealId') {
        setfilterMealId(event.target.value);
        const newMealPlanMeal = await getMealPlanMeal(
          filterMealPlanId,
          event.target.value
        );
        setMealPlanMeal(newMealPlanMeal);
      } else if (event.target.name === 'filterMealPlan') {
        setFilterMealPlanId(event.target.value);
        const newMealPlanMeal = await getMealPlanMeal(
          event.target.value,
          filterMealId
        );
        setMealPlanMeal(newMealPlanMeal);
      }
    }
  };
  const handleUpdateIngredients = async (ingredientIndex, newIngredient) => {
    setHasMadeChanges(true);

    // Replace ingredient with updated ingredient
    mealPlanMeal.recipe.splice(ingredientIndex, 1, newIngredient);

    // Obtain new nutritional data from backend
    const updatedMealPlanMealData =
      await APIClient.getUpdatedExtendedMealPlanMeal(mealPlanMeal);

    // Instantiate new object with new data
    const updatedOddMealPlanMeal = new ExtendedMealPlanMealDTO(
      updatedMealPlanMealData,
      new ExtendedMealDTOFactory(new MealDietaryRestrictionDTOFactory()),
      new ExtendedMealPlanDTOFactory(new USDANutrientDailyValueDTOFactory()),
      new ExtendedRecipeIngredientDTOFactory(
        new ExtendedRecipeIngredientNutrientDTOFactory()
      ),
      new ExtendedRecipeIngredientNutrientDTOFactory()
    );
    setMealPlanMeal(updatedOddMealPlanMeal);
  };

  const handleSubmit = async () => {
    setHasSubmittedChanges(true);
    setLoading(true);

    // Default multiplier state value is 1 (no change), however if mealPlanMeal multiplier is not 1, then update recipe ingredients and nutrients
    if (multiplier !== 1 || mealPlanMeal.multiplier !== 1) {
      // Update recipe ingredients to reflect multiplier
      const multipliedRecipe = (() => {
        if (multiplier !== 1) {
          return mealPlanMeal.recipe.map((ingredient) => {
            const multipliedIngredient = new ExtendedRecipeIngredientDTO(
              ingredient.toJSON()
            );
            multipliedIngredient.quantity = ingredient.quantity * multiplier;
            return multipliedIngredient;
          });
        } else {
          return mealPlanMeal.recipe;
        }
      })();
      if (multiplier !== 1) {
        // Update recipe ingredients and nutrients in backend
        await APIClient.updateRecipeIngredientNutrients(multipliedRecipe);
        await APIClient.updateRecipeIngredients(multipliedRecipe);

        mealPlanMeal.multiplier = multiplier;
        // Update meal plan meal in backend
        await APIClient.updateMealPlanMeal(mealPlanMeal);
      }

      // // Update recipe ingredients and nutrients in backend for even meal plan meal, which has identical recipe
      const evenMealPlan = await APIClient.getMealPlan(
        mealPlanMeal.associatedMealPlan.number + 1
      );

      const evenMealPlanMeal = await getMealPlanMeal(
        evenMealPlan.id,
        mealPlanMeal.mealId
      );
      const multiplierToUse =
        multiplier !== 1 ? multiplier : mealPlanMeal.multiplier;
      await cloneMealPlanMeal(
        multipliedRecipe,
        evenMealPlanMeal,
        multiplierToUse
      );
    }

    alert('Meals successfully updated!');
    window.location.reload();
  };
  return (
    <>
      {mealPlanMeal ? (
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
                  label="Meal Plan "
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
                      {`${mealPlan.number} (${mealPlan.statedCaloricLowerBound}-${mealPlan.statedCaloricUpperBound} kCal)`}
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
                  name="filterMealId"
                  value={filterMealId}
                  onChange={newHandleFilterChange}
                >
                  {props.meals.map((meal, i) => (
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
              <MealPlanMealRow
                mealPlanNumber={mealPlanMeal.associatedMealPlan.number}
                mealPlanMeal={mealPlanMeal}
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
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </BlackButton>
          </Grid>
        </Grid>
      ) : (
        <CircularProgressPage />
      )}
    </>
  );
};
export default MealPlanMealBuilder;
