import ScheduledOrderSnackDTO from '../../dto/ScheduledOrderSnackDTO';
export default class ScheduledOrderSnackDTOFactory {
  injectInstance(scheduledOrderSnackJSON) {
    return new ScheduledOrderSnackDTO(scheduledOrderSnackJSON);
  }
}
