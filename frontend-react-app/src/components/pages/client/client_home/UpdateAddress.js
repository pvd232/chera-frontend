import { useReducer, useState } from 'react';
import SearchLocationInput from './../../client_sign_up/SearchLocationInput';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import APIClient from '../../../../helpers/APIClient';
import BlackButton from '../../../shared_components/BlackButton';
import BlueCircularProgress from '../../../shared_components/BlueCircularProgress';
import { getAddressObject } from '../../client_sign_up/helpers/getAddressObject';
import CustomTextField from '../../../shared_components/CustomTextField';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
import { useNavigate } from 'react-router-dom';
const UpdateAddress = (props) => {
//   const customTheme = useTheme();
  const [addressValueError, setAddressValueError] = useState(false);
  const [suiteError, setSuiteError] = useState('');
  const navigate = useNavigate();
  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      // if the client secret exists then this page is being rerendered and all of these values have been inputted
      id: LocalStorageManager.shared.client.id,
      password: LocalStorageManager.shared.client.password,
      dietitian_id:LocalStorageManager.shared.client.dietitianId,
      meal_plan_id: LocalStorageManager.shared.client.mealPlanId,
      stripe_id: LocalStorageManager.shared.client.stripeId,
      first_name: LocalStorageManager.shared.client.firstName,
      last_name: LocalStorageManager.shared.client.lastName,
      address: '',
      street: '',
      suite: '',
      city: '',
      state: '',
      zipcode: '',
      zipcode_extension: '',
      phone_number: LocalStorageManager.shared.client.phoneNumber,
      datetime: Date.now(),
      notes: LocalStorageManager.shared.client.notes,
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
    if (status) {
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
      APIClient.updateClientAddress(formValue);
      setLoading(false);
      navigate('/home')
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
            <Grid
              container
              item
              direction={'column'}
              rowGap={'3vh'}
              alignItems={'center'}
            >
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
                    {loading ? <BlueCircularProgress /> : 'Update Address'}
                  </BlackButton>
                </Grid>
              </Grid>
            </Grid>
        </Grid>
      </Card>
    </form>
  );
};
export default UpdateAddress;
