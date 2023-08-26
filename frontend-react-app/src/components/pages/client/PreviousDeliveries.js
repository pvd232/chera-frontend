import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeliveryDateUtility from '../../../helpers/DeliveryDateUtility';
import DietitianClientMealCard from '../../shared_components/DietitianClientMealCard';
import CircularProgressPage from '../../shared_components/CircularProgressPage';
import { useOrderMealItems } from './hooks/useOrderMealItems';
import styles from './scss/PreviousDeliveries.module.scss';
const PreviousDeliveries = () => {
  const previousOrderMeals = useOrderMealItems();
  if (previousOrderMeals) {
    return (
      <Grid container item className={styles.pageContainer} xs={10}>
        <Grid item container className={styles.headerContainer}>
          <Typography
            id={'previous-deliveries-header'}
            className={styles.header}
          >
            Your Orders
          </Typography>
        </Grid>

        {previousOrderMeals.length > 0 ? (
          <Grid container item className={styles.contentContainer}>
            {previousOrderMeals.map((orderMealCardItem) => (
              <Grid container item className={styles.cardContainer}>
                <Grid item>
                  <Stack className={styles.stack}>
                    <Typography
                      className={styles.deliverDateText}
                    >{`Delivered on Sunday, ${
                      DeliveryDateUtility.months[
                        orderMealCardItem.deliveryDate.getMonth()
                      ]
                    } ${orderMealCardItem.deliveryDate.getDate()}`}</Typography>
                    <Typography className={styles.deliverDateText}>
                      {orderMealCardItem.quantity} total meals
                    </Typography>
                  </Stack>
                </Grid>
                {orderMealCardItem.scheduledOrderMeals.map((orderMeal) => (
                  <Grid item xs={4}>
                    <DietitianClientMealCard mealData={orderMeal} />
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <Grid item container className={styles.noDeliveriesHeaderContainer}>
              <Grid item>
                <Typography>
                  Nothing to see here yet! Check back after your first delivery.
                </Typography>
              </Grid>
            </Grid>

            <Grid item container className={styles.noDeliveriesFiller}></Grid>
          </>
        )}
      </Grid>
    );
  } else {
    return <CircularProgressPage />;
  }
};
export default PreviousDeliveries;
