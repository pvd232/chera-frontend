import APIClient from '../../../../../helpers/APIClient';
import SnackFactory from '../../../../../data_models/factories/model/SnackFactory';
import SnackDTOFactory from '../../../../../data_models/factories/dto/SnackDTOFactory';
import ExtendedScheduledOrderSnack from '../../../../../data_models/model/ExtendedScheduledOrderSnack';
import ExtendedScheduledOrderSnackDTO from '../../../../../data_models/dto/ExtendedScheduledOrderSnackDTO';
// UPDATE IN MORNING 2023-05-11
const refreshScheduledOrderSnacks = async (mealSubscriptionId, headers) => {
  const extendedScheduledOrderSnacksData =
    await APIClient.getExtendedScheduledOrderSnacks(mealSubscriptionId, headers);

  const extendedScheduledOrderSnackDTOs = extendedScheduledOrderSnacksData.map(
    (json) => new ExtendedScheduledOrderSnackDTO(json, new SnackDTOFactory())
  );
  const extendedScheduledOrderSnacks = extendedScheduledOrderSnackDTOs.map(
    (extendedScheduledOrderSnackDTO) =>
      ExtendedScheduledOrderSnack.constructFromExtendedScheduledOrderSnackDTO(
        extendedScheduledOrderSnackDTO,
        new SnackFactory()
      )
  );
  return extendedScheduledOrderSnacks;
};
export default refreshScheduledOrderSnacks;
