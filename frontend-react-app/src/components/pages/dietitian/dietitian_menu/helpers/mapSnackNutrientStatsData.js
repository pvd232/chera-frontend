import SnackDTOFactory from '../../../../../data_models/factories/dto/SnackDTOFactory';
import NutrientDailyValueDTOFactory from '../../../../../data_models/factories/dto/NutrientDailyValueDTOFactory';
import SnackNutrientStatsDTO from '../../../../../data_models/dto/SnackNutrientStatsDTO';

export const mapSnackNutrientStatsData = async (snackNutrientStatsData) => {
  return snackNutrientStatsData.map(
    (snackNutrientStatsData) =>
      new SnackNutrientStatsDTO(
        snackNutrientStatsData,
        new NutrientDailyValueDTOFactory(),
        new SnackDTOFactory()
      )
  );
};
