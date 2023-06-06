import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import APIClient from '../../../../helpers/APIClient.js';
import OrderDiscount from '../../../../data_models/model/OrderDiscount.js';
import DiscountDTO from '../../../../data_models/dto/DiscountDTO.js';
import Discount from '../../../../data_models/model/Discount.js';
import BlackButton from '../../../reusable_ui_components/BlackButton.ts';
import getSubtotal from './getSubtotal.js';
const DiscountOrderSummary = (props) => {
  const customTheme = useTheme();

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [orderDiscountAmount, setOrderDiscountAmount] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discountValid, setDiscountValid] = useState(true);
  const mealsSubtotal = getSubtotal(props.scheduleMeals, false);
  const snacksSubtotal = getSubtotal(false, props.scheduleSnacks);
  const [total, setTotal] = useState(
    getSubtotal(props.scheduleMeals, false) +
      getSubtotal(false, props.scheduleSnacks) +
      props.shippingCost
  );
  const handleSubmit = async () => {
    if (discountCode !== '') {
      const discountStatus = await APIClient.verifyDiscount(discountCode);
      if (discountStatus) {
        const newDiscountDTO = new DiscountDTO(discountStatus);
        const newDiscount = new Discount(newDiscountDTO);

        setDiscountCode(newDiscount.code);
        const newOrderDiscount = OrderDiscount.initializeFromDiscount(
          newDiscount.id
        );
        const newDiscountedMealSubtotal =
          mealsSubtotal * newDiscount.discountPercentage;
        const newDiscountedSnackSubtotal =
          snacksSubtotal * newDiscount.discountPercentage;
        const newDiscountedSubtotal =
          newDiscountedMealSubtotal + newDiscountedSnackSubtotal;
        newOrderDiscount.stagedClientId = props.stagedClientId;

        // Discount amount is equal to the subtotal minus the discounted subtotal
        newOrderDiscount.amount =
          mealsSubtotal + snacksSubtotal - newDiscountedSubtotal;

        const newTotal = newDiscountedSubtotal + props.shippingCost;
        setTotal(newTotal);
        setDiscountValid(true);
        setDiscountPercentage(newDiscount.discountPercentage);
        setOrderDiscountAmount(newOrderDiscount.amount);
        if (props.dietitianPrepaying) {
          APIClient.createPaymentIntent(
            props.scheduleMeals.length,
            props.scheduleSnacks.length,
            props.stagedClientId,
            newDiscount.code
          ).then((clientSecret) => {
            props.setPaymentIntentData(clientSecret);
          });
        } else {
          props.setOrderDiscount(newOrderDiscount);
        }
        props.setDiscountCode(newDiscount.code);
      } else {
        setDiscountValid(false);
      }
    }
  };
  return (
    <Grid
      container
      item
      sx={{
        height: '100%',
      }}
    >
      <Stack spacing={3}>
        <Card
          variant={'outlined'}
          sx={{
            paddingTop: '5vh',
            paddingBottom: '10vh',
            paddingLeft: '2vw',
            paddingRight: '2vw',
          }}
        >
          <Grid item container justifyContent={'flex-start'}>
            <Grid item xs={12}>
              <Typography
                width={'100%'}
                fontSize={'1.7rem'}
                textAlign={'start'}
                margin={'0 auto'}
                marginBottom={'2vh'}
              >
                Coupon
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent="flex-start"
              marginBottom={'1vh'}
            >
              {!discountValid ? (
                <FormHelperText error={true}>Invalid code</FormHelperText>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item container lg={7} xs={6}>
              <TextField
                fullWidth
                size="small"
                sx={{
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                }}
                value={discountCode}
                onChange={(event) => {
                  setDiscountCode(event.target.value);
                }}
              />
            </Grid>
            <Grid item container lg={4} xs={6} justifyContent="flex-end">
              <BlackButton variant="contained" onClick={handleSubmit}>
                Apply
              </BlackButton>
            </Grid>
          </Grid>
        </Card>

        <Card
          variant={'outlined'}
          sx={{
            height: '100%',
            paddingTop: '5vh',
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
              rowSpacing={1}
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
              {discountPercentage ? (
                <>
                  <Grid item container xs={6} justifyContent={'flex-start'}>
                    <p
                      style={{
                        color: customTheme.palette.lightGreen.main,
                        fontWeight: 'bold',
                      }}
                    >
                      {discountCode + ' coupon'}
                    </p>
                  </Grid>
                  <Grid item container xs={6} justifyContent={'flex-end'}>
                    <p
                      style={{
                        color: customTheme.palette.lightGreen.main,
                        fontWeight: 'bold',
                      }}
                    >
                      - {orderDiscountAmount.toFixed(2)}
                    </p>
                  </Grid>
                </>
              ) : (
                <></>
              )}
              <Grid item container xs={6} justifyContent={'flex-start'}>
                <p>Shipping</p>
              </Grid>
              <Grid item container xs={6} justifyContent={'flex-end'}>
                <p>{props.shippingCost.toFixed(2)}</p>
              </Grid>
              <Grid item container xs={6} justifyContent={'flex-start'}>
                <p style={{ fontWeight: 'bold' }}>Total</p>
              </Grid>
              <Grid item container xs={6} justifyContent={'flex-end'}>
                <p>{total.toFixed(2)}</p>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Stack>
    </Grid>
  );
};
export default DiscountOrderSummary;
