import { useReducer, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import APIClient from '../../../../helpers/APIClient';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
import Client from '../../../../data_models/model/Client';
import ClientDTO from '../../../../data_models/dto/ClientDTO';
import BlueCircularProgress from '../../../reusable_ui_components/BlueCircularProgress';
import BlackButton from '../../../reusable_ui_components/BlackButton';

const ResetPassword = (props) => {
  const customTheme = useTheme();
  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: '',
      password: '',
      confirmPassword: '',
    }
  );

  const [autoFocusArray, setAutoFocusArray] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      password: true,
      confirmPassword: false,
    }
  );
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [redirect, setRedirect] = useState('');
  useEffect(() => {
    let mounted = true;
    if (mounted && redirect) {
      window.location.assign(redirect);
    }
    if (window.location.href.includes('client_id')) {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
      let clientId = params.client_id; // "some_value"
      setFormValue({ id: clientId });
    }
    if (window.location.href.includes('dietitian_id')) {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let dietitianId = params.dietitian_id;
      setFormValue({ id: dietitianId });
    }
  }, [redirect, props]);

  const resetAutoFocus = () => {
    const resetAutoFocus = {
      confirmPassword: false,
      password: false,
    };
    setAutoFocusArray(resetAutoFocus);
  };
  const handleInput = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    // state value
    setFormValue({ [id]: value });
    // setting the state unfocuses the user cursor in the form, and setting auto-focus to true fixes it, but autofocus can only be true for the input that is currently being typed in
    resetAutoFocus();
    setAutoFocusArray({ [id]: true });
  };
  const validate = (form) => {
    if (formValue.password !== formValue.confirmPassword) {
      setLoginError(true);
      return false;
    } else {
      setLoginError(false);
      return form.checkValidity();
    }
  };
  // input handlers
  const handleButtonClick = () => {
    resetAutoFocus();
    if (!loading) {
      setLoading(true);
      if (props.domain === 'dietitian') {
        APIClient.updateDietitianPassword(formValue).then(
          (updatedDietitian) => {
            LocalStorageManager.shared.dietitian = updatedDietitian;
            setRedirect('/dietitian-login');
          }
        );
      } else {
        APIClient.updateClientPassword(formValue).then((updatedClientData) => {
          const updatedClientDTO = new ClientDTO(updatedClientData);
          const updatedClient = new Client(updatedClientDTO);
          LocalStorageManager.shared.client = updatedClient;

          setRedirect('/client-login');
        });
      }
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
      <CardContent>
        <Grid item xs={12} margin={'0 auto'}>
          <form onSubmit={handleSubmit} autoComplete="new-password">
            <fieldset
              style={{
                boxShadow: customTheme.border.boxShadow.medium,
                padding: '4vh 5vw',
                boxSizing: 'border-box',
                margin: '0 10%',
                height: 'fit-content',
              }}
            >
              <FormGroup>
                <Grid container>
                  <Typography
                    width={'90%'}
                    fontSize={'2rem'}
                    textAlign={'center'}
                    margin={'0 auto'}
                    paddingBottom={'3vh'}
                    paddingTop={'2vh'}
                  >
                    Reset your password
                  </Typography>

                  <Grid item xs={12}>
                    <Stack
                      direction={'column'}
                      rowGap={2}
                      alignItems={'center'}
                    >
                      <FormHelperText hidden={!loginError} error={true}>
                        Your passwords don't match
                      </FormHelperText>
                      <TextField
                        required
                        type="password"
                        autoFocus={autoFocusArray.password}
                        fullWidth
                        label={'New Password'}
                        id="password"
                        sx={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: '80%',
                        }}
                        onChange={handleInput}
                        value={formValue.password}
                      />
                      <TextField
                        autoComplete="new-password"
                        required
                        type="password"
                        autoFocus={autoFocusArray.confirmPassword}
                        fullWidth
                        label={'Confirm New Password'}
                        // must set both name and autoComplete to 'new-password' this for autofill to stop
                        name="new-password"
                        id="confirmPassword"
                        sx={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: '80%',
                        }}
                        onChange={handleInput}
                        value={formValue.confirmPassword}
                      />
                      <BlackButton
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: '80%',
                          paddingTop: '1vh',
                          paddingBottom: '1vh',
                        }}
                      >
                        {loading ? <BlueCircularProgress /> : 'Submit'}
                      </BlackButton>
                    </Stack>
                  </Grid>
                </Grid>
              </FormGroup>
            </fieldset>
          </form>
        </Grid>
      </CardContent>
    </Grid>
  );
};
export default ResetPassword;
