import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import logo from '../../../../../static/images/chera_logo_300x300.png';
import scheduledOrderMealCard from '../current_meals/scss/ScheduledOrderMealCard.module.scss';
import { FoodCard } from '../../../../shared_components/FoodCard';
const OtherSnackCard = (props) => {
  return (
    <FoodCard
      mealName={props.snack.name}
      mealTime={props.snack.mealTime}
      mealDescription={props.snack.description}
      logo={logo}
      isSnackCard={true}
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
                <Button
                  variant={'outlined'}
                  onClick={() =>
                    props.handleAddScheduledOrderSnack(props.snack)
                  }
                  disabled={props.cantMakeChanges}
                  className={
                    props.cantMakeChanges
                      ? scheduledOrderMealCard.otherMealButtonDisabled
                      : scheduledOrderMealCard.otherMealButton
                  }
                >
                  Add snack
                </Button>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      }
    />
  );
};
export default OtherSnackCard;
