import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import capitalize from '../../helpers/capitalize';
import logo from '../../static/images/chera_logo_300x300.png';
import scheduledOrderMealCard from '../pages/client/client_home/current_meals/scss/ScheduledOrderMealCard.module.scss';

const DietitianClientMealCard = (props) => {
  return (
    <Card className={scheduledOrderMealCard.card}>
      <CardMedia
        component="img"
        src={logo}
        alt="meal image"
        className={scheduledOrderMealCard.img}
      />
      <CardContent>
        <Typography gutterBottom>
          {props.mealData.meal.name}
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {capitalize(props.mealData.meal.mealTime)}
          </Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.mealData.meal.description}
        </Typography>
      </CardContent>

      <Grid
        container
        className={scheduledOrderMealCard.dietitianMealCardContainer}
      >
        <Grid item>
          <Typography>{props.mealData.quantity} meals</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
export default DietitianClientMealCard;
