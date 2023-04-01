import USDAIngredientPortion from '../../model/USDAIngredientPortion';
export default class USDAIngredientPortionFactory {
  injectInstance(USDAIngredientPortionJSON) {
    return new USDAIngredientPortion(USDAIngredientPortionJSON);
  }
}
