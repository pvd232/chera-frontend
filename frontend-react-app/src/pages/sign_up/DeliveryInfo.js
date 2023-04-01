import { useTheme } from '@mui/material/styles';
import { useReducer, useState } from 'react';
import Client from '../../data_models/model/Client';
import SearchLocationInput from './SearchLocationInput';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import BlackButton from '../../reusable_ui_components/BlackButton';
import capitalize from '../../helpers/capitalize';
import getStatesData from './helpers/getStatesData';
import BlueCircularProgress from '../../reusable_ui_components/BlueCircularProgress';
const DeliveryInfo = (props) => {
  const customTheme = useTheme();
  const [addressSelectError, setAddressSelectError] = useState(false);
  const [addressValueError, setAddressValueError] = useState(false);
  const [suiteError, setSuiteError] = useState(false);
  const [zipCodeError, setZipcodeError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      // if the client secret exists then this page is being rerendered and all of these values have been inputted

      id: props.stagedClientId,
      password: props.clientPassword,
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
      phoneNumber: '',
      datetime: Date.now(),
      notes: '',
      active: true,
    }
  );

  const [loading, setLoading] = useState(false);

  const handleInput = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    // state value
    if (id === undefined) {
      setFormValue({ state: value });
    } else if (id === 'phoneNumber') {
      const numberValue = Number(value);
      if (!isNaN(numberValue)) {
        setFormValue({ [id]: numberValue });
      }
    } else {
      setFormValue({ [id]: value });
    }
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
      const numberZipcode = Number(addressObject.zipcode);
      if (isNaN(numberZipcode)) {
        setAddressValueError(true);
        return false;
      }
      if (Array.from(addressObject.zipcode)[0] !== '0') {
        addressObject.zipcode = numberZipcode;
      }
      addressObject.suite = formValue.suite;

      setFormValue(addressObject);
    } else {
      return false;
    }
  };

  const validate = (form) => {
    const status = form.checkValidity();
    setZipcodeError(false);
    setPhoneError(false);
    setAddressSelectError(false);
    setSuiteError(false);
    if (status) {
      if (formValue.address === '' || formValue.street === '') {
        setAddressSelectError(true);
        return false;
      } else if (formValue.suite === '') {
        // many ppl will forget suite and it is critical for NE deliveries, so this serves as an extra validation
        setSuiteError(true);
        return false;
      } else if (
        isNaN(Number(formValue.zipcode)) ||
        String(formValue.zipcode).length < 5
      ) {
        setZipcodeError(true);
        return false;
      } else if (isNaN(Number(formValue.phoneNumber !== 'number'))) {
        setPhoneError(true);
        return false;
      } else {
        return true;
      }
    } else {
      // triggers form validation messages if the user is editing their delivery information
      return form.reportValidity();
    }
  };
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;

    // // check that all required values have been populated before triggering button click
    if (validate(form)) {
      const newClient = new Client(formValue);
      // if suite is none then reset it to be empty string
      if (newClient.suite === 'None' || newClient.suite === 'none') {
        newClient.suite = '';
      }
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
            <>
              <Grid item xs={5.5}>
                <Stack spacing={3}>
                  <TextField
                    autoComplete="new-password"
                    required
                    fullWidth
                    label={'First Name'}
                    id="firstName"
                    onChange={handleInput}
                    value={formValue.firstName}
                  />
                  <FormHelperText
                    hidden={!(addressValueError || addressSelectError)}
                    error={true}
                  >
                    {addressSelectError
                      ? 'Please select a suggested address. If no suggestions appear, refresh the page and try again.'
                      : addressValueError
                      ? 'You chose an invalid address'
                      : ''}
                  </FormHelperText>
                  <SearchLocationInput
                    street={formValue.street}
                    onUpdate={(address, isStreet = false) => {
                      if (isStreet) {
                        setFormValue({ street: address.trim() });
                      } else {
                        handleAddress(address);
                      }
                    }}
                  />
                  <TextField
                    autoComplete="new-password"
                    required
                    fullWidth
                    label={'City'}
                    id="city"
                    onChange={handleInput}
                    value={formValue.city}
                  />
                  <FormControl fullWidth>
                    <InputLabel>State *</InputLabel>
                    <Select
                      autoComplete={'new-password'}
                      required
                      id="state"
                      value={formValue.state}
                      label="State *"
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
                </Stack>
              </Grid>
              <Grid item xs={5.5}>
                <Stack spacing={3}>
                  <TextField
                    autoComplete="new-password"
                    required
                    fullWidth
                    label={'Last Name'}
                    id="lastName"
                    onChange={handleInput}
                    value={formValue.lastName}
                  />
                  <FormHelperText hidden={!suiteError} error={true}>
                    Please enter your suite or enter "none"
                  </FormHelperText>
                  <TextField
                    autoComplete="new-password"
                    fullWidth
                    label={'Apt, Suite, or Unit Number'}
                    id="suite"
                    onChange={handleInput}
                    value={formValue.suite}
                  />
                  <FormHelperText hidden={!zipCodeError} error={true}>
                    Please enter a valid zipcode
                  </FormHelperText>
                  <TextField
                    autoComplete="new-password"
                    type="tel"
                    required
                    fullWidth
                    label={'Zipcode'}
                    id="zipcode"
                    onChange={handleInput}
                    value={formValue.zipcode}
                  />
                  <FormHelperText hidden={!phoneError} error={true}>
                    Please enter a valid number
                  </FormHelperText>
                  <TextField
                    autoComplete="new-password"
                    type="tel"
                    required
                    fullWidth
                    label={'Phone Number'}
                    id="phoneNumber"
                    onChange={handleInput}
                    value={formValue.phoneNumber}
                  />
                </Stack>
              </Grid>
              <Grid
                container
                item
                xs={12}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <BlackButton
                  id="address"
                  variant="contained"
                  disabled={loading}
                  type="submit"
                  sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '50%',
                    paddingTop: '1vh',
                    paddingBottom: '1vh',
                    marginTop: '5vh',
                    marginBottom: '2vh',
                  }}
                >
                  {loading ? <BlueCircularProgress /> : 'Continue to billing'}
                </BlackButton>
              </Grid>
            </>
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
export default DeliveryInfo;
