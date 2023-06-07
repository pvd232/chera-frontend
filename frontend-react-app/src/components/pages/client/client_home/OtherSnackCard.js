import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import logo from '../../../../static/images/chera_logo_300x300.png';
import GreenButton from './GreenButton';

const OtherSnackCard = (props) => {
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
          {props.snack.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.snack.description}
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
                onClick={() => props.handleAddScheduledOrderSnack(props.snack)}
              >
                Add snack
              </GreenButton>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default OtherSnackCard;
