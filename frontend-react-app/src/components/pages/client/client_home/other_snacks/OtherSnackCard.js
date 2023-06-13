import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import logo from '../../../../../static/images/chera_logo_300x300.png';
import scheduledOrderMealCard from '../current_meals/scss/ScheduledOrderMealCard.module.scss';
const OtherSnackCard = (props) => {
  return (
    <Card className={scheduledOrderMealCard.card}>
      <CardMedia
        component="img"
        src={logo}
        alt="green iguana"
        className={scheduledOrderMealCard.img}
      />
      <CardContent>
        <Typography gutterBottom>{props.snack.name}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {props.snack.description}
        </Typography>
      </CardContent>
      <Grid item container className={scheduledOrderMealCard.actionsContainer}>
        <Grid item className={scheduledOrderMealCard.childContainer}>
          <CardActions>
            <Grid
              container
              className={scheduledOrderMealCard.iconButtonContainer}
            >
              <Button
                variant={'outlined'}
                onClick={() => props.handleAddScheduledOrderSnack(props.snack)}
                className={scheduledOrderMealCard.otherMealButton}
              >
                Add snack
              </Button>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
export default OtherSnackCard;
