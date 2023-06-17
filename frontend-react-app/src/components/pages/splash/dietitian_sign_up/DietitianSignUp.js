import { useReducer, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
import APIClient from '../../../../helpers/APIClient';
import DietitianDTO from '../../../../data_models/dto/DietitianDTO';
import Dietitian from '../../../../data_models/model/Dietitian';
import BlackButton from '../../../shared_components/BlackButton.ts';
import { getAddressObject } from '../../client_sign_up/helpers/getAddressObject';
import SearchLocationInput from '../../client_sign_up/SearchLocationInput';
import styles from './scss/DietitianSignUp.module.scss';
import ErrorMessage from './ErrorMessage';
import RegistrationErrorMessage from './RegistrationErrorMessage';
import CustomTextField from '../../../shared_components/CustomTextField';
const DietitianSignUp = () => {
  const [error, setError] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressValueError, setAddressValueError] = useState(false);
  const [suiteError, setSuiteError] = useState(false);
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
      address: '',
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
  };
  const validateAddress = async (addressObject) => {
    const validAddress = await APIClient.validateAddress(addressObject);
    if (validAddress.addressStatus === 'invalid') {
      setAddressValueError(true);
      return false;
    } else if (validAddress.addressStatus === 'missingSuite') {
      setSuiteError('Please enter your APT, Suite, etc.');
      return validAddress;
    } else if (validAddress.addressStatus === 'invalidSuite') {
      setSuiteError('Please enter a valid suite number.');
      return validAddress;
    } else {
      setAddressValueError(false);
      setSuiteError('');
      return validAddress;
    }
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
    if (formValue.suite !== '') {
      const addressParts = formValue.address.split(',');
      const newStreet = addressParts[0] + ' ' + formValue.suite;
      addressParts[0] = newStreet;
      const newAddress = addressParts.join(',');
      const validAddress = await validateAddress(getAddressObject(newAddress));

      if (validAddress.addressStatus !== 'valid') {
        return false;
      }
    }
    return form.checkValidity();
  };
  const handleAddress = async (address) => {
    if (address.split(',').length === 4) {
      const addressObject = getAddressObject(address);
      const validAddress = await validateAddress(addressObject);
      if (validAddress) {
        setFormValue(addressObject);
      }
    } else {
      setAddressValueError(true);
    }
  };
  return (
    <Grid container className={styles.dSignUpPageContainer}>
      <Grid item lg={4} md={6} xs={10}>
        <CardContent>
          <Typography className={styles.header}>Dietitian sign up</Typography>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Stack direction={'column'} rowGap={3}>
                <FormControl variant="filled">
                  <ErrorMessage error={error} />
                  <CustomTextField
                    required
                    fullWidth
                    label="Email"
                    id="id"
                    type="email"
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
                    onChange={handleInput}
                    value={formValue.lastName}
                  />
                </FormControl>
                <FormControl variant="filled">
                  <FormHelperText
                    hidden={!addressValueError}
                    error={true}
                    sx={{ marginBottom: '1.5vh' }}
                  >
                    {
                      'You chose an invalid address. Please choose another address from the dropdown.'
                    }
                  </FormHelperText>
                  <SearchLocationInput
                    dietitianInput={true}
                    onUpdate={(address) => handleAddress(address)}
                  />
                </FormControl>
                <FormControl variant="filled">
                  <FormHelperText
                    hidden={suiteError === ''}
                    error={true}
                    sx={{ marginBottom: '1.5vh' }}
                  >
                    {suiteError}
                  </FormHelperText>
                  <CustomTextField
                    disabled={suiteError === ''}
                    required
                    fullWidth
                    label="Suite"
                    id="suite"
                    onChange={handleInput}
                    value={formValue.suite}
                  />
                </FormControl>
                <FormControl variant="filled">
                  <RegistrationErrorMessage error={registrationError} />

                  <CustomTextField
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
                    type="url"
                    onChange={handleInput}
                    value={formValue.clinicUrl}
                    autoComplete={'off'}
                  />
                </FormControl>

                <BlackButton
                  id="dietRegSubmit"
                  disabled={loading}
                  variant="contained"
                  type={'submit'}
                  className={styles.submitButton}
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
