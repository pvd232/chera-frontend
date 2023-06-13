import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import capitalize from '../../../../../helpers/capitalize';
import logo from '../../../../../static/images/chera_logo_300x300.png';
import scheduledOrderMealCard from '../current_meals/scss/ScheduledOrderMealCard.module.scss';

const OtherMealCard = (props) => (
  <Card className={scheduledOrderMealCard.card}>
    <CardMedia
      component="img"
      src={logo}
      alt="other meal image"
      className={scheduledOrderMealCard.img}
    />
    <CardContent>
      <Typography gutterBottom>{props.meal.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {capitalize(props.meal.mealTime)}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {props.meal.description}
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
              onClick={() => props.handleAddScheduledOrderMeal(props.meal)}
              className={scheduledOrderMealCard.otherMealButton}
            >
              Add meal
            </Button>
          </Grid>
        </CardActions>
      </Grid>
    </Grid>
  </Card>
);
export default OtherMealCard;
