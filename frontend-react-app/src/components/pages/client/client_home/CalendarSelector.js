import Grid from '@mui/material/Grid';
import CalendarElement from './CalendarElement';
const CalendarSelector = (props) => (
  <Grid
    container
    item
    lg={4}
    xs={10}
    alignItems={'center'}
    justifyContent={'space-around'}
    marginTop={'2vh'}
  >
    <CalendarElement
      customTheme={props.customTheme}
      deliveryDayIndex={0}
      selectedDeliveryIndex={props.selectedDeliveryIndex}
      handleChangeDeliveryIndex={() => props.handleChangeDeliveryIndex(0)}
    />

    <CalendarElement
      customTheme={props.customTheme}
      selectedDeliveryIndex={props.selectedDeliveryIndex}
      deliveryDayIndex={1}
      handleChangeDeliveryIndex={() => props.handleChangeDeliveryIndex(1)}
    />
    <CalendarElement
      customTheme={props.customTheme}
      selectedDeliveryIndex={props.selectedDeliveryIndex}
      deliveryDayIndex={2}
      handleChangeDeliveryIndex={() => props.handleChangeDeliveryIndex(2)}
    />
    <CalendarElement
      customTheme={props.customTheme}
      selectedDeliveryIndex={props.selectedDeliveryIndex}
      deliveryDayIndex={3}
      handleChangeDeliveryIndex={() => props.handleChangeDeliveryIndex(3)}
    />
  </Grid>
);
export default CalendarSelector;
