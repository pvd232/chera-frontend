import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
const SnackCard = (props) => {
  return (
    <Card
      sx={{
        maxWidth: 320,
        maxHeight: 500,
        height: '100%',
        position: 'relative',
      }}
    >
      <CardMedia
        component="img"
        src={props.snack.imageUrl}
        alt="green iguana"
        sx={{
          maxHeight: '230px',
          height: '30vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '20px',
        }}
      />
      <Grid container>
        <Grid item>
          <CardContent>
            <Typography
              gutterBottom
              fontSize={'1rem'}
              fontWeight={'bold'}
              color={'black'}
              component="div"
            >
              {props.snack.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.snack.description}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item container sx={{ height: '100%', marginTop: '5vh' }}>
          <Grid item sx={{ position: 'absolute', bottom: 0 }}>
            <CardActions>
              <IconButton
                id={`snack-button-${props.index}`}
                color="primary"
                onClick={() => props.handleAddSnack(props.snack)}
              >
                <Icon sx={{ fontSize: '2rem' }}>add</Icon>
              </IconButton>
            </CardActions>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
export default SnackCard;
