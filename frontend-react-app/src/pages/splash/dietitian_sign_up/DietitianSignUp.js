import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';

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
import WhiteInput from './WhiteInput';
const DietitianSignUp = React.forwardRef((props, ref) => {
  const customTheme = useTheme();

  const [error, setError] = useState(false);
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
    return form.checkValidity();
  };

  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: '',
      password: '',
      firstName: '',
      lastName: '',
      clinicName: '',
      clinicZipcode: '',
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
      sx={{
        backgroundColor: customTheme.palette.lightGrey.secondary,
        py: 10,
      }}
      ref={ref}
    >
      <CardContent>
        <Typography
          fontSize="2.5rem"
          color={customTheme.palette.black.main}
          textAlign={'center'}
          fontWeight={'500'}
          sx={{
            mb: 10,
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
                <WhiteInput
                  required
                  fullWidth
                  placeholder="Email"
                  id="id"
                  type="email"
                  sx={{
                    mx: 'auto',
                  }}
                  onChange={handleInput}
                  value={formValue.id}
                />
              </FormControl>
              <FormControl variant="filled">
                <WhiteInput
                  required
                  error
                  type="password"
                  autoComplete={'new-password'}
                  fullWidth
                  placeholder="Choose a password"
                  id="password"
                  sx={{
                    mx: 'auto',
                  }}
                  onChange={handleInput}
                  value={formValue.password}
                />
              </FormControl>
              <FormControl variant="filled">
                <WhiteInput
                  required
                  error
                  fullWidth
                  placeholder="First name"
                  id="firstName"
                  sx={{
                    mx: 'auto',
                  }}
                  onChange={handleInput}
                  value={formValue.firstName}
                />
              </FormControl>
              <FormControl variant="filled">
                <WhiteInput
                  required
                  error
                  fullWidth
                  placeholder="Last name"
                  id="lastName"
                  sx={{
                    mx: 'auto',
                  }}
                  onChange={handleInput}
                  value={formValue.lastName}
                />
              </FormControl>
              <FormControl variant="filled">
                <WhiteInput
                  required
                  error
                  fullWidth
                  placeholder="Clinic name"
                  id="clinicName"
                  sx={{
                    mx: 'auto',
                  }}
                  onChange={handleInput}
                  value={formValue.clinicName}
                  autoComplete={'off'}
                />
              </FormControl>
              <FormControl variant="filled">
                <WhiteInput
                  required
                  error
                  fullWidth
                  placeholder="Clinic zipcode"
                  id="clinicZipcode"
                  sx={{
                    mx: 'auto',
                  }}
                  onChange={handleInput}
                  value={formValue.clinicZipcode}
                  autoComplete={'off'}
                />
              </FormControl>

              <BlackButton
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
