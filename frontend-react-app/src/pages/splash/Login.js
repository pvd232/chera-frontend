import { useReducer, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import BlackButton from '../../reusable_ui_components/BlackButton';
import FormHelperText from '@mui/material/FormHelperText';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import APIClient from '../../helpers/APIClient';
import LocalStorageManager from '../../helpers/LocalStorageManager';
import Client from '../../data_models/model/Client';
import ClientDTO from '../../data_models/dto/ClientDTO';
import DietitianDTO from '../../data_models/dto/DietitianDTO';
import Dietitian from '../../data_models/model/Dietitian';
import BlueCircularProgress from '../../reusable_ui_components/BlueCircularProgress';
const Login = (props) => {
  const customTheme = useTheme();
  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: '',
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

    // state value
    setFormValue({ [id]: value });
  };
  const validate = (form) => {
    return form.checkValidity();
  };
  // input handlers
  const handleButtonClick = () => {
    if (props.domain === 'dietitian') {
      APIClient.authenticateDietitian(formValue).then((dietitianData) => {
        if (dietitianData) {
          const dietitianDTO = new DietitianDTO(dietitianData);
          const verifiedDietitian = new Dietitian(dietitianDTO);
          LocalStorageManager.shared.dietitian = verifiedDietitian;
          LocalStorageManager.shared.homeUrl = '/d-home';
          setRedirect('/d-home');
        } else {
          setLoginError(true);
          setLoading(false);
        }
      });
    } else {
      APIClient.authenticateClient(formValue).then((clientData) => {
        if (clientData) {
          const clientDTO = new ClientDTO(clientData);
          const returnedClient = new Client(clientDTO);
          LocalStorageManager.shared.client = returnedClient;
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

    // check that all required values have been populated before triggering button click
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
                        id="id"
                        sx={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: '100%',
                        }}
                        onChange={handleInput}
                        value={formValue.id}
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
