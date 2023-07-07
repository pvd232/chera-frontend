import React from 'react';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import logo from '../../../../static/images/chera_logo_300x300.png';
import NutritionDetails from './nutrition_details/NutritionDetails';
import { FoodCard } from '../../../shared_components/FoodCard';
import mediaCard from './scss/MediaCard.module.scss';
import IngredientList from './ingredients/IngredientList';
const MediaCard = React.memo(
  (props) => {
    return (
      <FoodCard
        mealName={props.mealPlanMeal.associatedMeal.name}
        mealTime={props.mealPlanMeal.associatedMeal.mealTime}
        mealDescription={props.mealPlanMeal.associatedMeal.description}
        mealImageUrl={props.mealPlanMeal.associatedMeal.imageUrl}
        logo={logo}
        isSnackCard={false}
        childComponent={
          <Grid item container className={mediaCard.actionsContainer}>
            <Grid container item className={mediaCard.childContainer}>
              <CardActions>
                <Grid container className={mediaCard.iconButtonContainer}>
                  <NutritionDetails
                    mealPlanMeal={props.mealPlanMeal}
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
