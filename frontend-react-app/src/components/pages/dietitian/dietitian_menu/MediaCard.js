import React from 'react';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import NutritionDetails from './nutrition_details/NutritionDetails';
import { FoodCard } from '../../../shared_components/FoodCard';
import mediaCard from './scss/MediaCard.module.scss';
import IngredientList from './ingredients/IngredientList';
const MediaCard = React.memo(
  (props) => {
    return (
      <FoodCard
        mealName={props.name}
        mealTime={props.mealTime}
        mealDescription={props.description}
        mealImageUrl={props.imageUrl}
        isSnackCard={props.isSnackCard ?? false}
        childComponent={
          <Grid item container className={mediaCard.actionsContainer}>
            <Grid container item className={mediaCard.childContainer}>
              <CardActions>
                <Grid container className={mediaCard.iconButtonContainer}>
                  <NutritionDetails
                    mealPlanMeal={props.mealPlanMeal}
                    name={props.name}
                  ></NutritionDetails>
                  <IngredientList
                    ingredientItems={props.mealPlanMeal.recipe}
                  ></IngredientList>
                </Grid>
              </CardActions>
            </Grid>
          </Grid>
        }
      />
    );
  },
  (prevProps, props) => {
    if (prevProps.mealPlanMeal.id !== props.mealPlanMeal.id) {
      return false;
    } else {
      return true;
    }
  }
);
export default MediaCard;
