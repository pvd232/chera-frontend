import logo from '../../../static/images/bendito-small.png';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';

const ScheduledOrderSnackCard = (props) => {
  console.log('props', props);
  return (
    <Card
      sx={{
        maxWidth: 350,
        height: '100%',
        maxHeight: 450,
        position: 'relative',
        marginBottom: '8vh',
      }}
    >
      <CardMedia
        component="img"
        src={logo}
        alt="green iguana"
        sx={{
          width: '50%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          fontSize={'1rem'}
          fontWeight={'500'}
          component="div"
        >
          {props.snackData.snack.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.snackData.snack.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          container
          justifyContent={'space-around'}
          sx={{
            position: 'absolute',
            bottom: '4vh',
          }}
        >
          <Grid item>
            <IconButton
              id={`remove-${props.snackData.extendedScheduledOrderSnack.id}`}
              onClick={() =>
                props.handleRemoveScheduledOrderSnack(props.snackData)
              }
              disabled={props.cantMakeChanges}
              sx={{
                transform: 'scale(1.8)',
                cursor: 'pointer',
                color: 'rgba(0, 0, 0, 1)',
              }}
            >
              <RemoveCircleIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <Typography fontSize={'1rem'}>
              {props.snackData.quantity} in your box
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              id={`add-${props.snackData.extendedScheduledOrderSnack.id}`}
              onClick={() =>
                props.handleAddScheduledOrderSnack(props.snackData)
              }
              disabled={props.cantMakeChanges}
              sx={{
                transform: 'scale(1.8)',
                cursor: 'pointer',
                color: 'rgba(0, 0, 0, 1)',
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default ScheduledOrderSnackCard;
