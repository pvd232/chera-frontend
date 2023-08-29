import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import foodCard from './scss/FoodCard.module.scss';
import { CardContent, Typography } from '@mui/material';
import capitalize from '../../helpers/capitalize';
import { ReactComponent as CheraLogo } from '../../static/images/logo/chera_logo_300x100_margin.svg';
import { useState } from 'react';

export const FoodCard = (props) => {
  const [image, setImage] = useState(true);
  return (
    <Card className={foodCard.card}>
      {image ? (
        <CardMedia
          component={'img'}
          onError={(e) => {
            setImage(false);
          }}
          src={props.mealImageUrl}
          alt="green iguana"
          className={foodCard.img}
        />
      ) : (
        <CardMedia
          component={'div'}
          alt="green iguana"
          className={foodCard.svgImg}
        >
          <CheraLogo className={foodCard.img} />
        </CardMedia>
      )}

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
};
