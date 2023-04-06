import LocalStorageManager from '../../../../helpers/LocalStorageManager';

export default function getMeal(meals, index) {
  console.log('meals', meals.length);
  console.log('index', index);
  if (index === meals.length + 1) {
    console.log(
      'LocalStorageManager.shared.savedMealBuilderMeal',
      LocalStorageManager.shared.savedMealBuilderMeal
    );
    return {
      mealId: LocalStorageManager.shared.savedMealBuilderMeal.mealId,
      mealName: LocalStorageManager.shared.savedMealBuilderMeal.mealName,
      mealTime: LocalStorageManager.shared.savedMealBuilderMeal.mealTime,
      mealDescription:
        LocalStorageManager.shared.savedMealBuilderMeal.mealDescription,
      mealPrice: LocalStorageManager.shared.savedMealBuilderMeal.mealPrice,
      isVegetarian:
        LocalStorageManager.shared.savedMealBuilderMeal.isVegetarian,
      imageUrl: LocalStorageManager.shared.savedMealBuilderMeal.imageUrl,
      mealIngredients:
        LocalStorageManager.shared.savedMealBuilderMeal.mealIngredients,
    };
  } else if (meals.length === 0 || index === meals.length) {
    return {
      mealId: false,
      mealName: '',
      mealTime: '',
      mealDescription: '',
      mealPrice: '',
      isVegetarian: false,
      imageUrl: '',
      mealIngredients: [],
    };
  } else {
    return meals[index];
  }
}
