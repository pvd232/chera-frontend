import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import capitalize from '../../../helpers/capitalize';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import APIClient from '../../../helpers/APIClient';
import ScheduleMeal from '../../../data_models/model/ScheduleMeal';
import ScheduleMealDTO from '../../../data_models/dto/ScheduleMealDTO';
import ScheduledOrderMealDTO from '../../../data_models/dto/ScheduledOrderMealDTO';
import ExtendedScheduleMeal from '../../../data_models/model/ExtendedScheduleMeal';
import ExtendedMealFactory from '../../../data_models/factories/model/ExtendedMealFactory';
import MealDietaryRestrictionFactory from '../../../data_models/factories/model/MealDietaryRestrictionFactory';
import createScheduledOrderMeals from './helpers/createScheduledOrderMeals';
import SideBar from './SideBar';
import MediaCard from './MediaCard';

const ClientMenu = (props) => {
  const customTheme = useTheme();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(true);
  const [filterMealTime, setFilterMealTime] = useState('all');
  const [filterMealPreferences, setFilterMealPreferences] = useState('all');
  const [extendedMeals, setExtendedMeals] = useState(props.extendedMeals);
  const [chosenScheduleMeals, setChosenScheduleMeals] = useState([]);
  const mealTimes = ['breakfast', 'lunch', 'dinner'];
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

  const timer = useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, [props.editMeals]);

  const handleFilterChange = (event) => {
    // Meal time filter selected
    if (event.target.name === 'filterMealTime') {
      setFilterMealTime(event.target.value);
      // No meal time filter
      if (event.target.value === 'all') {
        // No meal time and no dietary restriction filter
        if (filterMealPreferences === 'all') {
          setExtendedMeals(props.extendedMeals);
        } else {
          // No meal time filter, dietary restriction filter
          const filteredExtendedMeals = props.extendedMeals.filter(
            (extendedMeal) =>
              mealsByDietaryRestrictionMap
                .get(filterMealPreferences)
                .has(extendedMeal.id)
          );
          setExtendedMeals(filteredExtendedMeals);
        }
      } else {
        // Meal time filter
        if (filterMealPreferences === 'all') {
          // Meal time filter, no dietary restriction filter
          const filteredExtendedMeals = props.extendedMeals.filter(
            (extendedMeal) =>
              mealsByMealTimeMap.get(event.target.value).has(extendedMeal.id)
          );
          setExtendedMeals(filteredExtendedMeals);
        } else {
          const timeFilteredExtendedMeals = props.extendedMeals.filter(
            (extendedMeal) =>
              mealsByMealTimeMap.get(event.target.value).has(extendedMeal.id)
          );
          const filteredExtendedMeals = timeFilteredExtendedMeals.filter(
            (extendedMeal) =>
              mealsByDietaryRestrictionMap
                .get(filterMealPreferences)
                .has(extendedMeal.id)
          );
          // Meal time and dietary restriction filter
          setExtendedMeals(filteredExtendedMeals);
        }
      }
    }
    // Dietary restriction filter selected
    else {
      setFilterMealPreferences(event.target.value);
      // No dietary restriction filter
      if (event.target.value === 'all') {
        // No dietary restriction nor meal time filter
        if (filterMealTime === 'all') {
          setExtendedMeals(props.extendedMeals);
        } else {
          // No dietary restriction filter, meal time filter
          const filteredExtendedMeals = props.extendedMeals.filter(
            (extendedMeal) =>
              mealsByMealTimeMap.get(filterMealTime).has(extendedMeal.id)
          );
          setExtendedMeals(filteredExtendedMeals);
        }
      } else {
        // Dietary restriction filter
        if (filterMealTime === 'all') {
          // Dietary restriction filter and no meal time filter
          const filteredExtendedMeals = props.extendedMeals.filter(
            (extendedMeal) =>
              mealsByDietaryRestrictionMap
                .get(event.target.value)
                .has(extendedMeal.id)
          );
          setExtendedMeals(filteredExtendedMeals);
        } else {
          // Dietary restriction and meal time filter
          const timeFilteredExtendedMeals = props.extendedMeals.filter(
            (extendedMeal) =>
              mealsByMealTimeMap.get(filterMealTime).has(extendedMeal.id)
          );
          const filteredExtendedMeals = timeFilteredExtendedMeals.filter(
            (extendedMeal) =>
              mealsByDietaryRestrictionMap
                .get(event.target.value)
                .has(extendedMeal.id)
          );
          setExtendedMeals(filteredExtendedMeals);
        }
      }
    }
  };

  const handleAddMeal = (meal) => {
    setChosenScheduleMeals((prevChosenMeal) => {
      const newScheduleMeal = ScheduleMeal.initializeFromMeal(
        uuid(),
        meal.id,
        props.mealSubscriptionId
      );
      const newExtendedScheduleMeal =
        ExtendedScheduleMeal.constructFromScheduleMeal(
          newScheduleMeal,
          meal,
          new ExtendedMealFactory(new MealDietaryRestrictionFactory())
        );
      return [...prevChosenMeal, newExtendedScheduleMeal];
    });
  };
  const handleRemoveMeal = (scheduleMeal) => {
    setChosenScheduleMeals((prevChosenMeal) =>
      prevChosenMeal.filter((prevScheduleMeal) => {
        return prevScheduleMeal.id !== scheduleMeal.id;
      })
    );
  };
  const handleSubmit = async () => {
    setEditing(false);
    if (chosenScheduleMeals.length < 6) {
      return false;
    }
    if (!loading) {
      setLoading(true);
    }
    if (!props.dietitianChoosingClientMeals) {
      // Client choosing meals
      const scheduledOrderMeals = createScheduledOrderMeals(
        chosenScheduleMeals,
        props.editMeals && !props.canChangeFirstWeek ? false : true
      );
      if (props.editMeals) {
        await APIClient.deleteScheduleMeals(
          LocalStorageManager.shared.clientMealSubscription.id
        );
        await APIClient.deleteScheduledOrderMeals(
          LocalStorageManager.shared.clientMealSubscription.id
        );
        const scheduleMealDTOs = chosenScheduleMeals.map((scheduleMeal) =>
          ScheduleMealDTO.initializeFromScheduleMeal(scheduleMeal)
        );
        await APIClient.createScheduleMeals(scheduleMealDTOs);

        const scheduledOrderMealDTOs = scheduledOrderMeals.map(
          (scheduledOrderMeal) =>
            ScheduledOrderMealDTO.initializeFromScheduledOrderMeal(
              scheduledOrderMeal
            )
        );

        await APIClient.createScheduledOrderMeals(scheduledOrderMealDTOs);
        await APIClient.updateStripeSubscription(
          LocalStorageManager.shared.clientMealSubscription.id,
          chosenScheduleMeals.length
        );
        timer.current = window.setTimeout(() => {
          setLoading(false);
          props.finishEditing();
        }, 500);
      } else {
        const scheduledOrderMeals =
          createScheduledOrderMeals(chosenScheduleMeals);

        timer.current = window.setTimeout(() => {
          setLoading(false);
          LocalStorageManager.shared.taskIndex += 1;
          props.updateMealsData(chosenScheduleMeals, scheduledOrderMeals);
        }, 500);
      }
    } else {
      // Dietitian choosing meals
      props.onSubmit(chosenScheduleMeals);
    }
  };

  return (
    <Grid
      container
      paddingLeft={'2vw'}
      paddingRight={'2vw'}
      paddingBottom={'10vh'}
      // Removes extra 'purple' space in view layout in chrome dev tools.
      alignItems="flex-start"
      paddingTop="3vh"
      backgroundColor={customTheme.palette.olive.quaternary}
    >
      {/* Meals Cards */}
      <Grid
        container
        item
        md={8.5}
        lg={9.5}
        xs={12}
        spacing={4}
        marginBottom={customTheme.smallerScreen() ? '6vh' : ''}
        justifyContent={'center'}
        sx={{
          borderRight: `solid 2px ${customTheme.palette.lightGrey.main}`,
        }}
      >
        <Grid
          item
          container
          xs={12}
          spacing={2}
          sx={{ height: 'min-content' }}
          marginBottom="5vh"
        >
          <Grid item lg={2} md={3} xs={5.5}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: customTheme.palette.black.main,
                  fontWeight: 'bold',
                }}
              >
                Meal Time
              </InputLabel>
              <Select
                label="Meal Category"
                required
                name="filterMealTime"
                value={filterMealTime}
                onChange={handleFilterChange}
              >
                {mealTimes.map((mealTime, i) => (
                  <MenuItem key={`mealTimeMenuItem${i}`} value={mealTime}>
                    {capitalize(mealTime)}
                  </MenuItem>
                ))}
                {<MenuItem value={'all'}>All</MenuItem>}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={2} md={3} xs={5.5}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  fontWeight: 'bold',
                  color: customTheme.palette.black.main,
                }}
              >
                Preferences
              </InputLabel>
              <Select
                label="Preferences"
                required
                name="filterMealPreferences"
                value={filterMealPreferences}
                onChange={handleFilterChange}
              >
                <MenuItem value={'vegetarian'}>Vegetarian</MenuItem>
                <MenuItem value={'all'}>All</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={4} md={6} xs={8}>
            <FormHelperText
              hidden={!editing && chosenScheduleMeals.length < 6 ? false : true}
              error={true}
              sx={{
                fontSize: '1rem',
              }}
            >
              {`You must select a minimum of 6 meals. Please add ${
                6 - chosenScheduleMeals.length
              } more`}
            </FormHelperText>
          </Grid>
        </Grid>
        <Grid container item spacing={7}>
          {extendedMeals.map((extendedMeal, i) => (
            <Grid item key={`mealGridItem${i}`} md={4}>
              {MediaCard({
                key: `mealMediaCard${i}`,
                meal: extendedMeal,
                index: i,
                handleAddMeal: (meal) => handleAddMeal(meal),
              })}
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* Meals Cards */}

      {/* Side Bar */}
      <Grid item lg={2.5} md={3.5} xs={12} sx={{ marginTop: '0vh' }}>
        <SideBar
          chosenScheduleMeals={chosenScheduleMeals}
          handleSubmit={handleSubmit}
          handleAddMeal={(newMeal) => handleAddMeal(newMeal)}
          handleRemoveMeal={(removedMeal) => handleRemoveMeal(removedMeal)}
          customTheme={customTheme}
          loading={loading}
          editMeals={props.editMeals}
        />
      </Grid>
      {/* Side Bar */}
    </Grid>
  );
};
export default ClientMenu;
