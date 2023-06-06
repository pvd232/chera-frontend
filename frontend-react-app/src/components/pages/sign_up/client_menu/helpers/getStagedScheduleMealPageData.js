import ExtendedStagedScheduleMeal from '../../../../../data_models/model/ExtendedStagedScheduleMeal';
import ExtendedMealDTOFactory from '../../../../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedMealFactory from '../../../../../data_models/factories/model/ExtendedMealFactory';
import MealDietaryRestrictionFactory from '../../../../../data_models/factories/model/MealDietaryRestrictionFactory';
import StagedScheduleMealItem from '../../../../ui_data_containers/StagedScheduleMealItem';

export default function getStagedScheduleMealPageData(
  extendedStagedScheduleMealData
) {
  const extendedStagedScheduleMealDTOs = extendedStagedScheduleMealData.map(
    (extendedStagedScheduleMeal) =>
      new ExtendedStagedScheduleMeal(
        extendedStagedScheduleMeal,
        new ExtendedMealDTOFactory(new MealDietaryRestrictionDTOFactory())
      )
  );
  const extendedStagedScheduleMeals = extendedStagedScheduleMealDTOs.map(
    (extendedStagedScheduleMealDTO) => {
      return new ExtendedStagedScheduleMeal(
        extendedStagedScheduleMealDTO,
        new ExtendedMealFactory(new MealDietaryRestrictionFactory())
      );
    }
  );
  const stagedScheduleMealItemsMap = new Map();
  extendedStagedScheduleMeals.forEach((stagedScheduleMeal) => {
    if (stagedScheduleMealItemsMap.has(stagedScheduleMeal.mealId)) {
      stagedScheduleMealItemsMap.get(stagedScheduleMeal.mealId).quantity += 1;
    } else {
      stagedScheduleMealItemsMap.set(
        stagedScheduleMeal.mealId,
        new StagedScheduleMealItem(stagedScheduleMeal)
      );
    }
  });
  const returnObject = {
    stagedScheduleMealItems: Array.from(stagedScheduleMealItemsMap.values()),
    extendedStagedScheduleMeals: extendedStagedScheduleMeals,
  };
  return returnObject;
}
