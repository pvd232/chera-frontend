import Grid from '@mui/material/Grid';
import CalendarGrid from './CalendarGrid';
import DeliveryDateUtility from '../../../helpers/DeliveryDateUtility';

const CalendarElement = (props) => (
  <CalendarGrid
    item
    sx={{
      '&>div': {
        color: `${
          props.deliveryDayIndex === props.selectedDeliveryIndex
            ? props.customTheme.palette.olive.main
            : props.customTheme.palette.black.main
        }`,
        fontWeight: `${
          props.deliveryDayIndex === props.selectedDeliveryIndex
            ? 'bold'
            : 'regular'
        }`,
        letterSpacing: `${
          props.deliveryDayIndex === props.selectedDeliveryIndex ? '0.03em' : ''
        }`,
      },
      borderBottom: `${
        props.deliveryDayIndex === props.selectedDeliveryIndex
          ? `solid 2px ${props.customTheme.palette.olive.main}`
          : ''
      }`,
    }}
    onClick={props.handleChangeDeliveryIndex}
  >
    <Grid container direction={'column'} alignItems={'center'}>
      <Grid item xs={3}>
        Sunday
      </Grid>
      <Grid item xs={6}>
        {`${DeliveryDateUtility.getDeliveryDateFromIndex(
          props.deliveryDayIndex
        ).getDate()}`}
      </Grid>
      <Grid item xs={3}>
        {`${
          DeliveryDateUtility.months[
            DeliveryDateUtility.getDeliveryDateFromIndex(
              props.deliveryDayIndex
            ).getMonth()
          ]
        }`}
      </Grid>
    </Grid>
  </CalendarGrid>
);
export default CalendarElement;
