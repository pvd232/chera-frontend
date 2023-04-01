import RecipeIngredientNutrientDTO from './RecipeIngredientNutrientDTO';
class ExtendedRecipeIngredientNutrientDTO extends RecipeIngredientNutrientDTO {
  constructor(extendedRecipeIngredientNutrientDTO) {
    super(extendedRecipeIngredientNutrientDTO);
    this.nutrientName = extendedRecipeIngredientNutrientDTO.nutrient_name;
    this.nutrientUnit = extendedRecipeIngredientNutrientDTO.nutrient_unit;
    this.usdaNutrientId = extendedRecipeIngredientNutrientDTO.usda_nutrient_id;
  }
  get name() {
    return this.nutrientName;
  }
  get unit() {
    return this.nutrientUnit;
  }
}
export default ExtendedRecipeIngredientNutrientDTO;
