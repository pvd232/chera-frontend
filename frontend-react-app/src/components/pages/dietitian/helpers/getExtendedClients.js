import APIClient from '../../../../helpers/APIClient';
import ExtendedClientDTO from '../../../../data_models/dto/ExtendedClientDTO';
import ExtendedClient from '../../../../data_models/model/ExtendedClient';
import MealPlanDTOFactory from '../../../../data_models/factories/dto/MealPlanDTOFactory';
import MealPlanFactory from '../../../../data_models/factories/model/MealPlanFactory';
export const getExtendedClients = async (dietitianId, headers) => {
  const extendedClientData = await APIClient.getExtendedClients(dietitianId, headers);
  if (extendedClientData) {
    const extendedClientArray = [];
    const clientMap = new Map();
    for (const client of extendedClientData) {
      const newClientDTO = new ExtendedClientDTO(
        client,
        new MealPlanDTOFactory()
      );
      const newClient = new ExtendedClient(newClientDTO, new MealPlanFactory());
      extendedClientArray.push(newClient);
      clientMap.set(newClient.id, newClient);
    }
    return {
      clientArray: extendedClientArray,
      clientMap: clientMap,
    };
  } else {
    return {
      clientArray: [],
      clientMap: new Map(),
    };
  }
};
