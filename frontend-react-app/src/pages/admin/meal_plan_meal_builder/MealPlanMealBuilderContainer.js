import { useEffect, useState, cloneElement } from 'react';
import APIClient from '../../../helpers/APIClient';
import MealPlanDTO from '../../../data_models/dto/MealPlanDTO';
import MealPlan from '../../../data_models/model/MealPlan';
import MealDietaryRestrictionDTOFactory from '../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedMealDTO from '../../../data_models/dto/ExtendedMealDTO';
import ExtendedMeal from '../../../data_models/model/ExtendedMeal';
import MealDietaryRestrictionFactory from '../../../data_models/factories/model/MealDietaryRestrictionFactory';
import CircularProgressPage from '../../../reusable_ui_components/CircularProgressPage';
const MealPlanMealBuilderContainer = (props) => {
  const [mealPlans, setMealPlans] = useState(false);
  const [meals, setMeals] = useState(false);
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
        setMeals(extendedMeals);
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
  if (mealPlans && meals) {
    const dataProps = {
      mealPlans: mealPlans,
      meals: meals,
    };
    // Pass the dataProps to the child component
    return cloneElement(props.childComponent, { dataProps: dataProps });
  } else {
    return <CircularProgressPage />;
  }
};
export default MealPlanMealBuilderContainer;
