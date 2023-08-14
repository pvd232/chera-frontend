import { Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect, useState } from 'react';
import APIC from '../../../../../helpers/APIC';
import LocalStorageManager from '../../../../../helpers/LocalStorageManager';
import styles from './scss/ClientInvoice.module.scss';

const ClientInvoice = () => {
  const [invoices, setInvoices] = useState(false);
  useEffect(() => {
    APIC.getClientPaymentInvoices(
      LocalStorageManager.shared.client.stripeId
    ).then((resp) => {
      setInvoices(resp.invoices);
    });
  }, []);

  return (
    <Grid container className={styles.rootContainer} xs={10}>
      <Grid container className={styles.childContainer}>
        <Grid container item className={styles.headerContainer}>
          <Grid item>
            <Typography className={styles.header}>Invoices</Typography>
          </Grid>
        </Grid>
        {invoices ? (
          <Grid item container className={styles.contentContainer}>
            <table className={styles.invoiceTable}>
              <thead>
                <tr>
                  <th className={styles.rowHeader}>Date</th>
                  <th className={styles.rowHeader}>Total</th>
                  <th className={styles.rowHeader}>Invoice</th>
                  <th className={styles.rowHeader}>Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr
                    key={invoice.invoice_url}
                    className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                  >
                    <td className={styles.rowData}>
                      {invoice.invoice_created}
                    </td>
                    <td className={styles.rowData}>
                      ${(invoice.invoice_price / 100).toFixed(2)}
                    </td>
                    <td className={styles.rowData}>
                      <Button
                        className={styles.button}
                        onClick={() =>
                          window.open(invoice.invoice_url, '_blank')
                        }
                      >
                        View Invoice
                      </Button>
                    </td>
                    <td className={styles.rowData}>
                      {invoice.invoice_status === 'success' ? (
                        <CheckCircleIcon className={styles.success} />
                      ) : (
                        <CancelIcon className={styles.failure} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
        ) : (
          <Grid item container className={styles.loadingContainer}>
            <CircularProgress size={24} className={styles.progress} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ClientInvoice;
