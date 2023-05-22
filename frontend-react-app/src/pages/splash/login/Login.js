import { useReducer, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import BlackButton from '../../../reusable_ui_components/BlackButton.ts';
import FormHelperText from '@mui/material/FormHelperText';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import APIClient from '../../../helpers/APIClient';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import Client from '../../../data_models/model/Client';
import ClientDTO from '../../../data_models/dto/ClientDTO';
import DietitianDTO from '../../../data_models/dto/DietitianDTO';
import Dietitian from '../../../data_models/model/Dietitian';
import BlueCircularProgress from '../../../reusable_ui_components/BlueCircularProgress';

const Login = (props) => {
  const customTheme = useTheme();
  // AUTH
  // This is where we set the state of the React component to the dietitian and client's username and password. The state is updated as they type in their credentials
  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: '',
      password: '',
    }
  );

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [redirect, setRedirect] = useState('');
  useEffect(() => {
    let mount = true;
    if (mount && redirect) {
      window.location.assign(redirect);
    }
    return () => (mount = false);
  }, [redirect, props]);

  const handleInput = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    // State value
    setFormValue({ [id]: value });
  };
  const validate = (form) => {
    return form.checkValidity();
  };
  // Input handlers
  const handleButtonClick = () => {
    // AUTH
    // Here we check if the user is a dietitian or client and then call the appropriate API endpoint to authenticate them
    if (props.domain === 'dietitian') {
      APIClient.authenticateDietitian(formValue).then((dietitianData) => {
        // If the credentials were correct, the backend returns the dietitians's information and the value of dietitianData (which is the value returned by the server) above is JSON data
        if (dietitianData) {
          const dietitianDTO = new DietitianDTO(dietitianData);
          const dietitianModel = new Dietitian(dietitianDTO);
          LocalStorageManager.shared.dietitian = dietitianModel;
          // We set the homeUrl property of the LocalStorageManager to the dietitian's home page
          LocalStorageManager.shared.homeUrl = '/d-home';
          // We set the redirect state to the dietitian's home page, which triggers the useEffect above to redirect the user to the dietitian's home page
          setRedirect('/d-home');
        } else {
          // Otherwise, the value of dietitianData and we set the loginError state to true to show an error message
          setLoginError(true);
          setLoading(false);
        }
      });
    } else {
      // AUTH
      // The process is idential for the client
      APIClient.authenticateClient(formValue).then((clientData) => {
        if (clientData) {
          const clientDTO = new ClientDTO(clientData);
          const clientModel = new Client(clientDTO);
          LocalStorageManager.shared.client = clientModel;
          LocalStorageManager.shared.homeUrl = '/home';
          setRedirect('/home');
        } else {
          setLoginError(true);
          setLoading(false);
        }
      });
    }
  };
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;

    // Check that all required values have been populated before triggering button click
    if (validate(form)) {
      handleButtonClick();
    } else {
      setLoading(false);
    }
  };
  return (
    <Grid
      container
      justifyContent={'center'}
      sx={{ position: 'fixed', top: '25%', bottom: '25%' }}
    >
      <CardContent>
        <Grid item xs={12} margin={'0 auto'}>
          <form onSubmit={handleSubmit} autoComplete="new-password">
            <fieldset
              style={{
                padding: '4vh 5vw',
                boxSizing: 'border-box',
                margin: '0 10%',
                border: 'none',
                boxShadow: customTheme.border.boxShadow.medium,
              }}
            >
              <FormGroup>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      fontSize={'2rem'}
                      textAlign={'center'}
                      margin={'0 auto'}
                      paddingBottom={'3vh'}
                      paddingTop={'2vh'}
                    >
                      {props.domain === 'client'
                        ? 'Client Login'
                        : 'Dietitian Login'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction={'column'}
                      rowGap={3}
                      alignItems={'center'}
                    >
                      <FormHelperText hidden={!loginError} error={true}>
                        Your email or password were incorrect
                      </FormHelperText>
                      <TextField
                        required
                        fullWidth
                        label={'Email'}
                        id="username"
                        sx={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: '100%',
                        }}
                        onChange={handleInput}
                        value={formValue.username}
                      />
                      <TextField
                        autoComplete="new-password"
                        required
                        type="password"
                        fullWidth
                        label={'Password'}
                        // must set both name and autoComplete to 'new-password' this for autofill to stop
                        name="password"
                        id="password"
                        sx={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: '100%',
                        }}
                        onChange={handleInput}
                        value={formValue.password}
                      />
                    </Stack>
                    <Stack
                      direction={'column'}
                      rowGap={2}
                      alignItems={'center'}
                      marginTop={'5vh'}
                    >
                      <BlackButton
                        id="login-submit"
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
                        {loading ? <BlueCircularProgress /> : 'Login'}
                      </BlackButton>
                      <Link
                        to={`/request-reset-${props.domain}-password`}
                        style={{ marginLeft: '1vw', textDecoration: 'none' }}
                      >
                        Forgot password
                      </Link>
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
export default Login;
