import { useReducer, useState } from 'react';
import SearchLocationInput from '../../../client_sign_up/SearchLocationInput';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import APIClient from '../../../../../helpers/APIClient';
import ClientDTO from '../../../../../data_models/dto/ClientDTO';
import LocalStorageManager from '../../../../../helpers/LocalStorageManager';
import { getAddressObject } from '../../../client_sign_up/helpers/getAddressObject';
import CustomTextField from '../../../../shared_components/CustomTextField';
import styles from './scss/UpdateAddress.module.scss';
const UpdateAddress = () => {
  const [addressValueError, setAddressValueError] = useState(false);
  const [suiteError, setSuiteError] = useState('');
  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      address: '',
      street: '',
      suite: '',
      city: '',
      state: '',
      zipcode: '',
      zipcode_extension: '',
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
      const updatedClientDTO = ClientDTO.initializeFromClient(
        LocalStorageManager.shared.client
      );
      updatedClientDTO.address = formValue.address;
      updatedClientDTO.street = formValue.street;
      updatedClientDTO.suite = formValue.suite;
      updatedClientDTO.city = formValue.city;
      updatedClientDTO.state = formValue.state;
      updatedClientDTO.zipcode = formValue.zipcode;
      updatedClientDTO.zipcodeExtension = formValue.zipcode_extension;
      APIClient.updateClientAddress(updatedClientDTO).then(() => {
        LocalStorageManager.shared.client = updatedClientDTO;
        window.location.reload();
      });
    } else {
      setLoading(false);
      return false;
    }
  };
  return (
    <Grid item container className={styles.rootContainer} xs={10}>
      <Grid item container className={styles.childContainer}>
        <Grid container item className={styles.headerContainer}>
          <Grid item>
            <Typography className={styles.pageHeader}>
              Shipping Address
            </Typography>
          </Grid>
        </Grid>
        <Grid item container className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <Grid item container className={styles.contentContainer}>
              <Grid item container className={styles.currentAddressContainer}>
                <Grid item>
                  <Typography className={styles.bodyHeader}>
                    Current Shipping Address
                  </Typography>
                </Grid>
                <Grid item container>
                  <Typography>
                    {LocalStorageManager.shared.client.address}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item className={styles.updateAddressContainer}>
                <Grid item>
                  <Typography className={styles.bodyHeader}>
                    Update Shipping Address
                  </Typography>
                </Grid>
                <Grid container item>
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
                <Grid container item className={styles.formFields}>
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
                <Grid item>
                  <Button
                    className={styles.submitButton}
                    id="address"
                    variant="contained"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? (
                      <CircularProgress size={24} className={styles.progress} />
                    ) : (
                      'Update Address'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default UpdateAddress;
