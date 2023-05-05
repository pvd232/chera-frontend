import Grid from '@mui/material/Grid';
import CalendarGrid from './CalendarGrid';
import DeliveryDateUtility from '../../../helpers/DeliveryDateUtility';

const CalendarElement = (props) => (
  <CalendarGrid
    id={`calendarElement${props.deliveryDayIndex}`}
    item
    sx={{
      '&>div': {
        color: `${
          props.deliveryDayIndex === props.selectedDeliveryIndex
            ? props.customTheme.palette.orange.main
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
          ? `solid 2px ${props.customTheme.palette.orange.main}`
          : ''
      }`,
    }}
    onClick={props.handleChangeDeliveryIndex}
  >
    <Grid container direction={'column'} alignItems={'center'} rowSpacing={0.5}>
      <Grid item xs={3} sx={{ fontSize: '1.1rem' }}>
        Sunday
      </Grid>
      <Grid item xs={6} sx={{ fontSize: '1.1rem' }}>
        {`${DeliveryDateUtility.getDeliveryDateFromIndex(
          props.deliveryDayIndex
        ).getDate()}`}
      </Grid>
      <Grid item xs={3} sx={{ fontSize: '1.1rem' }}>
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
