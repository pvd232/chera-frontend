import Grid from '@mui/material/Grid';
import DeliveryDateUtility from '../../../../../helpers/DeliveryDateUtility';
import calendarElement from './scss/CalendarElement.module.scss';
const CalendarElement = (props) => (
  <Grid
    id={`calendarElement${props.deliveryDayIndex}`}
    item
    onClick={props.handleChangeDeliveryIndex}
    xs={3}
    className={
      props.deliveryDayIndex === props.selectedDeliveryIndex
        ? calendarElement.gridColored
        : calendarElement.gridRegular
    }
  >
    <Grid container className={calendarElement.contentContainer}>
      <Grid item className={calendarElement.dateHeader}>
        {`${
          DeliveryDateUtility.weekdays[
            DeliveryDateUtility.getDeliveryDateFromIndex(
              props.deliveryDayIndex
            ).getDay()
          ]
        }`}
      </Grid>
      <Grid item className={calendarElement.dateHeader}>
        {`${DeliveryDateUtility.getDeliveryDateFromIndex(
          props.deliveryDayIndex
        ).getDate()}`}
      </Grid>
      <Grid
        item
        className={
          props.deliveryDayIndex === props.selectedDeliveryIndex
            ? calendarElement.monthContainerColored
            : calendarElement.monthContainerRegular
        }
      >
        {`${
          DeliveryDateUtility.months[
            DeliveryDateUtility.getDeliveryDateFromIndex(
              props.deliveryDayIndex
            ).getMonth()
          ]
        }`}
      </Grid>
    </Grid>
  </Grid>
);
export default CalendarElement;
