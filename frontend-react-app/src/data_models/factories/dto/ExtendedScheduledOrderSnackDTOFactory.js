import ExtendedScheduledOrderSnackDTO from '../../dto/ExtendedScheduledOrderSnackDTO';
export default class ExtendedScheduledOrderSnackDTOFactory {
  constructor(snackDTOFactory) {
    this.snackDTOFactory = snackDTOFactory;
  }
  injectInstance(extendedScheduledOrderSnackJSON) {
    return new ExtendedScheduledOrderSnackDTO(
      extendedScheduledOrderSnackJSON,
      this.snackDTOFactory
    );
  }
}
