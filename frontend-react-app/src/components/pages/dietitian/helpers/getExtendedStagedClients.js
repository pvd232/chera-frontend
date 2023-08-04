import APIClient from '../../../../helpers/APIClient';
import ExtendedStagedClientDTO from '../../../../data_models/dto/ExtendedStagedClientDTO';
import ExtendedStagedClient from '../../../../data_models/model/ExtendedStagedClient';
import MealPlanDTOFactory from '../../../../data_models/factories/dto/MealPlanDTOFactory';
import MealPlanFactory from '../../../../data_models/factories/model/MealPlanFactory';
export const getExtendedStagedClients = async (dietitianId, headers) => {
  const extendedStagedClientData = await APIClient.getExtendedStagedClients(
    dietitianId, headers
  );
  if (extendedStagedClientData) {
    const filteredExtendedStagedClientData = extendedStagedClientData.filter(
      (extendedStagedClient) => extendedStagedClient.account_created === false
    );
    const extendedStagedClientDTOs = filteredExtendedStagedClientData.map(
      (extendedStagedClientJSON) =>
        new ExtendedStagedClientDTO(
          extendedStagedClientJSON,
          new MealPlanDTOFactory()
        )
    );
    // Initializer seperates out MealPlan to accomodate for creation of ExtendedStagedClients in DietitianHome
    const extendedStagedClients = extendedStagedClientDTOs.map(
      (extendedStagedClientDTO) =>
        new ExtendedStagedClient(
          extendedStagedClientDTO,
          extendedStagedClientDTO.mealPlan,
          new MealPlanFactory()
        )
    );
    return extendedStagedClients;
  } else {
    return [];
  }
};
