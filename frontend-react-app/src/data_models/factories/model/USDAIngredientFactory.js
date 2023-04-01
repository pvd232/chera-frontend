import USDAIngredient from '../../model/USDAIngredient';
export default class USDAIngredientFactory {
  injectInstance(usdaIngredientJSON) {
    return new USDAIngredient(usdaIngredientJSON);
  }
}
