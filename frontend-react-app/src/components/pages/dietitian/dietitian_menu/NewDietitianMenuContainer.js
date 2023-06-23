import { useState, useEffect, cloneElement } from 'react';
import APIClient from '../../../../helpers/APIClient';
import MealPlanDTO from '../../../../data_models/dto/MealPlanDTO';
import MealPlan from '../../../../data_models/model/MealPlan';
import MealDietaryRestrictionDTOFactory from '../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import MealDietaryRestrictionFactory from '../../../../data_models/factories/model/MealDietaryRestrictionFactory';
import ExtendedMeal from '../../../../data_models/model/ExtendedMeal';
import ExtendedMealDTO from '../../../../data_models/dto/ExtendedMealDTO';
import CircularProgressPage from '../../../shared_components/CircularProgressPage';
// Testing this still

const DietitianMenuContainer = (props) => {
  const [mealPlans, setMealPlans] = useState(false);
  const [extendedMeals, setExtendedMeals] = useState(false);
  useEffect(() => {
    let mounted = true;
    APIClient.getExtendedMeals().then((extendedMealData) => {
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
    APIClient.getMealPlans().then((mealPlansData) => {
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

    return () => (mounted = false);
  }, []);

  if (mealPlans && extendedMeals) {
    const dataProps = {
      mealPlans: mealPlans,
      extendedMeals: extendedMeals,
    };
    // Pass the dataProps to the child component
    return cloneElement(props.childComponent, { dataProps: dataProps });
  } else {
    return <CircularProgressPage />;
  }
};
export default DietitianMenuContainer;
