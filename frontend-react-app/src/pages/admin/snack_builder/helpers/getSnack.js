import LocalStorageManager from '../../../../helpers/LocalStorageManager';

export default function getSnack(snacks, index) {
  if (index === 0) {
    return {
      snackId: false,
      snackName: '',
      snackDescription: '',
      snackPrice: '',
      imageUrl: '',
      snackIngredients: [],
    };
  } else if (index === snacks.length + 1) {
    return {
      snackId: LocalStorageManager.shared.savedMealBuilderSnack.snackId,
      snackName: LocalStorageManager.shared.savedMealBuilderSnack.snackName,
      snackDescription:
        LocalStorageManager.shared.savedMealBuilderSnack.snackDescription,
      snackPrice: LocalStorageManager.shared.savedMealBuilderSnack.snackPrice,
      imageUrl: LocalStorageManager.shared.savedMealBuilderSnack.imageUrl,
      snackIngredients:
        LocalStorageManager.shared.savedMealBuilderSnack.snackIngredients,
    };
  } else {
    // Index is decreased by 1 because the first snack is a blank new snack
    return snacks[index - 1];
  }
}
