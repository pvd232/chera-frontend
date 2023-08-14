import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import {
  Box,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import APIClient from '../../../../helpers/APIClient';
import getFilteredMeals from './helpers/getFilteredMeals';
import { sortFilteredMealPlanMeals } from './helpers/sortFilteredMealPlanMeals';
import { getMealPlanMealsByMeal } from './helpers/getMealPlanMealsByMeal';
import { getMealPlanMealsByMealPlan } from './helpers/getMealPlanMealsByMealPlan';
import { getMealPlanMealsByDietaryRestriction } from './helpers/getMealPlanMealsByDietaryRestriction';
import { mapMealNutrientStatsData } from './helpers/mapMealNutrientStatsData';
import MediaCard from './MediaCard';
import Info from '@mui/icons-material/Info';
import VeggieSwitch from './VeggieSwitch';
const DietitianMenu = (props) => {
  const customTheme = useTheme();
  const [filterMealPlanId, setFilterMealPlanId] = useState(
    props.mealPlans[1].id
  );

  const [vegetarian, setVegetarian] = useState('all');
  const [filteredMealPlanMeals, setFilteredMealPlanMeals] = useState(
    getMealPlanMealsByMealPlan(props.mealPlanMeals).get(filterMealPlanId)
  );

  const [mealsLoading, setMealsLoading] = useState(false);

  const newHandleFilterChange = async (event) => {
    const allMealPlanMeals = props.mealPlanMeals;
    const mealPlanMealsByMealPlan =
      getMealPlanMealsByMealPlan(allMealPlanMeals);
    const mealPlanMealsByMeal = getMealPlanMealsByMeal(allMealPlanMeals);
    const mealPlanMealsByDietaryRestriction =
      getMealPlanMealsByDietaryRestriction(
        props.extendedMeals,
        mealPlanMealsByMeal
      );
    const filterMealParameters = {
      allMealPlanMeals,
      mealPlanMealsByMealPlan,
      mealPlanMealsByDietaryRestriction,
      filterMealPlanId,
      vegetarian,
    };
    if (event.target.name === 'filterMealPlan') {
      setFilterMealPlanId(event.target.value);
      filterMealParameters.filterMealPlanId = event.target.value;
      const mealsLoaded = getFilteredMeals(filterMealParameters);
      if (mealsLoaded) {
        setFilteredMealPlanMeals(mealsLoaded);
      } else {
        setMealsLoading(true);
        const mealPlanMealsData =
          await APIClient.getSpecificMealNutrientStatsObjects(
            event.target.value
          );
        const extendedMealPlanMealDTOs =
          mapMealNutrientStatsData(mealPlanMealsData);
        setFilteredMealPlanMeals(extendedMealPlanMealDTOs);
        setMealsLoading(false);
      }
    } else if (event.target.name === 'filterVegetarian') {
      if (vegetarian === 'all') {
        setVegetarian('vegetarian');
        filterMealParameters.vegetarian = 'vegetarian';
      } else {
        setVegetarian('all');
        filterMealParameters.vegetarian = 'all';
      }
      const mealsLoaded = getFilteredMeals(filterMealParameters);
      setFilteredMealPlanMeals(mealsLoaded);
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
        columnGap={'3vh'}
        sx={{ height: 'min-content' }}
        alignItems={'flex-end'}
      >
        <Grid item>
          <FormControl>
            <InputLabel>Portion Size</InputLabel>
            <Select
              label="Portion Size"
              required
              name="filterMealPlan"
              value={filterMealPlanId}
              onChange={newHandleFilterChange}
            >
              {props.mealPlans.map((mealPlan, i) => (
                <MenuItem value={mealPlan.id} sx={{ fontSize: '12px' }} key={i}>
                  {`${mealPlan.dinnerCalories} kCal`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormGroup>
            <Box
              flexDirection="column"
              display="flex"
              alignItems="center"
              justifyContent={'center'}
            >
              <Box>
                <Typography>Veggie</Typography>
              </Box>
              <FormControlLabel
                control={
                  <VeggieSwitch
                    name="filterVegetarian"
                    checked={vegetarian !== 'all'}
                    value={vegetarian}
                    onChange={newHandleFilterChange}
                  />
                }
                sx={{ marginRight: '0px' }}
              />
            </Box>
          </FormGroup>
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
                      shouldDisplayNutritionDetails={!props.splash}
                    />
                  </Grid>
                );
              }
            )}
          </Grid>
        )}
      </Grid>
      <Grid container item xs={10} mt={'10vh'} mb={'3vh'}>
        <Grid item>
          <Typography
            fontSize={'2rem'}
            textAlign={'center'}
            color={customTheme.palette.olive.main}
          >
            Snacks
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip title={'All snacks are 150-250 kCal'} placement="right">
            <IconButton>
              <Info
                sx={{
                  color: customTheme.palette.olive.main,
                }}
              />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <Grid container item xs={10} paddingTop={'6vh'}>
        <Grid container item spacing={4}>
          {sortFilteredMealPlanMeals(props.mealPlanSnacks).map(
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
                    shouldDisplayNutritionDetails={!props.splash}
                  ></MediaCard>
                </Grid>
              );
            }
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DietitianMenu;
