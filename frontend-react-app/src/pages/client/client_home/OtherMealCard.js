import capitalize from '../../../helpers/capitalize';
import logo from '../../../static/images/bendito-small.png';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import GreenButton from './GreenButton';

const OtherMealCard = (props) => {
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
          {props.meal.name}
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {capitalize(props.meal.mealTime)}
          </Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.meal.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent={'space-around'}>
          <Grid
            container
            justifyContent={'space-around'}
            sx={{
              position: 'absolute',
              bottom: '4vh',
            }}
          >
            <Grid item>
              <GreenButton
                variant={'outlined'}
                onClick={() => props.handleAddScheduledOrderMeal(props.meal)}
              >
                Add meal
              </GreenButton>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default OtherMealCard;
