import * as React from 'react';
import { useState } from 'react';
import { Button, FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import Icon from '@mui/material/Icon';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import APIClient from '../../../helpers/APIClient';
import BlackButton from '../../shared_components/BlackButton.ts';
import Transition from '../../shared_components/Transition';
import Client from '../../../data_models/model/Client';
import StagedClient from '../../../data_models/model/StagedClient';
import StagedClientDTO from '../../../data_models/dto/StagedClientDTO';
import ClientDTO from '../../../data_models/dto/ClientDTO';
import editClientMealPlanModal from './scss/EditClientMealPlanModal.module.scss';
import useAuthHeader from "../../../helpers/useAuthHeader";
const EditClientMealPlanModal = (props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const authHeader = useAuthHeader();

  const [mealPlanId, setMealPlanId] = useState('');
  const validate = async (form) => {
    return form.checkValidity();
  };

  // input handlers
  const handleButtonClick = async () => {
    setLoading(true);
    if (props.isStagedClient) {
      const currentStagedClient = new StagedClient(props.clientItem.client);
      const currentStagedClientDTO =
        StagedClientDTO.initializeFromStagedClient(currentStagedClient);
      currentStagedClientDTO.mealPlanId = mealPlanId;
      await APIClient.updateStagedClient(currentStagedClientDTO, authHeader);
    } else {
      const currentClient = new Client(props.clientItem.client);
      const currentClientDTO = ClientDTO.initializeFromForm(currentClient);
      currentClientDTO.mealPlanId = mealPlanId;
      await APIClient.updateClient(currentClientDTO, authHeader);
    }
    props.handleFinishEditingMealPlan();

    setLoading(false);
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    // check that all required values have been populated before triggering button click
    const validated = await validate(form);
    if (validated) {
      handleButtonClick();
    } else {
      return false;
    }
  };

  const handleInput = (event) => {
    const value = event.target.value;
    setMealPlanId(value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const editMealPlanButtonDomain = (() => {
    if (props.isStagedClient) {
      return 'StagedClient';
    } else {
      return 'Client';
    }
  })();
  return (
    <div id="edit-client-meal-plan-container">
      <Button
        id={`change${editMealPlanButtonDomain}MealPlan${props.buttonIndex}`}
        variant={'contained'}
        onClick={handleClickOpen}
        className={editClientMealPlanModal.button}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={'md'}
        fullWidth={true}
      >
        <Grid
          container
          className={editClientMealPlanModal.closeIconContainer}
          id="close-icon-container"
        >
          <Grid item>
            <Icon
              onClick={handleClose}
              className={editClientMealPlanModal.closeIcon}
            >
              close
            </Icon>
          </Grid>
        </Grid>
        <DialogContent className={editClientMealPlanModal.dialog}>
          <Stack className={editClientMealPlanModal.stack}>
            <Typography className={editClientMealPlanModal.header}>
              Update your client's portion size
            </Typography>
            <Typography className={editClientMealPlanModal.subHeader}>
              Your change will be reflected in your client's upcoming meal
              deliveries
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit} autoComplete="new-password">
            <fieldset className={editClientMealPlanModal.fieldset}>
              <FormGroup>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    className={editClientMealPlanModal.content}
                  >
                    <Stack className={editClientMealPlanModal.stack}>
                      <InputLabel
                        className={editClientMealPlanModal.inputLabel}
                      >
                        Client Email
                      </InputLabel>

                      <TextField
                        fullWidth
                        id="id"
                        value={props.clientItem.email}
                        disabled={true}
                      />
                      <InputLabel
                        className={editClientMealPlanModal.inputLabel}
                      >
                        Portion Size
                      </InputLabel>
                      <FormControl>
                        <InputLabel>Portion Size</InputLabel>
                        <Select
                          label="Portion"
                          required
                          id="editMealPlanId"
                          value={mealPlanId}
                          onChange={handleInput}
                        >
                          {props.mealPlans.map((mealPlan, i) => (
                            <MenuItem
                              key={`editMealPlan-${i}`}
                              id={`editMealPlan-${i}`}
                              value={mealPlan.id}
                            >
                              {`${mealPlan.dinnerCalories} kCal`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <div className={editClientMealPlanModal.buttonContainer}>
                        <BlackButton
                          id={`submitMealPlanChange`}
                          type="submit"
                          variant="contained"
                          disabled={loading}
                          className={editClientMealPlanModal.submitButton}
                        >
                          Submit
                        </BlackButton>
                      </div>
                    </Stack>
                  </Grid>
                </Grid>
              </FormGroup>
            </fieldset>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EditClientMealPlanModal;
