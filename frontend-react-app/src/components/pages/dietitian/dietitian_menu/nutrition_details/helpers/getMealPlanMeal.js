import APIClient from '../../../../../../helpers/APIClient';
import { constructMealPlanMealDTO } from './constructMealPlanMealDTO';
export const getMealPlanMeal = async (mealPlanId, mealId) => {
  const mealPlanMealData = await APIClient.getSpecificExtendedMealPlanMeal(
    mealPlanId,
    mealId
  );
  const mealPlanMealDTO = constructMealPlanMealDTO(mealPlanMealData);
  return mealPlanMealDTO;
};
