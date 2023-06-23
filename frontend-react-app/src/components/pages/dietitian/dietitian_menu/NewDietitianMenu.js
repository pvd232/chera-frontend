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
// Testing this still

const DietitianMenu = (props) => {
  const customTheme = useTheme();
  const [filterMealPlanId, setFilterMealPlanId] = useState(
    props.dataProps.mealPlans[3].id
  );
  const [filterMealTime, setFilterMealTime] = useState('all');
  const [filterDietaryRestrictions, setFilterDietaryRestrictions] =
    useState('all');
  const mealsByDietaryRestrictionMap = (() => {
    const mealsByDietaryRestrictionMapToReturn = new Map();
    props.extendedMeals.forEach((meal) => {
      meal.dietaryRestrictions.forEach((dietaryRestriction) => {
        if (
          !mealsByDietaryRestrictionMapToReturn.has(
            dietaryRestriction.dietaryRestrictionId
          )
        ) {
          const mealSet = new Set();
          mealSet.add(meal.id);
          mealsByDietaryRestrictionMapToReturn.set(
            dietaryRestriction.dietaryRestrictionId,
            mealSet
          );
        } else {
          mealsByDietaryRestrictionMapToReturn
            .get(dietaryRestriction.dietaryRestrictionId)
            .add(meal.id);
        }
      });
    });
    return mealsByDietaryRestrictionMapToReturn;
  })();
  const mealsByMealTimeMap = (() => {
    const mealsByMealTimeMapToReturn = new Map();
    props.extendedMeals.forEach((meal) => {
      if (!mealsByMealTimeMapToReturn.has(meal.mealTime)) {
        const mealSet = new Set();
        mealSet.add(meal.id);
        mealsByMealTimeMapToReturn.set(meal.mealTime, mealSet);
      } else {
        mealsByMealTimeMapToReturn.get(meal.mealTime).add(meal.id);
      }
    });
    return mealsByMealTimeMapToReturn;
  })();

  const [filteredMeals, setFilteredMeals] = useState(props.extendedMeals);
  const newHandleFilterChange = (event) => {
    const extendedMeals = props.extendedMeals;
    const filterMealParameters = {
      extendedMeals,
      mealsByMealTimeMap,
      mealsByDietaryRestrictionMap,
      filterMealPlanId,
      filterMealTime,
      filterDietaryRestrictions,
    };
    if (event.target.name === 'filterMealTime') {
      setFilterMealTime(event.target.value);
      filterMealParameters.filterMealTime = event.target.value;
      setFilteredMeals(getFilteredMealPlanMeals(filterMealParameters));
    } else if (event.target.name === 'filterDietaryRestrictions') {
      setFilterDietaryRestrictions(event.target.value);
      filterMealParameters.filterDietaryRestrictions = event.target.value;
      setFilteredMeals(getFilteredMealPlanMeals(filterMealParameters));
    } else if (event.target.name === 'filterMealPlan') {
      setFilterMealPlanId(event.target.value);
      filterMealParameters.filterMealPlanId = event.target.value;
      setFilteredMeals(getFilteredMealPlanMeals(filterMealParameters));
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
        {filteredMeals.map((meal, i) => {
          return (
            <Grid item key={i} md={4}>
              <MediaCard meal={meal} key={i}></MediaCard>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
export default DietitianMenu;
