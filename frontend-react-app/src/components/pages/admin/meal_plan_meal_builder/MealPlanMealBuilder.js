import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import capitalize from '../../../../helpers/capitalize';
import CacheManager from '../../../../helpers/CacheManager';
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
import getFilteredMealPlanMeals from './helpers/getFilteredMealPlanMeals';
import getMealPlanMealsByMeal from './helpers/getMealPlanMealsByMeal';
import getMealPlanMealsByMealPlan from './helpers/getMealPlanMealsByMealPlan';
import BlueCircularProgress from '../../../shared_components/BlueCircularProgress';
import MealPlanMealRow from './MealPlanMealRow';
import CircularProgressPage from '../../../shared_components/CircularProgressPage';
const MealPlanMealBuilder = (props) => {
  const [mealPlanMeals, setMealPlanMeals] = useState([]);
  const [filterMealPlanId, setFilterMealPlanId] = useState('all');
  const [filterMealId, setfilterMealId] = useState(props.dataProps.meals[0].id);

  const mealPlanMealsByMeal = (() => getMealPlanMealsByMeal(mealPlanMeals))();
  const mealPlanMealsByMealPlan = (() =>
    getMealPlanMealsByMealPlan(mealPlanMeals))();

  const [filteredMealPlanMeals, setFilteredMealPlanMeals] = useState(
    getFilteredMealPlanMeals({
      allMealPlanMeals: mealPlanMeals,
      mealPlanMealsByMeal,
      mealPlanMealsByMealPlan,
      filterMealId,
      filterMealPlanId,
    })
  );
  const [loading, setLoading] = useState(false);
  const [hasMadeChanges, setHasMadeChanges] = useState(false);
  const [hasSubmittedChanges, setHasSubmittedChanges] = useState(false);
  const [hasBeenWarned, setHasBeenWarned] = useState(false);

  useEffect(() => {
    let mounted = true;
    Promise.resolve(CacheManager.shared.mealPlanMeals).then((values) => {
      if (mounted) {
        const extendedMealPlanMealDTOs = values.map(
          (extendedMealPlanMealData) =>
            new ExtendedMealPlanMealDTO(
              extendedMealPlanMealData,
              new ExtendedMealDTOFactory(
                new MealDietaryRestrictionDTOFactory()
              ),
              new ExtendedMealPlanDTOFactory(
                new USDANutrientDailyValueDTOFactory()
              ),
              new ExtendedRecipeIngredientDTOFactory(
                new ExtendedRecipeIngredientNutrientDTOFactory()
              ),
              new ExtendedRecipeIngredientNutrientDTOFactory()
            )
        );
        setMealPlanMeals(extendedMealPlanMealDTOs);
        setFilteredMealPlanMeals(extendedMealPlanMealDTOs);
      }
    });
    return () => (mounted = false);
  }, []);

  const newHandleFilterChange = (event) => {
    if (hasMadeChanges && !hasSubmittedChanges && !hasBeenWarned) {
      alert('Your changes will be abandoned if you do not save them first.');
      setHasBeenWarned(true);
      return;
    } else {
      setHasMadeChanges(false);
      setHasSubmittedChanges(false);
      setHasBeenWarned(false);
      const allMealPlanMeals = mealPlanMeals;
      const filterMealParameters = {
        allMealPlanMeals,
        mealPlanMealsByMealPlan,
        mealPlanMealsByMeal,
        filterMealId,
        filterMealPlanId,
      };
      if (event.target.name === 'filterMealId') {
        setfilterMealId(event.target.value);
        filterMealParameters.filterMealId = event.target.value;
        setFilteredMealPlanMeals(
          getFilteredMealPlanMeals(filterMealParameters)
        );
      } else if (event.target.name === 'filterMealPlan') {
        setFilterMealPlanId(event.target.value);
        filterMealParameters.filterMealPlanId = event.target.value;
        setFilteredMealPlanMeals(
          getFilteredMealPlanMeals(filterMealParameters)
        );
      }
    }
  };
  const handleUpdateIngredients = async (
    mealPlanMealIndex,
    ingredientIndex,
    newIngredient
  ) => {
    setHasMadeChanges(true);

    // Clone filteredMealPlans
    const newFilteredMealPlanMeals = [...filteredMealPlanMeals];

    // Identify MealPlanMeal to update
    const mealPlanMealToUpdate = newFilteredMealPlanMeals[mealPlanMealIndex];

    // Replace ingredient with updated ingredient
    mealPlanMealToUpdate.recipe.splice(ingredientIndex, 1, newIngredient);

    // Obtain new nutritional data from backend
    const updatedMealPlanMealData =
      await APIClient.getUpdatedExtendedMealPlanMeal(mealPlanMealToUpdate);

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

    newFilteredMealPlanMeals.splice(
      mealPlanMealIndex,
      1,
      updatedOddMealPlanMeal
    );

    setFilteredMealPlanMeals(newFilteredMealPlanMeals);
  };

  const handleSubmit = async () => {
    setHasSubmittedChanges(true);
    setLoading(true);
    const recipeIngredientListOfLists = [];
    for (const mealPlanMeal of filteredMealPlanMeals) {
      recipeIngredientListOfLists.push(mealPlanMeal.recipe);
    }

    for (const recipeIngredientList of recipeIngredientListOfLists) {
      // Update recipe ingredient nutrients first to use difference in recipe ingredient quantities to calculate new nutrient values
      await APIClient.updateRecipeIngredientNutrients(recipeIngredientList);
      await APIClient.updateRecipeIngredients(recipeIngredientList);
    }

    alert('Meals successfully updated!');
    window.location.reload();
  };
  return (
    <>
      {mealPlanMeals.length > 0 ? (
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
                  {props.dataProps.mealPlans.map((mealPlan, i) => (
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
                  {props.dataProps.meals.map((meal, i) => (
                    <MenuItem value={meal.id} key={i}>
                      {capitalize(meal.name)}
                    </MenuItem>
                  ))}
                </Select>
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
            {filteredMealPlanMeals.map((mealPlanMeal, i) => {
              const mealPlan = props.dataProps.mealPlans.find(
                (mealPlan) => mealPlan.id === mealPlanMeal.mealPlanId
              );
              return (
                <Grid item key={i}>
                  <MealPlanMealRow
                    mealPlanNumber={mealPlan.number}
                    mealPlanMeal={mealPlanMeal}
                    updateIngredient={(ingredientIndex, newIngredient) =>
                      handleUpdateIngredients(i, ingredientIndex, newIngredient)
                    }
                  />
                </Grid>
              );
            })}
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
export default MealPlanMealBuilder;
