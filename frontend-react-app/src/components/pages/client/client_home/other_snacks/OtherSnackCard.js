import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import otherMealCard from '../other_meals/scss/OtherMealCard.module.scss';
import { FoodCard } from '../../../../shared_components/FoodCard';
const OtherSnackCard = (props) => {
  return (
    <FoodCard
      mealName={props.snack.name}
      mealDescription={props.snack.description}
      mealImageUrl={props.snack.imageUrl}
      isSnackCard={true}
      childComponent={
        <Grid item container className={otherMealCard.actionsContainer}>
          <Grid item className={otherMealCard.childContainer}>
            <CardActions>
              <Grid container className={otherMealCard.iconButtonContainer}>
                <Button
                  variant={'outlined'}
                  onClick={() =>
                    props.handleAddScheduledOrderSnack(props.snack)
                  }
                  disabled={props.cantMakeChanges}
                  className={
                    props.cantMakeChanges
                      ? otherMealCard.otherMealButtonDisabled
                      : otherMealCard.otherMealButton
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
