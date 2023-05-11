import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import OtherMealCard from './OtherMealCard';
import capitalize from '../../../helpers/capitalize';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import LocalStorageManager from '../../../helpers/LocalStorageManager';

const OtherMeals = (props) => {
  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        background: `${props.customTheme.palette.lightGrey.secondary}`,
        borderTop: `solid 2px ${props.customTheme.palette.lightGrey.secondary}`,
      }}
      py={5}
      justifyContent={'center'}
    >
      <Grid
        container
        item
        lg={10}
        spacing={3}
        paddingTop={'3vh'}
        paddingBottom={'1vh'}
        justifyContent={'flex-start'}
      >
        <Grid item container>
          <Typography
            fontSize={'2rem'}
            fontWeight={'500'}
            component="div"
            paddingBottom={'3vh'}
          >
            Other meals to choose from
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          spacing={2}
          marginTop={'2vh'}
          marginBottom={'4vh'}
        >
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
        {props.otherMeals.map((otherMeal, i) => (
          <Grid
            item
            key={`grid-${i}`}
            sx={{
              marginLeft: window.innerWidth < 450 ? 'auto' : '',
              marginRight: window.innerWidth < 450 ? 'auto' : '',
            }}
          >
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
