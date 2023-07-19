export const getNutrientsDataSource = (nutrients) => {
  const nutrientItems = Array.from(nutrients.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const filteredNutrientItems = nutrientItems.filter(
    (nutrientItem) =>
      nutrientItem.nutrientId !== 'protein' &&
      nutrientItem.nutrientId !== 'carb' &&
      nutrientItem.nutrientId !== 'fat' &&
      nutrientItem.usdaNutrientDailyValueAmount !== 0
  );
  return filteredNutrientItems;
};
