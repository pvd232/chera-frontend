import APIClient from '../../../../../helpers/APIClient';
import { constructMealPlanSnackDTO } from './constructMealPlanSnackDTO';
export const getMealPlanSnack = async (mealPlanId, mealId) => {
  const mealPlanSnackData = await APIClient.getSpecificExtendedMealPlanSnack(
    mealPlanId,
    mealId
  );
  const mealPlanSnackDTO = constructMealPlanSnackDTO(mealPlanSnackData);
  return mealPlanSnackDTO;
};
