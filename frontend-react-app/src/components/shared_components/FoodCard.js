import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import foodCard from './scss/FoodCard.module.scss';
import { CardContent, Typography } from '@mui/material';
import capitalize from '../../helpers/capitalize';
export const FoodCard = (props) => (
  <Card className={foodCard.card}>
    <CardMedia
      component="img"
      src={props.mealImageUrl}
      alt="green iguana"
      className={foodCard.img}
    />
    <CardContent>
      <Typography gutterBottom>{props.mealName}</Typography>
      {!props.isSnackCard && (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {capitalize(props.mealTime)}
        </Typography>
      )}

      <Typography variant="body2" color="text.secondary">
        {props.mealDescription}
      </Typography>
    </CardContent>
    {props.childComponent}
  </Card>
);
