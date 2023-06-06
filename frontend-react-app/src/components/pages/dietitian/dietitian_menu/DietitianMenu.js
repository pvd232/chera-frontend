import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import capitalize from '../../../../helpers/capitalize';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
import getFilteredMealPlanMeals from './helpers/getFilteredMealPlanMeals';
import MediaCard from './MediaCard';
const DietitianMenu = (props) => {
  const customTheme = useTheme();
  const [filterMealPlanId, setFilterMealPlanId] = useState(
    props.dataProps.mealPlans[3].id
  );
  const [filterMealTime, setFilterMealTime] = useState('all');
  const [filterDietaryRestrictions, setFilterDietaryRestrictions] =
    useState('all');

  const mealPlanMealsByMeal = (() => {
    const mealPlanMealMap = new Map();
    props.dataProps.mealPlanMeals.forEach((mealPlanMeal) => {
      if (mealPlanMealMap.has(mealPlanMeal.mealId)) {
        mealPlanMealMap.get(mealPlanMeal.mealId).push(mealPlanMeal);
      } else {
        mealPlanMealMap.set(mealPlanMeal.mealId, [mealPlanMeal]);
      }
    });
    return mealPlanMealMap;
  })();

  const mealPlanMealsByMealPlan = (() => {
    const mealPlanMealMap = new Map();
    props.dataProps.mealPlanMeals.forEach((mealPlanMeal) => {
      if (mealPlanMealMap.has(mealPlanMeal.mealPlanId)) {
        mealPlanMealMap.get(mealPlanMeal.mealPlanId).push(mealPlanMeal);
      } else {
        mealPlanMealMap.set(mealPlanMeal.mealPlanId, [mealPlanMeal]);
      }
    });
    return mealPlanMealMap;
  })();
  const mealPlanMealsByDietaryRestriction = (() => {
    const mealPlansByDietaryRestrictionMap = new Map();
    props.dataProps.extendedMeals.forEach((meal) => {
      meal.dietaryRestrictions.forEach((dietaryRestriction) => {
        const mealPlanMealsAssociated = mealPlanMealsByMeal.get(meal.id);
        if (
          mealPlansByDietaryRestrictionMap.has(
            dietaryRestriction.dietaryRestrictionId
          )
        ) {
          mealPlansByDietaryRestrictionMap.set(
            dietaryRestriction.dietaryRestrictionId,
            [
              ...mealPlansByDietaryRestrictionMap.get(
                dietaryRestriction.dietaryRestrictionId
              ),
              ...mealPlanMealsAssociated,
            ]
          );
        } else {
          mealPlansByDietaryRestrictionMap.set(
            dietaryRestriction.dietaryRestrictionId,
            [...mealPlanMealsAssociated]
          );
        }
      });
    });
    return mealPlansByDietaryRestrictionMap;
  })();

  const mealPlanMealsByMealTime = (() => {
    const mealPlanMealsByTimeMap = new Map();
    props.dataProps.extendedMeals.forEach((meal) => {
      const mealPlanMealsAssociated = mealPlanMealsByMeal.get(meal.id);
      if (mealPlanMealsByTimeMap.has(meal.mealTime)) {
        mealPlanMealsByTimeMap.set(meal.mealTime, [
          ...mealPlanMealsByTimeMap.get(meal.mealTime),
          ...mealPlanMealsAssociated,
        ]);
      } else {
        mealPlanMealsByTimeMap.set(meal.mealTime, [...mealPlanMealsAssociated]);
      }
    });
    return mealPlanMealsByTimeMap;
  })();

  const [filteredMealPlanMeals, setFilteredMealPlanMeals] = useState(
    mealPlanMealsByMealPlan.get(filterMealPlanId)
  );

  const newHandleFilterChange = (event) => {
    const allMealPlanMeals = props.dataProps.mealPlanMeals;
    const filterMealParameters = {
      allMealPlanMeals,
      mealPlanMealsByMealPlan,
      mealPlanMealsByMealTime,
      mealPlanMealsByDietaryRestriction,
      filterMealPlanId,
      filterMealTime,
      filterDietaryRestrictions,
    };
    if (event.target.name === 'filterMealTime') {
      setFilterMealTime(event.target.value);
      filterMealParameters.filterMealTime = event.target.value;
      setFilteredMealPlanMeals(getFilteredMealPlanMeals(filterMealParameters));
    } else if (event.target.name === 'filterDietaryRestrictions') {
      setFilterDietaryRestrictions(event.target.value);
      filterMealParameters.filterDietaryRestrictions = event.target.value;
      setFilteredMealPlanMeals(getFilteredMealPlanMeals(filterMealParameters));
    } else if (event.target.name === 'filterMealPlan') {
      setFilterMealPlanId(event.target.value);
      filterMealParameters.filterMealPlanId = event.target.value;
      setFilteredMealPlanMeals(getFilteredMealPlanMeals(filterMealParameters));
    }
  };

  return (
    <Grid
      container
      paddingTop={'5vh'}
      paddingLeft={'2vw'}
      paddingRight={'2vw'}
      paddingBottom={'10vh'}
      // this gets rid of extra 'purple' space in view layout in chrome dev tools.
      alignItems={'flex-start'}
      backgroundColor={customTheme.palette.olive.quaternary}
    >
      <Grid
        item
        container
        xs={12}
        spacing={2}
        sx={{ height: 'min-content' }}
        alignItems={'flex-end'}
      >
        <Grid item>
          <FormControl>
            <InputLabel>Meal Plan</InputLabel>
            <Select
              label="Meal Plan"
              required
              name="filterMealPlan"
              value={filterMealPlanId}
              onChange={newHandleFilterChange}
            >
              {props.dataProps.mealPlans.map((mealPlan, i) => (
                <MenuItem value={mealPlan.id} sx={{ fontSize: '12px' }} key={i}>
                  {`${mealPlan.number} (${mealPlan.statedCaloricLowerBound}-${mealPlan.statedCaloricUpperBound} kCal)`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel>Time</InputLabel>
            <Select
              label="Time"
              required
              name="filterMealTime"
              value={filterMealTime}
              onChange={newHandleFilterChange}
            >
              {LocalStorageManager.shared.mealTimes.map((mealTime, i) => (
                <MenuItem value={mealTime} key={i}>
                  {capitalize(mealTime)}
                </MenuItem>
              ))}
              {<MenuItem value={'all'}>All</MenuItem>}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={'auto'}>
          <FormControl fullWidth>
            <InputLabel>Other</InputLabel>
            <Select
              label="Other"
              required
              name="filterDietaryRestrictions"
              value={filterDietaryRestrictions}
              onChange={newHandleFilterChange}
            >
              <MenuItem value={'vegetarian'}>Vegetarian</MenuItem>
              <MenuItem value={'all'}>All</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        spacing={4}
        paddingTop={'6vh'}
        justifyContent={window.innerWidth < 450 ? 'center' : 'flex-start'}
      >
        {filteredMealPlanMeals.map((mealPlanMeal, i) => {
          return (
            <Grid item key={i} md={4}>
              <MediaCard
                mealPlanMeal={mealPlanMeal}
                key={i}
                shouldDisplayNutritionDetails={true}
              ></MediaCard>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
export default DietitianMenu;
