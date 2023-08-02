import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import APIC from '../../../helpers/APIC';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import clientPayment from './scss/ClientPayment.module.scss';



const ClientInvoice = (props) => {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {

    const fetchInvoices = async () => {
      const resp = await APIC.getClientPaymentInvoices(LocalStorageManager.shared.client.stripeId);
      console.log(resp);
      console.log(resp.invoices.length);
      setInvoices(resp.invoices)
      console.log(invoices)
    };

    fetchInvoices();
  }, []);


  return (
    <Grid container className={clientPayment.rootContainer}>
      <Grid container item className={clientPayment.headerContainer}>
        <Grid item>
          <Typography className={clientPayment.header} >
            Invoices
          </Typography>
          <table className={clientPayment.invoiceTable} style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Total</th>
                <th>Invoice URL</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={invoice.invoice_url} className={index % 2 === 0 ? clientPayment.evenRow : clientPayment.oddRow}>
                  <td>{invoice.invoice_created}</td>
                  <td>{(invoice.invoice_price / 100).toFixed(2)}$</td>
                  <td>
                    <Button className={clientPayment.button} onClick={() => window.open(invoice.invoice_url, '_blank')}>
                      Download Receipt
                    </Button>
                  </td>
                  <td>{invoice.invoice_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      </Grid >
    </Grid>
  );
};

export default ClientInvoice;
