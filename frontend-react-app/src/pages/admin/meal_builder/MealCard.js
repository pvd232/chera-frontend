import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const MealCard = (props) => {
  return (
    <Card
      square={true}
      sx={{
        maxWidth: (() => (window.innerWidth > 1000 ? '20vw' : 350))(),
        height: '100%',
        position: 'relative',
        border: 'none',
        boxShadow: 'none',
      }}
    >
      <CardMedia
        component="img"
        src={props.imageUrl}
        alt="green iguana"
        sx={{
          marginBottom: '20px',
          borderRadius: '5px',
        }}
      />
      <CardContent
        sx={{
          margin: '0',
          padding: '0',
        }}
      >
        <Typography
          fontSize={'1rem'}
          fontWeight={'bold'}
          component="div"
          paddingBottom={1}
        >
          {props.mealName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {props.mealDescription}
        </Typography>
      </CardContent>
      {/* <CardActions>
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
            <Typography fontSize={'1rem'}>1 in your box</Typography>
          </Grid>
          <Grid item>
            <IconButton
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
      </CardActions> */}
    </Card>
  );
};
export default MealCard;
