import { useState, useEffect, cloneElement } from 'react';
import APIClient from '../../../../helpers/APIClient';
import CacheManager from '../../../../helpers/CacheManager';
import MealPlanDTO from '../../../../data_models/dto/MealPlanDTO';
import MealPlan from '../../../../data_models/model/MealPlan';
import ExtendedMealDTOFactory from '../../../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import MealDietaryRestrictionFactory from '../../../../data_models/factories/model/MealDietaryRestrictionFactory';
import ExtendedMeal from '../../../../data_models/model/ExtendedMeal';
import ExtendedMealDTO from '../../../../data_models/dto/ExtendedMealDTO';
import ExtendedMealPlanMealDTO from '../../../../data_models/dto/ExtendedMealPlanMealDTO';
import ExtendedMealPlanDTOFactory from '../../../../data_models/factories/dto/ExtendedMealPlanDTOFactory';
import ExtendedRecipeIngredientDTOFactory from '../../../../data_models/factories/dto/ExtendedRecipeIngredientDTOFactory';
import USDANutrientDailyValueDTOFactory from '../../../../data_models/factories/dto/USDANutrientDailyValueDTOFactory';
import ExtendedRecipeIngredientNutrientDTOFactory from '../../../../data_models/factories/dto/ExtendedRecipeIngredientNutrientDTOFactory';
import CircularProgressPage from '../../../shared_components/CircularProgressPage';
import useAuthHeader from '../../../../helpers/useAuthHeader';

const DietitianMenuContainer = (props) => {
  const [mealPlanMeals, setMealPlanMeals] = useState(false);
  const [mealPlans, setMealPlans] = useState(false);
  const [extendedMeals, setExtendedMeals] = useState(false);

  const authHeader = useAuthHeader();

  useEffect(() => {
    let mounted = true;
    if(authHeader){
      APIClient.getExtendedMeals(authHeader).then((extendedMealData) => {
        if (mounted) {
          const extendedMealDTOs = extendedMealData.map(
            (extendedMealData) =>
              new ExtendedMealDTO(
                extendedMealData,
                new MealDietaryRestrictionDTOFactory()
              )
          );
          const extendedMeals = extendedMealDTOs.map(
            (extendedMealDTO) =>
              new ExtendedMeal(
                extendedMealDTO,
                new MealDietaryRestrictionFactory()
              )
          );
          setExtendedMeals(extendedMeals);
        }
      });
      APIClient.getMealPlans(authHeader).then((mealPlansData) => {
        if (mounted) {
          const mealPlanDTOs = mealPlansData.map(
            (mealPlanData) => new MealPlanDTO(mealPlanData)
          );
          const mealPlans = mealPlanDTOs.map(
            (mealPlanDTO) => new MealPlan(mealPlanDTO)
          );
          setMealPlans(mealPlans);
        }
      });
      Promise.resolve(CacheManager.shared.mealPlanMeals).then((values) => {
        if (mounted) {
          const extendedMealPlanMealDTOs = values.map(
            (extendedMealPlanMealData) =>
              new ExtendedMealPlanMealDTO(
                extendedMealPlanMealData,
                new ExtendedMealDTOFactory(
                  new MealDietaryRestrictionDTOFactory()
                ),
                new ExtendedMealPlanDTOFactory(
                  new USDANutrientDailyValueDTOFactory()
                ),
                new ExtendedRecipeIngredientDTOFactory(
                  new ExtendedRecipeIngredientNutrientDTOFactory()
                ),
                new ExtendedRecipeIngredientNutrientDTOFactory()
              )
          );
          setMealPlanMeals(extendedMealPlanMealDTOs);
        }
      });
    }
    return () => (mounted = false);
  }, [authHeader]);

  if (mealPlans && mealPlanMeals && extendedMeals) {
    const dataProps = {
      mealPlans: mealPlans,
      mealPlanMeals: mealPlanMeals,
      extendedMeals: extendedMeals,
    };
    // Pass the dataProps to the child component
    return cloneElement(props.childComponent, { dataProps: dataProps });
  } else {
    return <CircularProgressPage />;
  }
};
export default DietitianMenuContainer;
