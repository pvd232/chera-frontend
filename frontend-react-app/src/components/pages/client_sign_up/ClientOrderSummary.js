import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
const ClientOrderSummary = (props) => {
  const customTheme = useTheme();

  const mealsSubtotal = props.scheduleMeals.length * props.mealPrice;
  const snacksSubtotal = props.scheduleSnacks.length * props.snackPrice;
  const total = mealsSubtotal + snacksSubtotal;

  return (
    <Grid
      container
      item
      sx={{
        height: '100%',
      }}
    >
      <Card
        variant={'outlined'}
        sx={{
          paddingTop: '2vh',
          paddingLeft: '2vw',
          paddingRight: '2vw',
        }}
      >
        <Grid item container xs={12}>
          <Typography
            width={'100%'}
            fontSize={'1.7rem'}
            textAlign={'start'}
            margin={'0 auto'}
            marginBottom={'2vh'}
          >
            Order Summary
          </Typography>
          <Grid
            item
            container
            justifyContent={'space-around'}
            rowSpacing={2}
            marginBottom={'2vh'}
          >
            <Grid item container xs={6} justifyContent={'flex-start'}>
              <p>
                {props.scheduleMeals.length} {'meal'}
                {props.scheduleMeals.length > 1 ? 's' : ''}
              </p>
            </Grid>
            <Grid item container xs={6} justifyContent={'flex-end'}>
              <p>{mealsSubtotal.toFixed(2)}</p>
            </Grid>
            <Grid item container xs={6} justifyContent={'flex-start'}>
              <p>
                {props.scheduleSnacks.length} {'snack'}
                {props.scheduleSnacks.length > 1 ? 's' : ''}
              </p>
            </Grid>
            <Grid item container xs={6} justifyContent={'flex-end'}>
              <p>{snacksSubtotal.toFixed(2)}</p>
            </Grid>

            {props.prepaid ? (
              <>
                <Grid item container xs={6} justifyContent={'flex-start'}>
                  <p>Service Fee</p>
                </Grid>
                <Grid item container xs={6} justifyContent={'flex-end'}>
                  <p>0.50</p>
                </Grid>
                <Grid item container xs={6} justifyContent={'flex-start'}>
                  <p
                    style={{
                      color: customTheme.palette.lightGreen.main,
                      fontWeight: 'bold',
                    }}
                  >
                    {'Prepaid'}
                  </p>
                </Grid>
                <Grid item container xs={6} justifyContent={'flex-end'}>
                  <p
                    style={{
                      color: customTheme.palette.lightGreen.main,
                      fontWeight: 'bold',
                    }}
                  >
                    - {total.toFixed(2)}
                  </p>
                </Grid>
                <Grid item container xs={6} justifyContent={'flex-start'}>
                  <p style={{ fontWeight: 'bold' }}>Total</p>
                </Grid>
                <Grid item container xs={6} justifyContent={'flex-end'}>
                  <p>0.50</p>
                </Grid>{' '}
              </>
            ) : props.discountCode ? (
              <>
                <Grid item container xs={8}>
                  <p
                    style={{
                      color: customTheme.palette.lightGreen.main,
                      fontWeight: 'bold',
                    }}
                  >
                    {`${props.discountCode} Coupon`}
                  </p>
                </Grid>
                <Grid item container xs={4} justifyContent={'flex-end'}>
                  <p
                    style={{
                      color: customTheme.palette.lightGreen.main,
                      fontWeight: 'bold',
                    }}
                  >
                    - {props.orderDiscount.amount.toFixed(2)}
                  </p>
                </Grid>
                <Grid item container xs={6} justifyContent={'flex-start'}>
                  <p style={{ fontWeight: 'bold' }}>Total</p>
                </Grid>
                <Grid item container xs={6} justifyContent={'flex-end'}>
                  <p>{(total - props.orderDiscount.amount).toFixed(2)}</p>
                </Grid>
              </>
            ) : (
              <>
                <Grid item container xs={6} justifyContent={'flex-start'}>
                  <p style={{ fontWeight: 'bold' }}>Total</p>
                </Grid>
                <Grid item container xs={6} justifyContent={'flex-end'}>
                  <p>{total.toFixed(2)}</p>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
export default ClientOrderSummary;
