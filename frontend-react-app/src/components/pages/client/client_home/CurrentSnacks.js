import Grid from '@mui/material/Grid';
import ScheduledOrderSnackCard from './ScheduledOrderSnackCard';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const CurrentSnacks = (props) => {
  return (
    <Grid
      container
      item
      lg={10}
      spacing={3}
      marginBottom={'10vh'}
      justifyContent={'flex-start'}
    >
      <Grid item container justifyContent={'flex-start'}>
        <Typography
          fontSize={'1.5rem'}
          textAlign={'center'}
          marginBottom={'5vh'}
          marginTop={'2vh'}
        >
          Snacks
        </Typography>
        {props.cantMakeChanges && !props.isFirstDelivery ? (
          <Grid item>
            <Tooltip
              title="It's too late to make changes to this order. All changes must be made by Wednesday at 10 PM"
              placement="right"
            >
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        ) : props.isFirstDelivery ? (
          <Grid item>
            <Tooltip
              title="Beginning your second week, you can make changes to your order until Wednesday at 10 PM"
              placement="right"
            >
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
      {props.currentScheduledOrderSnacks.map(
        (scheduledOrderSnackCardData, i) => (
          <Grid
            item
            key={`gridChosenScheduledOrderSnack${i}`}
            sx={{
              marginLeft: window.innerWidth < 450 ? 'auto' : '',
              marginRight: window.innerWidth < 450 ? 'auto' : '',
            }}
          >
            <ScheduledOrderSnackCard
              snackData={scheduledOrderSnackCardData}
              handleAddScheduledOrderSnack={(scheduledOrderSnackCardData) =>
                props.handleAddScheduledOrderSnack(scheduledOrderSnackCardData)
              }
              handleRemoveScheduledOrderSnack={(scheduledOrderSnackCardData) =>
                props.handleRemoveScheduledOrderSnack(
                  scheduledOrderSnackCardData
                )
              }
              key={`clientSnack${i}`}
              cantMakeChanges={props.cantMakeChanges}
            ></ScheduledOrderSnackCard>
          </Grid>
        )
      )}
    </Grid>
  );
};
export default CurrentSnacks;
