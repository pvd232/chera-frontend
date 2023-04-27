import ScheduleSnackDTO from './ScheduleSnackDTO';

export default class ExtendedScheduleSnackDTO extends ScheduleSnackDTO {
  constructor(extendedScheduleSnackDTO, snackDTOFactory) {
    super(extendedScheduleSnackDTO);
    this.associatedSnack = snackDTOFactory.injectInstance(
      extendedScheduleSnackDTO.associated_snack
    );
  }
  get name() {
    return this.associatedSnack.name;
  }
}
