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
import BlackButton from '../../shared_components/BlackButton.ts';
import StagedClientPaymentConfirmed from './StagedClientPaymentConfirmed';
import EditClientMealPlanModal from './EditClientMealPlanModal';
import CreateNewStagedClientModal from './create_new_staged_client_modal/CreateNewStagedClientModal';
import { useClients } from './hooks/useClients';
import { useStagedClients } from './hooks/useStagedClients';
import { getExtendedStagedClients } from './helpers/getExtendedStagedClients';
import { getExtendedClients } from './helpers/getExtendedClients';
import { getClientItems } from './helpers/getClientItems';
import { getStagedClientItems } from './helpers/getStagedClientItems';
import dietitianHome from './scss/DietitianHome.module.scss';
const DietititanHome = (props) => {
  const customTheme = useTheme();
  const [clients, setClients] = useClients();
  const [stagedClients, setStagedClients] = useStagedClients();

  const handleFinishCreatingStagedClient = async () => {
    const extendedStagedClients = await getExtendedStagedClients(
      props.dietitianId
    );
    setStagedClients(extendedStagedClients);
  };

  const handleFinishEditingMealPlan = async () => {
    const extendedClients = await getExtendedClients(props.dietitianId);
    setClients(extendedClients);
    const extendedStagedClients = await getExtendedStagedClients(
      props.dietitianId
    );
    setStagedClients(extendedStagedClients);
  };

  return (
    <Grid
      container
      item
      className={dietitianHome.contentContainer}
      id="content-container"
    >
      <Grid
        container
        item
        xs={10}
        className={dietitianHome.contentSubContainer}
        id="content-sub-container"
      >
        <Grid container item className={dietitianHome.headerContainer}>
          <Grid item className={dietitianHome.headerItem}>
            <Typography className={dietitianHome.header}>
              Your Clients
            </Typography>
          </Grid>
          <Grid item className={dietitianHome.addStagedClientItem}>
            <CreateNewStagedClientModal
              extendedMeals={props.extendedMeals}
              snacks={props.snacks}
              mealPlans={props.mealPlans.mealPlansArray}
              dietitianId={props.dietitianId}
              stripePromise={props.stripePromise}
              handleFinishCreatingStagedClient={
                handleFinishCreatingStagedClient
              }
            ></CreateNewStagedClientModal>
          </Grid>
        </Grid>

        <Grid container item id="clients-table">
          <TableContainer component={Paper}>
            <Table className={dietitianHome.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  {/* <TableCell align="left">Address</TableCell> */}
                  <TableCell align="left">Email</TableCell>

                  <TableCell align="left">Meal Plan</TableCell>
                  <TableCell align="left">Notes</TableCell>
                  <TableCell align="center">Account Created</TableCell>
                  {stagedClients.length > 0 ? <TableCell></TableCell> : <></>}
                </TableRow>
              </TableHead>
              <TableBody id="client-items">
                {getClientItems(clients?.clientArray ?? []).map((row, i) => (
                  <TableRow key={i} id="client-items">
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    {/* <TableCell align="left">{row.address}</TableCell> */}
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">
                      <Grid item container>
                        {customTheme.smallerScreen()
                          ? row.mealPlanNumber
                          : row.mealPlanName}
                      </Grid>
                      <div className={dietitianHome.editMealPlanContainer}>
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
                      <Icon className={dietitianHome.accountCreatedIcon}>
                        check
                      </Icon>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
                {getStagedClientItems(stagedClients).map((row, i) => (
                  <TableRow key={i} id="staged-client-items">
                    <TableCell component="th" scope="row">
                      {row.formattedName}
                    </TableCell>
                    {/* <TableCell align="left">{row.address}</TableCell> */}
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">
                      <Grid item container>
                        {customTheme.smallerScreen()
                          ? row.mealPlanNumber
                          : row.mealPlanName}
                      </Grid>
                      <div className={dietitianHome.editMealPlanContainer}>
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
                        <Icon className={dietitianHome.accountCreatedIcon}>
                          check
                        </Icon>
                      ) : (
                        <Icon className={dietitianHome.accountNotCreatedIcon}>
                          clear_outlined
                        </Icon>
                      )}
                    </TableCell>
                    {!row.accountCreated ? (
                      <TableCell>
                        <Grid
                          container
                          className={dietitianHome.sendReminderContainer}
                        >
                          <Grid item>
                            <BlackButton
                              variant="contained"
                              className={dietitianHome.sendReminderButton}
                              onClick={() => {
                                setStagedClients((prevStagedClients) => {
                                  const newStagedClients = [
                                    ...prevStagedClients,
                                  ];
                                  newStagedClients[i].isLoading = true;
                                  return newStagedClients;
                                });
                                APIClient.sendReminderEmail(row.client.id).then(
                                  () => {
                                    setStagedClients((prevStagedClients) => {
                                      const newStagedClients = [
                                        ...prevStagedClients,
                                      ];
                                      prevStagedClients[i].isLoading = false;
                                      return newStagedClients;
                                    });
                                  }
                                );
                              }}
                            >
                              {stagedClients[i]?.isLoading ? (
                                <CircularProgress
                                  className={dietitianHome.loadingIcon}
                                  size={24}
                                />
                              ) : (
                                'Send Reminder'
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
            stagedClients={stagedClients}
          />
        )}
      </Grid>
    </Grid>
  );
};
export default DietititanHome;
