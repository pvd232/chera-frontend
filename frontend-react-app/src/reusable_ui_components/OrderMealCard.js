import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import capitalize from '../helpers/capitalize';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import logo from '../static/images/bendito-small.png';

const OrderMealCard = (props) => (
  <Card
    sx={{
      maxWidth: 350,
      height: '100%',
      maxHeight: 450,
      position: 'relative',
      marginBottom: '2vh',
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
        {props.mealData.name}
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {capitalize(props.mealData.mealTime)}
        </Typography>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {props.mealData.description}
      </Typography>
    </CardContent>
    {props.previousOrders ? (
      <Grid container justifyContent={'center'} alignItems={'flex-end'}>
        <Grid item>
          <Typography fontSize={'1rem'}>
            {props.protoMeal.quantity} meals
          </Typography>
        </Grid>
      </Grid>
    ) : !props.displayMealButtons ? (
      <Grid container justifyContent={'center'} alignItems={'flex-end'}>
        <Grid item>
          <Typography fontSize={'1rem'}>
            {props.protoMeal.quantity} ordered
          </Typography>
        </Grid>
      </Grid>
    ) : (
      <CardActions>
        <Grid container justifyContent={'space-around'}>
          <Grid item>
            <Icon
              onClick={() =>
                props.handleRemoveScheduledOrderMeal(props.protoMeal)
              }
              sx={{
                transform: 'scale(1.8)',
                cursor: 'pointer',
              }}
            >
              remove_circle
            </Icon>
          </Grid>

          <Grid item>
            <Typography fontSize={'1rem'}>
              {props.mealData.quantity} in your box
            </Typography>
          </Grid>
          <Grid item>
            <Icon
              onClick={() => props.handleAddScheduledOrderMeal(props.mealData)}
              sx={{
                transform: 'scale(1.8)',
                cursor: 'pointer',
              }}
            >
              add_circle
            </Icon>
          </Grid>
        </Grid>
      </CardActions>
    )}
  </Card>
);
export default OrderMealCard;
