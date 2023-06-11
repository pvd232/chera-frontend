import LocalStorageManager from './LocalStorageManager';
export default class DeliveryDateUtility {
  static weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  static months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  static getDeliveryDateFromIndex(deliveryDayIndex) {
    const deliveryDate = new Date(
      LocalStorageManager.shared.upcomingDeliveryDates[deliveryDayIndex]
    );
    return deliveryDate;
  }

  static getCutoffDateFromIndex(deliveryDayIndex) {
    const cutoffDate = new Date(
      LocalStorageManager.shared.upcomingCutoffDates[deliveryDayIndex]
    );
    return cutoffDate;
  }

  static getDeliveryDateForDisplay(deliveryDate) {
    const dayOfWeek = this.weekdays[deliveryDate.getDay()];
    const month = this.months[deliveryDate.getMonth()];
    const date = deliveryDate.getDate();
    const hr = deliveryDate
      .toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .replace(':00', '');
    return `${hr} on ${dayOfWeek}, ${month} ${date}`;
  }
}
