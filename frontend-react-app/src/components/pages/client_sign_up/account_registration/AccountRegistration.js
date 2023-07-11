import { v4 as uuid } from 'uuid';
import { useTheme } from '@mui/material/styles';
import { useReducer, useState } from 'react';
// import CardContent from '@mui/material/CardContent';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MealSubscription from '../../../../data_models/model/MealSubscription.js';
import BlackButton from '../../../shared_components/BlackButton.ts';
import BlueCircularProgress from '../../../shared_components/BlueCircularProgress.js';
import HowItWorks from './HowItWorks.js';
import CustomTextField from '../../../shared_components/CustomTextField.js';
import { validateZipcode } from './helpers/validateZipcode.js';
import APIClient from '../../../../helpers/APIClient.js';
import COGSDTO from '../../../../data_models/dto/COGSDTO.js';

const AccountRegistration = (props) => {
  const customTheme = useTheme();

  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      // if the client secret exists then this page is being rerendered and all of these values have been inputted

      id: props.stagedClientId,
      password: '',
      confirmPassword: '',
      zipcode: '',
    }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [zipcodeError, setZipcodeError] = useState(false);

  const handleInput = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    if (id === 'confirm-password') {
      setFormValue({ confirmPassword: value });
    } else {
      setFormValue({ [id]: value });
    }
  };
  const validate = (form) => {
    if (formValue.password !== formValue.confirmPassword) {
      setError(true);
      return false;
    } else if (!validateZipcode(formValue.zipcode)) {
      setZipcodeError(true);
      return false;
    }
    setError(false);
    setZipcodeError(false);
    return form.checkValidity();
  };

  // Input handlers
  const handleButtonClick = async () => {
    if (!loading) {
      setLoading(true);
      const mealSubscriptionObject = {
        id: uuid(),
        clientId: formValue.id,
        dietitianId: props.dietitianId,
        stripeSubscriptionId: '',
        shippingRate: props.shippingRate,
        datetime: Date.now(),
        paused: false,
        active: true,
      };
      props.updateZipcode(formValue.zipcode)
      const shippingCostPerBox = await APIClient.getShippingRate(
        formValue.zipcode
      );
      props.updateShippingRate(shippingCostPerBox);
      const cogsData = await APIClient.getCOGS();
      const cogsDTOs = cogsData.map((cog) => new COGSDTO(cog));

      props.updateCOGS(cogsDTOs);
      const mealSubscription = new MealSubscription(mealSubscriptionObject);
      props.updateMealSubscription(mealSubscription);
      props.updateClientPassword(formValue.password);

      setLoading(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    // check that all required values have been populated before triggering button click
    if (validate(form)) {
      handleButtonClick();
    }
  };

  return (
    <Grid container justifyContent={'center'}>
      {/* <CardContent> */}
      <Grid item xs={12}>
        <form onSubmit={handleSubmit} autoComplete="new-password">
          <fieldset
            style={{
              boxShadow: customTheme.border.boxShadow.medium,
              padding: '2vh 5vw',
              boxSizing: 'border-box',
              margin: '0 10%',
              marginLeft: '10%',
              marginRight: '10%',
              marginBottom: '1%',
              maxHeight: '85vh',
              border: 'none',
            }}
          >
            <FormGroup>
              <Grid container>
                <Typography
                  width={'80%'}
                  fontSize={'2rem'}
                  textAlign={'center'}
                  margin={'0 auto'}
                  marginBottom={'5vh'}
                  marginTop={'2vh'}
                  color={customTheme.palette.olive.main}
                >
                  Sign up
                </Typography>

                <HowItWorks customTheme={customTheme} />
                <Grid item lg={6} xs={12} sx={{ marginTop: '4vh' }}>
                  <Stack direction={'column'} rowGap={3}>
                    {/* AUTH */}
                    {/* This is where we initialize the client's username and password. We store them temporarily in the state of the React component until the client completes the entire sign up flow. */}
                    {/* Here we capture the client's username */}
                    <CustomTextField
                      required
                      fullWidth
                      label={'Email'}
                      id="id"
                      sx={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '80%',
                      }}
                      inputProps={{
                        style: { fontSize: customTheme.fontEqualizer(14) },
                      }} // font size of input text
                      disabled={true}
                      value={formValue.id}
                    />

                    <>
                      {/* AUTH */}
                      {/* Here we capture the client's password */}
                                        
                      <CustomTextField
                        required
                        type="text"
                        fullWidth
                        label={'Zipcode'}
                        // must set both name and autoComplete to 'new-password' this for autofill to stop
                        name="zipcode"
                        id="zipcode"
                        sx={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: '80%',
                        }}
                        inputProps={{
                          style: { fontSize: customTheme.fontEqualizer(14) },
                        }} // font size of input text
                        InputLabelProps={{
                          style: { fontSize: customTheme.fontEqualizer(14) },
                        }}
                        onChange={handleInput}
                        value={formValue.zipcode}
                        error={zipcodeError}
                        helperText={
                          zipcodeError ? 'Please enter a valid zipcde' : ''
                        }
                      />
                    </>

                    <BlackButton
                      id="password-button"
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '80%',
                        paddingTop: '1vh',
                        paddingBottom: '1vh',
                        borderRadius: '30px',
                        backgroundColor: customTheme.palette.olive.main,
                        color: customTheme.palette.white1.main,
                      }}
                    >
                      {loading ? <BlueCircularProgress /> : 'Select meals'}
                    </BlackButton>
                    {/* <Typography
                        fontFamily={'Inter'}
                        fontSize={customTheme.fontEqualizer(12)}
                        color={customTheme.palette.secondaryText.main}
                        sx={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: '80%',
                        }}
                      >
                        By clicking above, you agree to our{' '}
                        <a href="/">Terms of Use</a> and consent to our{' '}
                        <a href="/">Privacy Policy</a>
                      </Typography> */}
                  </Stack>
                </Grid>
              </Grid>
            </FormGroup>
          </fieldset>
        </form>
      </Grid>
      {/* </CardContent> */}
    </Grid>
  );
};
export default AccountRegistration;
