export default class ScheduledOrderSnackCardItem {
  constructor(extendedScheduledOrderSnack) {
    this.extendedScheduledOrderSnack = extendedScheduledOrderSnack;
    this.snack = extendedScheduledOrderSnack.associatedSnack;
    this.deliveryDate = extendedScheduledOrderSnack.deliveryDate;
    this.quantity = 1;
  }
}
