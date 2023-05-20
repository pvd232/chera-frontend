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
import FormHelperText from '@mui/material/FormHelperText';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import APIClient from '../../../helpers/APIClient';
import DietitianDTO from '../../../data_models/dto/DietitianDTO';
import Dietitian from '../../../data_models/model/Dietitian';
import BlackButton from '../../../reusable_ui_components/BlackButton';
import ErrorMessage from './ErrorMessage';
import RegistrationErrorMessage from './RegistrationErrorMessage';
import CustomTextField from './CustomTextField';
import SearchLocationInput from '../../sign_up/SearchLocationInput';
const DietitianSignUp = () => {
  const customTheme = useTheme();

  const [error, setError] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressValueError, setAddressValueError] = useState(false);
  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: '',
      password: '',
      firstName: '',
      lastName: '',
      dieteticRegistrationNumber: '',
      street: '',
      suite: '',
      city: '',
      state: '',
      zipcode: '',
      clinicUrl: '',
      datetime: Date.now(),
      clients: [],
      active: true,
      admin: false,
    }
  );

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
  const handleAddress = async (address) => {
    setAddressValueError(false);
    if (address.split(',').length === 4) {
      const addressObject = {};
      addressObject.address = address;
      const addressArray = address.split(',');
      addressObject.street = addressArray[0].trim();
      addressObject.city = addressArray[1].trim();
      const stateZipcodeArray = addressArray[2].split(' ');
      addressObject.state = stateZipcodeArray[1];
      addressObject.zipcode = stateZipcodeArray[2];
      if (
        !addressObject.address ||
        !addressObject.city ||
        !addressObject.state ||
        !addressObject.street ||
        !addressObject.zipcode
      ) {
        setAddressValueError(true);
        return false;
      }
      const validAddress = await APIClient.validateAddress(addressObject);
      if (!validAddress) {
        setAddressValueError(true);
        return false;
      }
      const suiteWasInputted = (() => {
        // Get suite data from address components - too difficult to parse from address string
        for (const addressComponent of validAddress.address.addressComponents) {
          if (addressComponent.componentType === 'subpremise') {
            addressObject.suite = addressComponent.componentName.text;
            return true;
          }
        }
      })();

      if (!suiteWasInputted) {
        addressObject.suite = formValue.suite;
      }
      setFormValue(addressObject);
    } else {
      setAddressValueError(true);
      return false;
    }
  };
  return (
    <Grid
      container
      justifyContent={'center'}
      py={customTheme.pages.splash.spacing.pages}
      sx={{
        backgroundColor: customTheme.palette.fucia2.light,
      }}
    >
      <Grid item lg={4} md={6} xs={10}>
        <CardContent>
          <Typography
            className="splash-page-header"
            mb={{
              xs: '5vh',
              sm: '5vh',
              md: '10vh',
              lg: '10vh',
            }}
          >
            Dietitian sign up
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Stack direction={'column'} rowGap={2}>
                <FormControl variant="filled">
                  <ErrorMessage error={error} />
                  <CustomTextField
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
                  <CustomTextField
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
                  <CustomTextField
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
                  <CustomTextField
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

                  <CustomTextField
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
                  <CustomTextField
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
                  <FormHelperText
                    hidden={!addressValueError}
                    error={true}
                    sx={{ marginBottom: '2vh' }}
                  >
                    You chose an invalid address. Please choose another address
                    from the dropdown.
                  </FormHelperText>
                  <SearchLocationInput
                    dietitianInput={true}
                    street={formValue.street}
                    onUpdate={(address) => handleAddress(address)}
                  />
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
    </Grid>
  );
};
export default DietitianSignUp;
