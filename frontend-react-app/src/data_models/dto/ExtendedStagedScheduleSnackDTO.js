import StagedScheduleSnackDTO from './StagedScheduleSnackDTO';

export default class ExtendedStagedScheduleSnackDTO extends StagedScheduleSnackDTO {
  constructor(extendedStagedScheduleSnackDTO, snackDTOFactory) {
    super(extendedStagedScheduleSnackDTO);
    this.associatedSnack = snackDTOFactory.injectInstance(
      extendedStagedScheduleSnackDTO.associated_snack
    );
  }
  get name() {
    return this.associatedSnack.name;
  }
}
