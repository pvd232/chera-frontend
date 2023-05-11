import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { useReducer, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import React from 'react';

import LocalStorageManager from '../../../helpers/LocalStorageManager';
import APIClient from '../../../helpers/APIClient';
import DietitianDTO from '../../../data_models/dto/DietitianDTO';
import Dietitian from '../../../data_models/model/Dietitian';
import BlackButton from '../../../reusable_ui_components/BlackButton';
import ErrorMessage from './ErrorMessage';
import RegistrationErrorMessage from './RegistrationErrorMessage';
import getStatesData from '../../sign_up/helpers/getStatesData';
import { TextField } from '@mui/material';
const DietitianSignUp = React.forwardRef((props, ref) => {
  const customTheme = useTheme();

  const [error, setError] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;

    const validated = await validate(form);
    if (validated) {
      const dietitianDTO = DietitianDTO.initializeFromForm(formValue);
      const returnedDietitianData = await APIClient.createDietitian(
        dietitianDTO
      );
      if (!returnedDietitianData) {
        alert(APIClient.networkErrorMessage);
      }
      setLoading(false);

      const createdDietitianDTO = new DietitianDTO(returnedDietitianData);
      const createdDietitian = new Dietitian(createdDietitianDTO);

      LocalStorageManager.shared.homeUrl = '/d-home';
      LocalStorageManager.shared.dietitian = createdDietitian;
      if (!createdDietitian.admin) {
        window.location.assign('/d-home');
      } else {
        window.location.assign('/a-home');
      }
    } else {
      setLoading(false);
      return false;
    }
  };
  const handleInput = (event) => {
    let id = event.target.id;
    let value = event.target.value;
    setFormValue({ [id]: value });
    // setting the state unfocuses the user cursor in the form, and setting auto-focus to true fixes it, but autofocus can only be true for the input that is currently being typed in
  };
  const validate = async (form) => {
    const dietitianAlreadyExists = await APIClient.getDietitian(formValue.id);
    if (dietitianAlreadyExists) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    const dieteticRegistrationNumber = form.dieteticRegistrationNumber.value;
    const registrationStatus = await APIClient.checkDieteticRegistrationNumber(
      dieteticRegistrationNumber
    );
    if (!registrationStatus) {
      setRegistrationError(true);
      return false;
    } else {
      setRegistrationError(false);
    }
    return form.checkValidity();
  };

  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: '',
      password: '',
      firstName: '',
      lastName: '',
      dieteticRegistrationNumber: '',
      clinicCity: '',
      clinicState: '',
      clinicUrl: '',
      datetime: Date.now(),
      clients: [],
      active: true,
      admin: false,
    }
  );

  return (
    <Grid
      item
      container
      xs={12}
      alignItems="stretch"
      justifyContent={'center'}
      py={customTheme.pages.splash.spacing.pages}
      px={0}
      sx={{
        backgroundColor: customTheme.palette.lightGrey.secondary,
      }}
      ref={ref}
    >
      <CardContent>
        <Typography
          fontSize={customTheme.pages.splash.fontSize.header}
          color={customTheme.palette.black.main}
          textAlign={'center'}
          fontWeight={'500'}
          sx={{
            mb: customTheme.pages.splash.spacing.header.marginBottom,
          }}
        >
          Dietitian Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Stack
              direction={'column'}
              rowGap={3.5}
              width={'80%'}
              sx={{ mx: 'auto' }}
            >
              <FormControl variant="filled">
                <ErrorMessage error={error} />
                <TextField
                  required
                  fullWidth
                  label="Email"
                  id="id"
                  type="email"
                  sx={{
                    backgroundColor: '#fcfcfb',
                  }}
                  onChange={handleInput}
                  value={formValue.id}
                />
              </FormControl>
              <FormControl variant="filled">
                <TextField
                  required
                  type="password"
                  autoComplete={'new-password'}
                  fullWidth
                  label="Choose a password"
                  id="password"
                  sx={{
                    backgroundColor: '#fcfcfb',
                  }}
                  onChange={handleInput}
                  value={formValue.password}
                />
              </FormControl>
              <FormControl variant="filled">
                <TextField
                  required
                  fullWidth
                  label="First name"
                  id="firstName"
                  sx={{
                    backgroundColor: '#fcfcfb',
                  }}
                  onChange={handleInput}
                  value={formValue.firstName}
                />
              </FormControl>
              <FormControl variant="filled">
                <TextField
                  required
                  fullWidth
                  label="Last name"
                  id="lastName"
                  sx={{
                    backgroundColor: '#fcfcfb',
                  }}
                  onChange={handleInput}
                  value={formValue.lastName}
                />
              </FormControl>
              <FormControl variant="filled">
                <RegistrationErrorMessage error={registrationError} />

                <TextField
                  sx={{
                    backgroundColor: '#fcfcfb',
                  }}
                  required
                  fullWidth
                  label="Dietetic registration number"
                  id="dieteticRegistrationNumber"
                  onChange={handleInput}
                  value={formValue.dieteticRegistrationNumber}
                />
              </FormControl>
              <FormControl variant="filled">
                <TextField
                  required
                  fullWidth
                  label="Clinic website url"
                  id="clinicUrl"
                  sx={{
                    backgroundColor: '#fcfcfb',
                  }}
                  type="url"
                  onChange={handleInput}
                  value={formValue.clinicUrl}
                  autoComplete={'off'}
                />
              </FormControl>
              <FormControl variant="filled">
                <TextField
                  label="Clinic City"
                  sx={{
                    backgroundColor: '#fcfcfb',
                  }}
                  required
                  fullWidth
                  id="clinicCity"
                  onChange={handleInput}
                  value={formValue.clinicCity}
                  autoComplete={'off'}
                />
              </FormControl>
              <FormControl variant="filled">
                <InputLabel>Clinic state</InputLabel>
                <Select
                  sx={{
                    backgroundColor: '#fcfcfb',
                  }}
                  autoComplete={'off'}
                  required
                  id="state"
                  value={formValue.state}
                  label="Clinic State *"
                  onChange={handleInput}
                >
                  {getStatesData().map((state) => (
                    <MenuItem
                      value={`${state.Code}`}
                      key={`${state.Code}`}
                      name={state.Code}
                    >
                      {state.State}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <BlackButton
                id="dietRegSubmit"
                disabled={loading}
                variant="contained"
                type={'submit'}
                sx={{
                  px: 2,
                  py: 1,
                  mt: 2,

                  fontSize: customTheme.smallScreen() ? '.7rem' : '.9rem',
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Submit'}
              </BlackButton>
            </Stack>
          </FormGroup>
        </form>
      </CardContent>
    </Grid>
  );
});
export default DietitianSignUp;
