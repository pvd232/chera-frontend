import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import scheduledOrderMealCard from '../../client/client_home/current_meals/scss/ScheduledOrderMealCard.module.scss';
import { FoodCard } from '../../../shared_components/FoodCard';
import scheduleMealCard from './scss/ScheduleMealCard.module.scss';
const ScheduleMealCard = (props) => {
  return (
    <FoodCard
      mealName={props.mealData.name}
      mealTime={props.mealData.mealTime}
      mealDescription={props.mealData.description}
      mealImageUrl={props.mealData.imageUrl}
      isSnackCard={false}
      childComponent={
        <Grid
          container
          item
          className={scheduledOrderMealCard.actionsContainer}
        >
          <Grid
            container
            item
            className={scheduledOrderMealCard.childContainer}
          >
            <Grid container item className={scheduleMealCard.contentContainer}>
              <Typography>{props.mealData.quantity} meals</Typography>
            </Grid>
          </Grid>
        </Grid>
      }
    />
  );
};
export default ScheduleMealCard;
