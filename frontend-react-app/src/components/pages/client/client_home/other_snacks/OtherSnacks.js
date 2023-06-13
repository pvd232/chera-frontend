import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import otherMeals from '../other_meals/scss/OtherMeals.module.scss';
import OtherSnackCard from './OtherSnackCard';
const OtherSnacks = (props) => {
  return (
    <Grid container item className={otherMeals.container}>
      <Grid item>
        <Typography fontSize={'2rem'}>Other snacks to choose from</Typography>
      </Grid>
      <Grid item container className={otherMeals.mealCardsContainer}>
        {props.otherSnacks.map((otherSnack, i) => (
          <Grid item key={`grid-${i}`} className={otherMeals.cardContainer}>
            <OtherSnackCard
              key={`otherSnackCard-${i}`}
              snack={otherSnack}
              handleAddScheduledOrderSnack={(snack) =>
                props.handleAddScheduledOrderSnack(snack)
              }
              handleRemoveScheduledOrderSnack={(snack) =>
                props.handleRemoveScheduledOrderSnack(snack)
              }
              cantMakeChanges={props.cantMakeChanges}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default OtherSnacks;
