import LocalStorageManager from '../../../../../helpers/LocalStorageManager';

export default function getMeal(meals, index) {
  if (index === 0) {
    return {
      mealId: false,
      mealName: '',
      mealTime: '',
      mealDescription: '',
      isVegetarian: false,
      imageUrl: '',
      mealIngredients: [],
    };
  } else if (index === meals.length + 1) {
    return {
      mealId: LocalStorageManager.shared.savedMealBuilderMeal.mealId,
      mealName: LocalStorageManager.shared.savedMealBuilderMeal.mealName,
      mealTime: LocalStorageManager.shared.savedMealBuilderMeal.mealTime,
      mealDescription:
        LocalStorageManager.shared.savedMealBuilderMeal.mealDescription,
      isVegetarian:
        LocalStorageManager.shared.savedMealBuilderMeal.isVegetarian,
      imageUrl: LocalStorageManager.shared.savedMealBuilderMeal.imageUrl,
      mealIngredients:
        LocalStorageManager.shared.savedMealBuilderMeal.mealIngredients,
    };
  } else {
    // Index is decreased by 1 because the first meal is a blank new meal
    return meals[index - 1];
  }
}
