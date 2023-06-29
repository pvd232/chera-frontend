import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import otherMealCard from './scss/OtherMealCard.module.scss';
import { FoodCard } from '../../../../shared_components/FoodCard';

const OtherMealCard = (props) => (
  <FoodCard
    mealName={props.meal.name}
    mealTime={props.meal.mealTime}
    mealDescription={props.meal.description}
    mealImageUrl={props.meal.imageUrl}
    isSnackCard={false}
    childComponent={
      <Grid item container className={otherMealCard.actionsContainer}>
        <Grid item className={otherMealCard.childContainer}>
          <CardActions>
            <Grid container className={otherMealCard.iconButtonContainer}>
              <Button
                variant={'contained'}
                onClick={() => props.handleAddScheduledOrderMeal(props.meal)}
                disabled={props.cantMakeChanges}
                className={
                  props.cantMakeChanges
                    ? otherMealCard.otherMealButtonDisabled
                    : otherMealCard.otherMealButton
                }
              >
                Add meal
              </Button>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
    }
  />
);
export default OtherMealCard;
