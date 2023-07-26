import NewNutrientItem from '../../../../../ui_data_containers/NewNutrientItem';

export const newGetNutrientsDataSource = (nutrients) => {
  const nutrientItems = Array.from(nutrients.values())
    .map(
      (extendedRecipeIngredientDTO) =>
        new NewNutrientItem(extendedRecipeIngredientDTO)
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  const filteredNutrientItems = nutrientItems.filter(
    (nutrientItem) =>
      nutrientItem.nutrientId !== 'protein' &&
      nutrientItem.nutrientId !== 'carb' &&
      nutrientItem.nutrientId !== 'fat' &&
      nutrientItem.usdaNutrientDailyValueAmount !== 0
  );
  return filteredNutrientItems;
};
