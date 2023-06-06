import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import APIClient from '../../../helpers/APIClient';
import capitalize from '../../../helpers/capitalize';
import MealDTO from '../../../data_models/dto/MealDTO';
import Meal from '../../../data_models/model/Meal';
import SplashMealCard from './SplashMealCard';
const SplashMenu = () => {
  const customTheme = useTheme();

  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [filterMealTime, setFilterMealTime] = useState('all');
  const [filterMealPreferences, setFilterMealPreferences] = useState('all');

  useEffect(() => {
    let mounted = true;
    APIClient.getMeals().then((meals) => {
      if (mounted) {
        const mealsArray = [];
        for (const meal of meals) {
          const newMealDTO = new MealDTO(meal);
          const newMeal = new Meal(newMealDTO);
          mealsArray.push(newMeal);
        }
        setMeals(mealsArray);
        setFilteredMeals(mealsArray);
      }
    });
    return () => (mounted = false);
  }, []);

  const newHandleFilterChange = (event) => {
    let timeFilter = false;
    let dietFilter = false;
    if (event.target.name === 'filterMealTime') {
      setFilterMealTime(event.target.value);
      timeFilter = true;
    } else if (event.target.name === 'filterMealPreferences') {
      setFilterMealPreferences(event.target.value);
      dietFilter = true;
    }

    const timeFilteredMeals = (() => {
      let filterId = '';
      if (timeFilter) {
        filterId = event.target.value;
      } else {
        filterId = filterMealTime;
      }
      if (filterId !== 'all') {
        const filteredMeals = meals.filter(
          (meal) => meal.mealTime === filterId
        );
        return filteredMeals;
      } else {
        return meals;
      }
    })();
    const dietaryRestrictionAndTimeFilteredMeals = (() => {
      let filterId = '';
      if (dietFilter) {
        filterId = event.target.value;
      } else {
        filterId = filterMealPreferences;
      }
      if (filterId !== 'all') {
        const filteredMeals = timeFilteredMeals.filter((meal) =>
          meal.dietaryRestrictions.find(
            (dietaryRestriction) =>
              dietaryRestriction.dietaryRestrictionId === filterId
          )
        );
        return filteredMeals;
      } else {
        return timeFilteredMeals;
      }
    })();
    setFilteredMeals(dietaryRestrictionAndTimeFilteredMeals);
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
        <Grid item lg={2} md={3} xs={5}>
          <FormControl fullWidth>
            <InputLabel>Meal Time</InputLabel>
            <Select
              label="Meal Time"
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
        <Grid item lg={2} md={3} xs={5}>
          <FormControl fullWidth>
            <InputLabel>Dietary Restrictions</InputLabel>
            <Select
              label="Dietary Restrictions"
              required
              name="filterMealPreferences"
              value={filterMealPreferences}
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
              <SplashMealCard meal={meal} key={i}></SplashMealCard>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
export default SplashMenu;
