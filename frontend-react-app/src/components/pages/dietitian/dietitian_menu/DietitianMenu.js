import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { CircularProgress, Typography } from '@mui/material';
import capitalize from '../../../../helpers/capitalize';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
import APIClient from '../../../../helpers/APIClient';
import getFilteredMeals from './helpers/getFilteredMeals';
import { sortFilteredMealPlanMeals } from './helpers/sortFilteredMealPlanMeals';
import { getMealPlanMealsByMealTime } from './helpers/getMealPlanMealsByMealTime';
import { getMealPlanMealsByMeal } from './helpers/getMealPlanMealsByMeal';
import { getMealPlanMealsByMealPlan } from './helpers/getMealPlanMealsByMealPlan';
import { getMealPlanMealsByDietaryRestriction } from './helpers/getMealPlanMealsByDietaryRestriction';
import { mapExtendedMealPlanMealData } from './helpers/mapExtendedMealPlanMealData';
import MediaCard from './MediaCard';
import { mapExtendedMealPlanSnackData } from './helpers/mapExtendedMealPlanSnackData';

const DietitianMenu = (props) => {
  const customTheme = useTheme();
  const [filterMealPlanId, setFilterMealPlanId] = useState(
    props.mealPlans[4].id
  );
  const [filterSnackMealPlanId, setFilterSnackMealPlanId] = useState(
    props.mealPlans[4].id
  );
  const [filterMealTime, setFilterMealTime] = useState('all');
  const [filterDietaryRestrictions, setFilterDietaryRestrictions] =
    useState('all');
  const [filteredMealPlanMeals, setFilteredMealPlanMeals] = useState(
    getMealPlanMealsByMealPlan(props.mealPlanMeals).get(filterMealPlanId)
  );
  const [filteredMealPlanSnacks, setFilteredMealPlanSnacks] = useState(
    getMealPlanMealsByMealPlan(props.mealPlanSnacks).get(filterMealPlanId)
  );
  const [mealsLoading, setMealsLoading] = useState(false);
  const [snacksLoading, setSnacksLoading] = useState(false);
  const newHandleFilterChange = async (event) => {
    const allMealPlanMeals = props.mealPlanMeals;
    const mealPlanMealsByMealPlan = getMealPlanMealsByMealPlan(
      props.mealPlanMeals
    );
    const mealPlanMealsByMeal = getMealPlanMealsByMeal(props.mealPlanMeals);
    const mealPlanMealsByMealTime = getMealPlanMealsByMealTime(
      props.extendedMeals,
      mealPlanMealsByMeal
    );
    const mealPlanMealsByDietaryRestriction =
      getMealPlanMealsByDietaryRestriction(
        props.extendedMeals,
        mealPlanMealsByMeal
      );
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
      setFilteredMealPlanMeals(getFilteredMeals(filterMealParameters));
    } else if (event.target.name === 'filterDietaryRestrictions') {
      setFilterDietaryRestrictions(event.target.value);
      filterMealParameters.filterDietaryRestrictions = event.target.value;
      setFilteredMealPlanMeals(getFilteredMeals(filterMealParameters));
    } else if (event.target.name === 'filterMealPlan') {
      setFilterMealPlanId(event.target.value);
      filterMealParameters.filterMealPlanId = event.target.value;
      const mealsLoaded = getFilteredMeals(filterMealParameters);
      if (mealsLoaded) {
        setFilteredMealPlanMeals(mealsLoaded);
      } else {
        setMealsLoading(true);
        const mealPlanMealsData =
          await APIClient.getSpecificExtendedMealPlanMeals(event.target.value);
        const extendedMealPlanMealDTOs =
          mapExtendedMealPlanMealData(mealPlanMealsData);
        setFilteredMealPlanMeals(extendedMealPlanMealDTOs);
        setMealsLoading(false);
      }
    }
  };
  const handleSnackFilterChange = async (event) => {
    const mealPlanSnacksByMealPlan = getMealPlanMealsByMealPlan(
      props.mealPlanSnacks
    );
    setFilterSnackMealPlanId(event.target.value);
    const snacksLoaded = mealPlanSnacksByMealPlan.get(event.target.value);
    if (snacksLoaded) {
      setFilteredMealPlanSnacks(snacksLoaded);
    } else {
      setSnacksLoading(true);
      const mealPlanSnacksData =
        await APIClient.getSpecificExtendedMealPlanSnacks(event.target.value);
      const extendedMealPlanSnackDTOs =
        mapExtendedMealPlanSnackData(mealPlanSnacksData);
      setFilteredMealPlanSnacks(extendedMealPlanSnackDTOs);
      setSnacksLoading(false);
    }
  };

  return (
    <Grid
      container
      paddingTop={'5vh'}
      paddingBottom={'10vh'}
      // this gets rid of extra 'purple' space in view layout in chrome dev tools.
      alignItems={'flex-start'}
      backgroundColor={customTheme.palette.fucia.secondary}
      justifyContent={'center'}
    >
      <Grid container item xs={10} mb={'3vh'}>
        <Typography
          fontSize={'2rem'}
          textAlign={'center'}
          color={customTheme.palette.olive.main}
        >
          Meals
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={10}
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
              {props.mealPlans.map((mealPlan, i) => (
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
      <Grid container item xs={10} paddingTop={'6vh'}>
        {mealsLoading ? (
          <Grid container item justifyContent={'center'}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container item spacing={4}>
            {sortFilteredMealPlanMeals(filteredMealPlanMeals).map(
              (mealPlanMeal, i) => {
                return (
                  <Grid item key={i} md={4}>
                    <MediaCard
                      mealPlanMeal={mealPlanMeal}
                      name={mealPlanMeal.associatedMeal.name}
                      description={mealPlanMeal.associatedMeal.description}
                      imageUrl={mealPlanMeal.associatedMeal.imageUrl}
                      mealTime={mealPlanMeal.associatedMeal.mealTime}
                      key={i}
                      shouldDisplayNutritionDetails={true}
                    ></MediaCard>
                  </Grid>
                );
              }
            )}
          </Grid>
        )}
      </Grid>
      <Grid container item xs={10} mt={'10vh'} mb={'3vh'}>
        <Typography
          fontSize={'2rem'}
          textAlign={'center'}
          color={customTheme.palette.olive.main}
        >
          Snacks
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={10}
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
              name="filterSnackMealPlan"
              value={filterSnackMealPlanId}
              onChange={handleSnackFilterChange}
            >
              {props.mealPlans.map((mealPlan, i) => (
                <MenuItem value={mealPlan.id} sx={{ fontSize: '12px' }} key={i}>
                  {`${mealPlan.number} (${mealPlan.statedCaloricLowerBound}-${mealPlan.statedCaloricUpperBound} kCal)`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container item xs={10} paddingTop={'6vh'}>
        {snacksLoading ? (
          <Grid container item justifyContent={'center'}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container item spacing={4}>
            {sortFilteredMealPlanMeals(filteredMealPlanSnacks).map(
              (mealPlanSnack, i) => {
                return (
                  <Grid item key={i} md={4}>
                    <MediaCard
                      mealPlanMeal={mealPlanSnack}
                      name={mealPlanSnack.associatedSnack.name}
                      description={mealPlanSnack.associatedSnack.description}
                      imageUrl={mealPlanSnack.associatedSnack.imageUrl}
                      isSnackCard={true}
                      key={i}
                      shouldDisplayNutritionDetails={true}
                    ></MediaCard>
                  </Grid>
                );
              }
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
export default DietitianMenu;
