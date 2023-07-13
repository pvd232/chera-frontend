import { useTheme } from '@mui/material/styles';
import { useReducer, useState } from 'react';
import Client from '../../../data_models/model/Client';
import SearchLocationInput from './SearchLocationInput';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import APIClient from '../../../helpers/APIClient';
import BlackButton from '../../shared_components/BlackButton';
import capitalize from '../../../helpers/capitalize';
import BlueCircularProgress from '../../shared_components/BlueCircularProgress';
import { getAddressObject } from './helpers/getAddressObject';
import CustomTextField from '../../shared_components/CustomTextField';
const DeliveryForm = (props) => {
  const customTheme = useTheme();
  const [addressValueError, setAddressValueError] = useState(false);
  const [suiteError, setSuiteError] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      // if the client secret exists then this page is being rerendered and all of these values have been inputted

      id: props.stagedClientId,
      dietitianId: props.dietitianId,
      mealPlanId: props.mealPlanId,
      stripeId: '',
      firstName: '',
      lastName: '',
      address: '',
      street: '',
      suite: '',
      city: '',
      state: '',
      zipcode: '',
      zipcodeExtension: '',
      phoneNumber: '',
      datetime: Date.now(),
      notes: '',
      active: true,
    }
  );

  const [loading, setLoading] = useState(false);
  const handleInput = async (event) => {
    const id = event.target.id;
    const value = event.target.value;
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

  const handleAddress = async (address) => {
    setFormValue({ suite: '' });
    if (address.split(',').length === 4) {
      const addressObject = getAddressObject(address);
      const validAddress = await validateAddress(addressObject);
      if (!validAddress) {
        return false;
      }

      setFormValue({
        zipcodeExtension:
          validAddress.addressResult.uspsData.standardizedAddress
            .zipCodeExtension,
      });

      setFormValue(addressObject);
    } else {
      setAddressValueError(true);
      return false;
    }
  };

  const validate = async (form) => {
    const status = form.checkValidity();
    setPhoneError(false);
    if (status) {
      const rawPhoneNumber = formValue.phoneNumber.split('-').join('');
      if (rawPhoneNumber.length !== 10) {
        setPhoneError(true);
        return false;
      } else if (isNaN(Number(rawPhoneNumber))) {
        setPhoneError(true);
        return false;
      }
      const addressParts = formValue.address.split(',');
      const newStreet = addressParts[0] + ' ' + formValue.suite;
      addressParts[0] = newStreet;
      const newAddress = addressParts.join(',');
      const validAddress = await validateAddress(getAddressObject(newAddress));

      if (validAddress.addressStatus === 'valid') {
        return true;
      } else {
        return false;
      }
    } else {
      // Triggers form validation messages if the user is editing their delivery information
      return form.reportValidity();
    }
  };
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;

    const validated = await validate(form);
    // Check that all required values have been populated before triggering button click
    if (validated) {
      const newClient = new Client(formValue);
      props.handleSubmit(newClient);
    } else {
      setLoading(false);
      return false;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card variant={'outlined'} sx={{ height: '100%' }}>
        <Grid
          container
          padding={'1vh 2vw 1vh 2vw'}
          marginBottom={'2vh'}
          justifyContent={'space-between'}
        >
          <Grid item container justifyContent={'center'}>
            <Typography
              fontSize={'1.7rem'}
              textAlign={'start'}
              marginBottom={'4vh'}
              marginTop={'3vh'}
            >
              Delivery Information
            </Typography>
          </Grid>
          {props.editAddress === true ? (
            <Grid
              container
              item
              direction={'column'}
              rowGap={'3vh'}
              alignItems={'center'}
            >
              <Grid container item justifyContent={'space-between'}>
                <Grid item xs={5.8}>
                  <CustomTextField
                    autoComplete="new-password"
                    required
                    fullWidth
                    label={'First Name'}
                    id="firstName"
                    onChange={handleInput}
                    value={formValue.firstName}
                  />
                </Grid>
                <Grid item xs={5.8}>
                  <CustomTextField
                    autoComplete="new-password"
                    required
                    fullWidth
                    label={'Last Name'}
                    id="lastName"
                    onChange={handleInput}
                    value={formValue.lastName}
                  />
                </Grid>
              </Grid>
              <Grid container item rowGap={'1vh'}>
                <Grid item xs={12}>
                  <FormHelperText hidden={!addressValueError} error={true}>
                    {'Please enter a valid address.'}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <SearchLocationInput
                    onUpdate={(address) => handleAddress(address)}
                  />
                </Grid>
              </Grid>
              <Grid container item justifyContent={'space-between'}>
                <Grid item xs={5.8}>
                  <CustomTextField
                    disabled={true}
                    fullWidth
                    label={'City'}
                    id="city"
                    value={formValue.city}
                  />
                </Grid>
                <Grid item xs={5.8}>
                  <CustomTextField
                    disabled={true}
                    fullWidth
                    label={'State'}
                    id="state"
                    value={formValue.state}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                item
                justifyContent={'space-between'}
                alignItems={'flex-end'}
              >
                <Grid container item xs={5.8} rowGap={'1vh'}>
                  <Grid item xs={12}>
                    <FormHelperText hidden={suiteError === ''} error={true}>
                      {suiteError}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      disabled={suiteError === ''}
                      fullWidth
                      label={suiteError !== '' ? 'Suite* (Ex: #1A)' : 'Suite'}
                      id="suite"
                      onChange={handleInput}
                      value={formValue.suite}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={5.8}>
                  <CustomTextField
                    disabled={true}
                    autoComplete="new-password"
                    type="text"
                    fullWidth
                    label={'Zipcode'}
                    id="zipcode"
                    value={formValue.zipcode}
                  />
                </Grid>
              </Grid>
              <Grid container item rowGap={'1vh'}>
                <Grid item xs={12}>
                  <FormHelperText hidden={!phoneError} error={true}>
                    Please enter a valid number
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    autoComplete="new-password"
                    type="tel"
                    required
                    fullWidth
                    label={'Phone Number (Ex: 232-921-7890)'}
                    id="phoneNumber"
                    onChange={handleInput}
                    value={formValue.phoneNumber}
                  />
                </Grid>
              </Grid>
              <Grid container item justifyContent={'center'}>
                <Grid item>
                  <BlackButton
                    sx={{
                      padding: '1vh 2vw 1vh 2vw',
                    }}
                    id="address"
                    variant="contained"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? <BlueCircularProgress /> : 'Continue to billing'}
                  </BlackButton>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Stack justifyContent={'flex-start'} spacing={3}>
              <Typography
                fontSize={'1rem'}
                textAlign={'start'}
                color={customTheme.palette.darkGrey.secondary}
              >
                {`${capitalize(formValue.firstName)} ${capitalize(
                  formValue.lastName
                )}`}
              </Typography>
              <Typography
                fontSize={'1rem'}
                textAlign={'start'}
                color={customTheme.palette.darkGrey.secondary}
              >
                {formValue.address}
              </Typography>

              <Typography
                fontSize={'1rem'}
                textAlign={'start'}
                color={customTheme.palette.darkGrey.secondary}
              >
                {formValue.phoneNumber}
              </Typography>
            </Stack>
          )}
        </Grid>
      </Card>
    </form>
  );
};
export default DeliveryForm;
