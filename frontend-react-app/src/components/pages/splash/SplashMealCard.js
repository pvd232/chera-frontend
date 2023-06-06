import React from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import logo from '../../../static/images/chera_logo.png';
import capitalize from '../../../helpers/capitalize';

const SplashMealCard = React.memo(
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
          position: 'relative',
          display: loading ? 'none' : 'block',
        }}
        id={props.meal.id}
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
            {props.meal.name}
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {capitalize(props.meal.mealTime)}
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: '2vh' }}
          >
            {props.meal.description}
          </Typography>
        </CardContent>
      </Card>
    );
  },
  (prevProps, props) => {
    if (prevProps.meal.id !== props.meal.id) {
      return false;
    } else {
      return true;
    }
  }
);
export default SplashMealCard;
