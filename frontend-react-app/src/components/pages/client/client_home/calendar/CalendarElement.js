import Grid from '@mui/material/Grid';
import DeliveryDateUtility from '../../../../../helpers/DeliveryDateUtility';
import calendarElement from './scss/CalendarElement.module.scss';
import { Typography } from '@mui/material';
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
        <Typography>
          {`${
            DeliveryDateUtility.weekdays[
              DeliveryDateUtility.getDeliveryDateFromIndex(
                props.deliveryDayIndex
              ).getDay()
            ]
          }`}
        </Typography>
      </Grid>
      <Grid item className={calendarElement.dateHeader}>
        <Typography>
          {`${DeliveryDateUtility.getDeliveryDateFromIndex(
            props.deliveryDayIndex
          ).getDate()}`}
        </Typography>
      </Grid>
      <Grid
        item
        className={
          props.deliveryDayIndex === props.selectedDeliveryIndex
            ? calendarElement.monthContainerColored
            : calendarElement.monthContainerRegular
        }
      >
        <Typography>
          {`${
            DeliveryDateUtility.months[
              DeliveryDateUtility.getDeliveryDateFromIndex(
                props.deliveryDayIndex
              ).getMonth()
            ]
          }`}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);
export default CalendarElement;
