import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import scheduledOrderMealCard from "../../client/client_home/current_meals/scss/ScheduledOrderMealCard.module.scss";
import { FoodCard } from "../../../shared_components/FoodCard";
import scheduleMealCard from "./scss/ScheduleMealCard.module.scss";
const ScheduleSnackCard = (props) => {
  return (
    <FoodCard
      mealName={props.snackData.snack.name}
      mealTime={props.snackData.snack.mealTime}
      mealDescription={props.snackData.snack.description}
      mealImageUrl={props.snackData.snack.imageUrl}
      isSnackCard={true}
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
              <Typography>{props.snackData.quantity} in your box</Typography>
            </Grid>
          </Grid>
        </Grid>
      }
    />
  );
};
export default ScheduleSnackCard;
