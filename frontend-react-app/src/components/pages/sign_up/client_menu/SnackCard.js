import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import logo from '../../../../static/images/chera_logo.png';
const SnackCard = (props) => {
  return (
    <Card
      sx={{
        maxWidth: 320,
        height: '100%',
        maxHeight: 450,
        position: 'relative',
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
