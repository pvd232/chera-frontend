import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import LocalStorageManager from '../../../../../helpers/LocalStorageManager';
import capitalize from '../../../../../helpers/capitalize';
import OtherMealCard from './OtherMealCard';
import otherMeals from './scss/OtherMeals.module.scss';
const OtherMeals = (props) => {
  return (
    <Grid container item className={otherMeals.container}>
      <Grid item>
        <Typography fontSize={'2rem'}>Other meals to choose from</Typography>
      </Grid>
      <Grid item container className={otherMeals.filterContainer}>
        <Grid item lg={2} xs={5.5}>
          <FormControl fullWidth>
            <InputLabel>Meal Category</InputLabel>
            <Select
              label="Meal Category"
              required
              name="filterMealTime"
              value={props.filterMealTime}
              onChange={props.handleFilterChange}
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
        <Grid item lg={2} xs={5.5}>
          <FormControl fullWidth>
            <InputLabel>Preferences</InputLabel>
            <Select
              label="Preferences"
              required
              name="filterMealPreferences"
              value={props.filterMealPreferences}
              onChange={props.handleFilterChange}
            >
              <MenuItem value={'vegetarian'}>Vegetarian</MenuItem>
              <MenuItem value={'all'}>All</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <Grid item container className={otherMeals.mealCardsContainer}>
        {props.otherMeals.map((otherMeal, i) => (
          <Grid item key={`grid-${i}`} className={otherMeals.cardContainer}>
            <OtherMealCard
              key={`otherMealCard-${i}`}
              meal={otherMeal}
              handleAddScheduledOrderMeal={(meal) =>
                props.handleAddScheduledOrderMeal(meal)
              }
              handleRemoveScheduledOrderMeal={(meal) =>
                props.handleRemoveScheduledOrderMeal(meal)
              }
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default OtherMeals;
