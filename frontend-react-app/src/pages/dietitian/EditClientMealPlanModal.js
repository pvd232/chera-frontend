import { v4 as uuid } from 'uuid';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';

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
import capitalize from '../../helpers/capitalize';
import BlackButton from '../../reusable_ui_components/BlackButton';
import Transition from '../../reusable_ui_components/Transition';
import APIClient from '../../helpers/APIClient';
import Client from '../../data_models/model/Client';
import StagedClient from '../../data_models/model/StagedClient';
import StagedClientDTO from '../../data_models/dto/StagedClientDTO';
import ClientDTO from '../../data_models/dto/ClientDTO';

const EditClientMealPlanModal = (props) => {
  const customTheme = useTheme();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [mealPlanId, setMealPlanId] = useState('');
  const validate = async (form) => {
    return form.checkValidity();
  };

  // input handlers
  const handleButtonClick = async () => {
    if (!loading) {
      setLoading(true);
      if (props.client.isStagedClient) {
        const currentStagedClient = new StagedClient(props.client);
        const currentStagedClientDTO = new StagedClientDTO(currentStagedClient);
        currentStagedClientDTO.mealPlanId = mealPlanId;
        APIClient.updateStagedClient(currentStagedClient);
      } else {
        const currentClient = new Client(props.client);
        const currentClientDTO = new ClientDTO(currentClient);
        currentClientDTO.mealPlanId = mealPlanId;
        APIClient.updateClient(currentClientDTO);
      }
      props.handleFinishEditingMealPlan();

      setLoading(false);
      setOpen(false);
    }
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

  return (
    <>
      <BlackButton variant={'contained'} onClick={handleClickOpen}>
        Edit
      </BlackButton>
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
          justifyContent={'flex-end'}
          paddingRight={'1vw'}
          paddingTop={'1vw'}
        >
          <Grid item>
            <Icon
              onClick={handleClose}
              sx={{ cursor: 'pointer', marginLeft: 'auto' }}
            >
              close
            </Icon>
          </Grid>
        </Grid>
        <DialogContent sx={{ marginBottom: '8vh' }}>
          <Stack spacing={2} paddingBottom={'3vh'}>
            <Typography
              fontSize={'2rem'}
              textAlign={'center'}
              margin={'0 auto'}
            >
              Update your client's meal plan
            </Typography>
            <Typography
              fontFamily={'Inter'}
              fontSize={customTheme.fontEqualizer(16)}
              textAlign={'center'}
            >
              Your change will be reflected in your client's upcoming meal
              deliveries
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit} autoComplete="new-password">
            <fieldset
              style={{
                boxShadow: customTheme.border.boxShadow.medium,
                padding: '4vh 5vw',
                boxSizing: 'border-box',
                margin: '0 10%',
                height: 'fit-content',
                border: 'none',
                borderRadius: customTheme.border.radius.medium,
              }}
            >
              <FormGroup>
                <Grid container>
                  <Grid item xs={12} sx={{ marginTop: '2vh' }}>
                    <Stack direction={'column'} rowGap={3}>
                      <InputLabel
                        key={uuid()}
                        sx={{ color: customTheme.palette.black.main }}
                      >
                        Client Email
                      </InputLabel>

                      <TextField
                        fullWidth
                        label={'Email'}
                        id="id"
                        value={props.client.id}
                        disabled={true}
                      />

                      <InputLabel
                        key={uuid()}
                        sx={{ color: customTheme.palette.black.main }}
                      >
                        Select New Meal Plan
                      </InputLabel>
                      <Select
                        key={uuid()}
                        label="Meal Plan"
                        required
                        id="mealPlanId"
                        value={mealPlanId}
                        onChange={handleInput}
                      >
                        {props.mealPlans.map((mealPlan) => (
                          <MenuItem key={uuid()} value={mealPlan.id}>
                            {`${capitalize(mealPlan.name)}: ${
                              mealPlan.statedCaloricLowerBound
                            }-${mealPlan.statedCaloricUpperBound} calories`}
                          </MenuItem>
                        ))}
                      </Select>
                      <BlackButton
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: '100%',
                        }}
                      >
                        Submit
                      </BlackButton>
                      <Typography
                        fontFamily={'Inter'}
                        fontSize={customTheme.fontEqualizer(12)}
                        color={customTheme.palette.secondaryText.main}
                      >
                        By clicking above, you agree to our{' '}
                        <a href="/">Terms of Use</a> and consent to our{' '}
                        <a href="/">Privacy Policy</a>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </FormGroup>
            </fieldset>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EditClientMealPlanModal;
