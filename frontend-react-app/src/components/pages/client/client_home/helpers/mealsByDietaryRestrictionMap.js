const getMealsByDietaryRestrictionMap = (extendedMeals) => {
  const mealsByDietaryRestrictionMapToReturn = new Map();
  extendedMeals.forEach((meal) => {
    meal.dietaryRestrictions.forEach((dietaryRestriction) => {
      if (
        !mealsByDietaryRestrictionMapToReturn.has(
          dietaryRestriction.dietaryRestrictionId
        )
      ) {
        const mealSet = new Set();
        mealSet.add(meal.id);
        mealsByDietaryRestrictionMapToReturn.set(
          dietaryRestriction.dietaryRestrictionId,
          mealSet
        );
      } else {
        mealsByDietaryRestrictionMapToReturn
          .get(dietaryRestriction.dietaryRestrictionId)
          .add(meal.id);
      }
    });
  });
  return mealsByDietaryRestrictionMapToReturn;
};
export default getMealsByDietaryRestrictionMap;
