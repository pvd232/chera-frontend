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
    </Card>
  );
};
export default MealCard;
