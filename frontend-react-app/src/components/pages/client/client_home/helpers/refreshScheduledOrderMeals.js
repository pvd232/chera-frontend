import APIClient from '../../../../../helpers/APIClient';
import ExtendedMealFactory from '../../../../../data_models/factories/model/ExtendedMealFactory';
import ExtendedMealDTOFactory from '../../../../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedScheduledOrderMeal from '../../../../../data_models/model/ExtendedScheduledOrderMeal';
import ExtendedScheduledOrderMealDTO from '../../../../../data_models/dto/ExtendedScheduledOrderMealDTO';
import MealDietaryRestrictionFactory from '../../../../../data_models/factories/model/MealDietaryRestrictionFactory';

const refreshScheduledOrderMeals = async (mealSubscriptionId, headers) => {
  const extendedScheduledOrderMealsData =
    await APIClient.getExtendedScheduledOrderMeals(mealSubscriptionId, headers);

  const extendedScheduledOrderMealDTOs = extendedScheduledOrderMealsData.map(
    (json) =>
      new ExtendedScheduledOrderMealDTO(
        json,
        new ExtendedMealDTOFactory(new MealDietaryRestrictionDTOFactory())
      )
  );
  const extendedScheduledOrderMeals = extendedScheduledOrderMealDTOs.map(
    (extendedScheduledOrderMealDTO) =>
      ExtendedScheduledOrderMeal.constructFromExtendedScheduledOrderMealDTO(
        extendedScheduledOrderMealDTO,
        new ExtendedMealFactory(new MealDietaryRestrictionFactory())
      )
  );
  return extendedScheduledOrderMeals;
};
export default refreshScheduledOrderMeals;
