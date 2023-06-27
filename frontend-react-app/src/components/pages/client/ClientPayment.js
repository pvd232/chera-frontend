import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import previousDeliveries from './scss/PreviousDeliveries.module.scss';
import APIC from '../../../helpers/APIC';
import LocalStorageManager from '../../../helpers/LocalStorageManager';

const ClientPayment = () => {
  useEffect(() => {
    const fetchClientPaymentMethod = async () => {
      console.log(LocalStorageManager.shared.client);
      const resp = await APIC.getClientPaymentMethod(LocalStorageManager.shared.client.stripeId);
      console.log(resp);
    };

    fetchClientPaymentMethod();
  }, []);

  return (
    <Grid container item className={previousDeliveries.pageContainer} xs={10}>
      <Grid item>
        <Typography id={'previous-deliveries-header'} className={previousDeliveries.header}>
          Your Payment Method
        </Typography>
        <Typography>Payment page</Typography>
      </Grid>
    </Grid>
  );
};

export default ClientPayment;
