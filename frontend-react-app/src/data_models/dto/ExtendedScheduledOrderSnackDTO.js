import ScheduledOrderSnackDTO from './ScheduledOrderSnackDTO';

export default class ExtendedScheduledOrderSnackDTO extends ScheduledOrderSnackDTO {
  constructor(extendedScheduledOrderSnackDTO, snackDTOFactory) {
    super(extendedScheduledOrderSnackDTO);
    this.associatedSnack = snackDTOFactory.injectInstance(
      extendedScheduledOrderSnackDTO.associated_snack
    );
  }
  get name() {
    return this.associatedSnack.name;
  }
}
