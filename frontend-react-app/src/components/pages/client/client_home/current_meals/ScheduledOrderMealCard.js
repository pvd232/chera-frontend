import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import scheduledOrderMealCard from './scss/ScheduledOrderMealCard.module.scss';
import { FoodCard } from '../../../../shared_components/FoodCard';
const ScheduledOrderMealCard = (props) => {
  return (
    <FoodCard
      mealName={props.mealData.meal.name}
      mealTime={props.mealData.meal.mealTime}
      mealDescription={props.mealData.meal.description}
      mealImageUrl={props.mealData.meal.imageUrl}
      isSnackCard={false}
      childComponent={
        <Grid
          item
          container
          className={scheduledOrderMealCard.actionsContainer}
        >
          <Grid item className={scheduledOrderMealCard.childContainer}>
            <CardActions>
              <Grid
                container
                className={scheduledOrderMealCard.iconButtonContainer}
              >
                <Grid item>
                  <IconButton
                    id={`remove-${props.mealData.extendedScheduledOrderMeal.id}`}
                    onClick={() =>
                      props.handleRemoveScheduledOrderMeal(props.mealData)
                    }
                    disabled={props.cantMakeChanges}
                    className={
                      props.cantMakeChanges
                        ? scheduledOrderMealCard.iconButton + 'Mui-disabled'
                        : scheduledOrderMealCard.iconButton
                    }
                  >
                    <RemoveCircleIcon className={scheduledOrderMealCard.icon} />
                  </IconButton>
                </Grid>

                <Grid item>
                  <Typography>{props.mealData.quantity} in your box</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    id={`add-${props.mealData.extendedScheduledOrderMeal.id}`}
                    onClick={() =>
                      props.handleAddScheduledOrderMeal(props.mealData)
                    }
                    disabled={props.cantMakeChanges}
                    className={
                      props.cantMakeChanges
                        ? scheduledOrderMealCard.iconButton + 'Mui-disabled'
                        : scheduledOrderMealCard.iconButton
                    }
                  >
                    <AddCircleIcon className={scheduledOrderMealCard.icon} />
                  </IconButton>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      }
    />
  );
};
export default ScheduledOrderMealCard;
