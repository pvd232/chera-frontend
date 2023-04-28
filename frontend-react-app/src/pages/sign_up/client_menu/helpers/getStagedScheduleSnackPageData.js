import ExtendedStagedScheduleSnack from '../../../../data_models/model/ExtendedStagedScheduleSnack';
import SnackDTOFactory from '../../../../data_models/factories/dto/SnackDTOFactory';
import SnackFactory from '../../../../data_models/factories/model/SnackFactory';
import StagedScheduleSnackItem from '../../../../ui_data_containers/StagedScheduleSnackItem';

export default function getStagedScheduleSnackPageData(
  extendedStagedScheduleSnackData
) {
  const extendedStagedScheduleSnackDTOs = extendedStagedScheduleSnackData.map(
    (extendedStagedScheduleSnack) =>
      new ExtendedStagedScheduleSnack(
        extendedStagedScheduleSnack,
        new SnackDTOFactory()
      )
  );
  const extendedStagedScheduleSnacks = extendedStagedScheduleSnackDTOs.map(
    (extendedStagedScheduleSnackDTO) => {
      return new ExtendedStagedScheduleSnack(
        extendedStagedScheduleSnackDTO,
        new SnackFactory()
      );
    }
  );
  const stagedScheduleSnackItemsMap = new Map();
  extendedStagedScheduleSnacks.forEach((stagedScheduleSnack) => {
    if (stagedScheduleSnackItemsMap.has(stagedScheduleSnack.mealId)) {
      stagedScheduleSnackItemsMap.get(stagedScheduleSnack.mealId).quantity += 1;
    } else {
      stagedScheduleSnackItemsMap.set(
        stagedScheduleSnack.mealId,
        new StagedScheduleSnackItem(stagedScheduleSnack)
      );
    }
  });
  const returnObject = {
    stagedScheduleSnackItems: Array.from(stagedScheduleSnackItemsMap.values()),
    extendedStagedScheduleSnacks: extendedStagedScheduleSnacks,
  };
  return returnObject;
}
