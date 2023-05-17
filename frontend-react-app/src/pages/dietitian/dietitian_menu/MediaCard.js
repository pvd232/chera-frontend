import React from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import logo from '../../../static/images/chera_logo.png';
import capitalize from '../../../helpers/capitalize';
import NutritionDetails from './nutrition_details/NutritionDetails';
const MediaCard = React.memo(
  (props) => {
    const [loading, setLoading] = React.useState(true);

    const onLoad = React.useCallback(() => {
      setLoading(false);
    }, []);
    return (
      <Card
        sx={{
          maxWidth: 350,
          height: '100%',
          maxHeight: 450,
          position: 'relative',
          display: loading ? 'none' : 'block',
        }}
        id={props.mealPlanMeal.id}
      >
        <CardMedia
          component="img"
          sx={{
            width: '50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20px',
            marginBottom: '20px',
          }}
          src={logo}
          alt="green iguana"
          onLoad={onLoad}
        />
        <CardContent>
          <Typography
            gutterBottom
            fontSize={'1rem'}
            fontWeight={'500'}
            component="div"
          >
            {props.mealPlanMeal.associatedMeal.name}
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {capitalize(props.mealPlanMeal.associatedMeal.mealTime)}
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: '5vh' }}
          >
            {props.mealPlanMeal.associatedMeal.description}
          </Typography>
          <NutritionDetails
            mealPlanMeal={props.mealPlanMeal}
          ></NutritionDetails>
        </CardContent>
      </Card>
    );
  },
  (prevProps, props) => {
    if (prevProps.mealPlanMeal.id !== props.mealPlanMeal.id) {
      return false;
    } else {
      return true;
    }
  }
);
export default MediaCard;
