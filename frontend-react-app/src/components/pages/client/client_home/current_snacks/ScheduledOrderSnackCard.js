import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import logo from '../../../../../static/images/chera_logo_300x300.png';
import scheduledOrderMealCard from '../current_meals/scss/ScheduledOrderMealCard.module.scss';
import { FoodCard } from '../../../../shared_components/FoodCard';

const ScheduledOrderSnackCard = (props) => (
  <FoodCard
    mealName={props.snackData.snack.name}
    mealTime={props.snackData.snack.mealTime}
    mealDescription={props.snackData.snack.description}
    isSnackCard={true}
    logo={logo}
    childComponent={
      <Grid item container className={scheduledOrderMealCard.actionsContainer}>
        <Grid item className={scheduledOrderMealCard.childContainer}>
          <CardActions>
            <Grid
              container
              className={scheduledOrderMealCard.iconButtonContainer}
            >
              <Grid item>
                <IconButton
                  id={`remove-${props.snackData.extendedScheduledOrderSnack.id}`}
                  onClick={() =>
                    props.handleRemoveScheduledOrderSnack(props.snackData)
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
                <Typography>{props.snackData.quantity} in your box</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  id={`add-${props.snackData.extendedScheduledOrderSnack.id}`}
                  onClick={() =>
                    props.handleAddScheduledOrderSnack(props.snackData)
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
export default ScheduledOrderSnackCard;
