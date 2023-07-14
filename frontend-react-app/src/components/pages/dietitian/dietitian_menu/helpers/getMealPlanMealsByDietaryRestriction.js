export const getMealPlanMealsByDietaryRestriction = (
  extendedMeals,
  mealPlanMealsByMeal
) => {
  const mealPlansByDietaryRestrictionMap = new Map();
  extendedMeals.forEach((meal) => {
    meal.dietaryRestrictions.forEach((dietaryRestriction) => {
      const mealPlanMealsAssociated = mealPlanMealsByMeal.get(meal.id);
      if (
        mealPlansByDietaryRestrictionMap.has(
          dietaryRestriction.dietaryRestrictionId
        )
      ) {
        mealPlansByDietaryRestrictionMap.set(
          dietaryRestriction.dietaryRestrictionId,
          [
            ...mealPlansByDietaryRestrictionMap.get(
              dietaryRestriction.dietaryRestrictionId
            ),
            ...mealPlanMealsAssociated,
          ]
        );
      } else {
        mealPlansByDietaryRestrictionMap.set(
          dietaryRestriction.dietaryRestrictionId,
          [...mealPlanMealsAssociated]
        );
      }
    });
  });
  return mealPlansByDietaryRestrictionMap;
};
