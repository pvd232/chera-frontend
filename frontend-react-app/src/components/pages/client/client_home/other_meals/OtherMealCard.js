import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import logo from '../../../../../static/images/chera_logo_300x300.png';
import scheduledOrderMealCard from '../current_meals/scss/ScheduledOrderMealCard.module.scss';
import { FoodCard } from '../../../../shared_components/FoodCard';

const OtherMealCard = (props) => (
  <FoodCard
    mealName={props.meal.name}
    mealTime={props.meal.mealTime}
    mealDescription={props.meal.description}
    logo={logo}
    isSnackCard={false}
    childComponent={
      <Grid item container className={scheduledOrderMealCard.actionsContainer}>
        <Grid item className={scheduledOrderMealCard.childContainer}>
          <CardActions>
            <Grid
              container
              className={scheduledOrderMealCard.iconButtonContainer}
            >
              <Button
                variant={'outlined'}
                onClick={() => props.handleAddScheduledOrderMeal(props.meal)}
                className={scheduledOrderMealCard.otherMealButton}
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
