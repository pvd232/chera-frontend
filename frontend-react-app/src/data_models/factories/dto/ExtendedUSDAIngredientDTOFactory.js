import USDAIngredientPortionDTO from '../../dto/USDAIngredientPortionDTO';

export default class USDAIngredientPortionDTOFactory {
  injectInstance(USDAIngredientPortionJSON) {
    return new USDAIngredientPortionDTO(USDAIngredientPortionJSON);
  }
}
