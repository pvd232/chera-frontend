import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import APIClient from '../../../helpers/APIClient';
import ExtendedStagedClient from '../../../data_models/model/ExtendedStagedClient';
import MealPlanFactory from '../../../data_models/factories/model/MealPlanFactory';
import ClientItem from '../../ui_data_containers/ClientItem';
import BlackButton from '../../shared_components/BlackButton.ts';
import StagedClientPaymentConfirmed from './StagedClientPaymentConfirmed';
import EditClientMealPlanModal from './EditClientMealPlanModal';
import CreateNewStagedClientModal from './create_new_staged_client_modal/CreateNewStagedClientModal';
const DietititanHome = (props) => {
  const customTheme = useTheme();
  const [reminderLoading, setReminderLoading] = useState(
    props.stagedClients.map((stagedClient) => ({
      id: stagedClient.id,
      isLoading: false,
    }))
  );
  const [stagedClientItems, setStagedClientItems] = useState(
    props.stagedClients.map(
      (stagedClient) => new ClientItem(stagedClient, true)
    )
  );
  const [clientItems, setClientItems] = useState(
    props.clients.clientArray.map((client) => new ClientItem(client, false))
  );

  const handleFinishCreatingStagedClient = (newStagedClient) => {
    const stagedClientMealPlan = props.mealPlans.mealPlansMap.get(
      newStagedClient.mealPlanId
    );
    const newExtendedStagedClient = new ExtendedStagedClient(
      newStagedClient,
      stagedClientMealPlan,
      new MealPlanFactory()
    );
    const newClientItem = new ClientItem(newExtendedStagedClient, true);
    setStagedClientItems((prevStagedClientItems) => {
      // add new client to reminderLoading Array, which must be indexed to clientItems array
      setReminderLoading((prevReminderLoadingItems) => {
        const newReminderLoadingItems = [...prevReminderLoadingItems];
        newReminderLoadingItems.push({
          id: newStagedClient.id,
          isLoading: false,
        });
        return newReminderLoadingItems;
      });
      return [...prevStagedClientItems, newClientItem];
    });
  };
  const handleFinishEditingMealPlan = () => {
    setClientItems(
      props.clients.clientArray.map((client) => new ClientItem(client, false))
    );
    setStagedClientItems(
      props.stagedClients.map(
        (stagedClient) => new ClientItem(stagedClient, true)
      )
    );
  };

  return (
    <Grid
      container
      paddingTop={'3vh'}
      paddingBottom={'1vh'}
      paddingLeft={'3vw'}
      paddingRight={'3vw'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      <Grid container item xs={12} alignItems={'flex-end'}>
        <Grid item sx={{ marginRight: 'auto' }}>
          <Typography
            fontSize={'2rem'}
            fontWeight={'500'}
            component="div"
            paddingBottom={'3vh'}
            paddingTop={'3vh'}
          >
            Your Clients
          </Typography>
        </Grid>
        <Grid item sx={{ marginLeft: 'auto', marginRight: '1vw' }}>
          <CreateNewStagedClientModal
            extendedMeals={props.extendedMeals}
            snacks={props.snacks}
            mealPlans={props.mealPlans.mealPlansArray}
            dietitianId={props.dietitianId}
            stripePromise={props.stripePromise}
            handleFinishCreatingStagedClient={handleFinishCreatingStagedClient}
          ></CreateNewStagedClientModal>
        </Grid>
      </Grid>

      <Grid item lg={12} xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Email</TableCell>

                <TableCell align="left">Meal Plan</TableCell>
                <TableCell align="left">Notes</TableCell>
                <TableCell align="center">Account Created</TableCell>
                {props.stagedClients.length > 0 ? (
                  <TableCell></TableCell>
                ) : (
                  <></>
                )}
              </TableRow>
            </TableHead>
            <TableBody id="client-items">
              {clientItems.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  id="client-items"
                >
                  <TableCell component="th" scope="row">
                    {row.formattedName}
                  </TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">
                    <Grid item container>
                      {customTheme.smallerScreen()
                        ? row.mealPlanNumber
                        : row.mealPlanName}
                    </Grid>
                    <div
                      style={{
                        marginTop: '10px',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                      }}
                    >
                      <EditClientMealPlanModal
                        buttonIndex={i}
                        clientItem={row}
                        handleFinishEditingMealPlan={
                          handleFinishEditingMealPlan
                        }
                        isStagedClient={row.isStagedClient}
                        mealPlans={props.mealPlans.mealPlansArray}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="left">{row.notes}</TableCell>
                  <TableCell align="center">
                    <Icon sx={{ color: 'green' }}>check</Icon>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
              {stagedClientItems.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  id="staged-client-items"
                >
                  <TableCell component="th" scope="row">
                    {row.formattedName}
                  </TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">
                    <Grid item container>
                      {customTheme.smallerScreen()
                        ? row.mealPlanNumber
                        : row.mealPlanName}
                    </Grid>
                    <div
                      style={{
                        marginTop: '10px',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                      }}
                    >
                      <EditClientMealPlanModal
                        buttonIndex={i}
                        clientItem={row}
                        handleFinishEditingMealPlan={
                          handleFinishEditingMealPlan
                        }
                        isStagedClient={row.isStagedClient}
                        mealPlans={props.mealPlans.mealPlansArray}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="left">{row.notes}</TableCell>
                  <TableCell align="center">
                    {row.accountCreated ? (
                      <Icon sx={{ color: 'green' }}>check</Icon>
                    ) : (
                      <Icon
                        sx={{
                          color: 'red',
                          transform: 'scale(1.3)',
                        }}
                      >
                        clear_outlined
                      </Icon>
                    )}
                  </TableCell>
                  {!row.accountCreated ? (
                    <TableCell>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent={'center'}
                      >
                        <Grid item sx={{ cursor: 'pointer' }}>
                          <BlackButton
                            variant="contained"
                            sx={{ fontSize: '.75rem' }}
                            onClick={() => {
                              setReminderLoading((prevReminderLoading) => {
                                const newReminderLoading = [
                                  ...prevReminderLoading,
                                ];
                                newReminderLoading[i].isLoading = true;
                                return newReminderLoading;
                              });
                              APIClient.sendReminderEmail(row.client.id).then(
                                () => {
                                  setReminderLoading((prevReminderLoading) => {
                                    const newReminderLoading = [
                                      ...prevReminderLoading,
                                    ];
                                    prevReminderLoading[i].isLoading = false;
                                    return newReminderLoading;
                                  });
                                }
                              );
                            }}
                          >
                            {reminderLoading[i].isLoading ? (
                              <CircularProgress
                                sx={{
                                  color: customTheme.palette.white1.main,
                                }}
                                size={'1.2rem'}
                              />
                            ) : (
                              'Email a Reminder'
                            )}
                          </BlackButton>
                        </Grid>
                      </Grid>
                    </TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {props.paymentConfirmed && (
        <StagedClientPaymentConfirmed
          paymentConfirmed={props.paymentConfirmed}
          stagedClientId={props.paymentStagedClientId}
          stagedClients={props.stagedClients}
        />
      )}
    </Grid>
  );
};
export default DietititanHome;
