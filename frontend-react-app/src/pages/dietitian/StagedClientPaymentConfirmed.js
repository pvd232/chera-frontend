import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Transition from '../../reusable_ui_components/Transition';
import Icon from '@mui/material/Icon';
import Stack from '@mui/material/Stack';
import capitalize from '../../helpers/capitalize';
const StagedClientPaymentConfirmed = (props) => {
  const customTheme = useTheme();

  const [open, setOpen] = useState(props.paymentConfirmed);
  const stagedClient = props.stagedClients.find(
    (stagedClient) => stagedClient.id === props.stagedClientId
  );
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      maxWidth={'md'}
    >
      <Grid
        container
        justifyContent={'flex-end'}
        paddingRight={'1vw'}
        paddingTop={'1vw'}
      >
        <Grid item>
          <Icon
            onClick={() => setOpen(false)}
            sx={{ cursor: 'pointer', marginLeft: 'auto' }}
          >
            close
          </Icon>
        </Grid>
      </Grid>

      <DialogContent>
        <Grid container justifyContent={'center'} marginBottom={'3vh'}>
          <Icon sx={{ fontSize: '2rem' }}>thumb_up</Icon>
        </Grid>
        <Stack spacing={5} paddingBottom={'3vh'}>
          <Typography fontSize={'2rem'} textAlign={'center'} margin={'0 auto'}>
            {capitalize(stagedClient.firstName)}'s prepaid order has been
            successfully created!
          </Typography>
          <Typography
            fontFamily={'Inter'}
            fontSize={customTheme.fontEqualizer(16)}
            textAlign={'center'}
          >
            {capitalize(stagedClient.firstName)} will receive an email with a
            link to sign up and notifying them of your gift. As soon as they
            create their account, their subscription will be created, and their
            meals will be shipped.
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default StagedClientPaymentConfirmed;
