import Grid from '@mui/material/Grid';
import CalendarElement from './CalendarElement';
import calendarSelector from './scss/CalendarSelector.module.scss';
const CalendarSelector = (props) => (
  <Grid
    container
    item
    lg={4}
    sm={8}
    xs={12}
    className={calendarSelector.container}
  >
    <CalendarElement
      deliveryDayIndex={0}
      selectedDeliveryIndex={props.selectedDeliveryIndex}
      handleChangeDeliveryIndex={() => props.handleChangeDeliveryIndex(0)}
    />

    <CalendarElement
      selectedDeliveryIndex={props.selectedDeliveryIndex}
      deliveryDayIndex={1}
      handleChangeDeliveryIndex={() => props.handleChangeDeliveryIndex(1)}
    />
    <CalendarElement
      selectedDeliveryIndex={props.selectedDeliveryIndex}
      deliveryDayIndex={2}
      handleChangeDeliveryIndex={() => props.handleChangeDeliveryIndex(2)}
    />
    <CalendarElement
      selectedDeliveryIndex={props.selectedDeliveryIndex}
      deliveryDayIndex={3}
      handleChangeDeliveryIndex={() => props.handleChangeDeliveryIndex(3)}
    />
  </Grid>
);
export default CalendarSelector;
