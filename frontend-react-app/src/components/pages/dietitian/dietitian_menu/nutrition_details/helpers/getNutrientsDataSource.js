import NutrientItem from '../../../../../ui_data_containers/NutrientItem';
export const getNutrientsDataSource = (nutrients) => {
  return Array.from(nutrients.values())
    .map(
      (extendedRecipeIngredientDTO) =>
        new NutrientItem(extendedRecipeIngredientDTO)
    )
    .sort((a, b) => a.name.localeCompare(b.name));
};
