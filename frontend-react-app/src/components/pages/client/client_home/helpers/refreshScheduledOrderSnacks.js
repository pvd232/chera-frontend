import APIClient from '../../../../../helpers/APIClient';
import SnackFactory from '../../../../../data_models/factories/model/SnackFactory';
import SnackDTOFactory from '../../../../../data_models/factories/dto/SnackDTOFactory';
import ExtendedScheduledOrderSnack from '../../../../../data_models/model/ExtendedScheduledOrderSnack';
import ExtendedScheduledOrderSnackDTO from '../../../../../data_models/dto/ExtendedScheduledOrderSnackDTO';
const refreshScheduledOrderSnacks = async (mealSubscriptionId) => {
  const extendedScheduledOrderSnacksData =
    await APIClient.getExtendedScheduledOrderSnacks(mealSubscriptionId);
  if (extendedScheduledOrderSnacksData) {
    const extendedScheduledOrderSnackDTOs =
      extendedScheduledOrderSnacksData.map(
        (json) =>
          new ExtendedScheduledOrderSnackDTO(json, new SnackDTOFactory())
      );
    const extendedScheduledOrderSnacks = extendedScheduledOrderSnackDTOs.map(
      (extendedScheduledOrderSnackDTO) =>
        ExtendedScheduledOrderSnack.constructFromExtendedScheduledOrderSnackDTO(
          extendedScheduledOrderSnackDTO,
          new SnackFactory()
        )
    );
    return extendedScheduledOrderSnacks;
  } else {
    return null;
  }
};
export default refreshScheduledOrderSnacks;
