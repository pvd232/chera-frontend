import { v4 as uuid } from 'uuid';
import MealDTO from '../../../../data_models/dto/MealDTO';
import MealDietaryRestrictionDTO from '../../../../data_models/dto/MealDietaryRestrictionDTO';

export default function createMealData(
  mealId,
  dietaryRestrictions,
  mealName,
  mealTime,
  mealPrice,
  mealDescription,
  isVegetarian
) {
  const newMealDietaryRestriction = (() => {
    if (isVegetarian) {
      return new MealDietaryRestrictionDTO({
        id: uuid(),
        dietary_restriction_id: dietaryRestrictions[0].id,
        meal_id: mealId,
      });
    }
    return null;
  })();
  const newMeal = new MealDTO({
    id: mealId,
    name: mealName,
    meal_time: mealTime,
    price: mealPrice,
    description: mealDescription,
    active: true,
  });
  return [newMeal, newMealDietaryRestriction];
}
