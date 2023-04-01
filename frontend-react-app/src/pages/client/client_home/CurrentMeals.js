import Grid from '@mui/material/Grid';
import ScheduledOrderMealCard from './ScheduledOrderMealCard';

const CurrentMeals = (props) => {
  return (
    <Grid
      container
      item
      lg={10}
      spacing={3}
      marginTop={'3vh'}
      marginBottom={'10vh'}
      justifyContent={'flex-start'}
    >
      {props.currentScheduledOrderMeals.map((scheduledOrderMealCardData, i) => (
        <Grid
          item
          key={`gridChosenScheduledOrderMeal${i}`}
          sx={{
            marginLeft: window.innerWidth < 450 ? 'auto' : '',
            marginRight: window.innerWidth < 450 ? 'auto' : '',
          }}
        >
          <ScheduledOrderMealCard
            mealData={scheduledOrderMealCardData}
            handleAddScheduledOrderMeal={(scheduledOrderMealCardData) =>
              props.handleAddScheduledOrderMeal(scheduledOrderMealCardData)
            }
            handleRemoveScheduledOrderMeal={(scheduledOrderMealCardData) =>
              props.handleRemoveScheduledOrderMeal(scheduledOrderMealCardData)
            }
            key={`clientMeal${i}`}
            cantMakeChanges={props.cantMakeChanges}
          ></ScheduledOrderMealCard>
        </Grid>
      ))}
    </Grid>
  );
};
export default CurrentMeals;
