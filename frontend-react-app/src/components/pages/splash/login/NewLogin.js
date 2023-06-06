import { useReducer, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import APIClient from '../../../../helpers/APIClient';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
import Client from '../../../../data_models/model/Client';
import ClientDTO from '../../../../data_models/dto/ClientDTO';
import DietitianDTO from '../../../../data_models/dto/DietitianDTO';
import Dietitian from '../../../../data_models/model/Dietitian';
import BlackButton from '../../../reusable_ui_components/BlackButton';
import CustomTextField from '../dietitian_sign_up/CustomTextField';
import styles from './scss/Login.module.scss';

const NewLogin = (props) => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [redirect, setRedirect] = useState('');
  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: '',
      password: '',
    }
  );
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
    if (props.domain === 'dietitian') {
      APIClient.authenticateDietitian(formValue).then((dietitianData) => {
        if (dietitianData) {
          const dietitianDTO = new DietitianDTO(dietitianData);
          const dietitianModel = new Dietitian(dietitianDTO);
          LocalStorageManager.shared.dietitian = dietitianModel;
          // We set the redirect state to the dietitian's home page, which triggers the useEffect above to redirect the user to the dietitian's home page
          setRedirect('/d-home');
        } else {
          // Otherwise, the value of dietitianData and we set the loginError state to true to show an error message
          setLoginError(true);
          setLoading(false);
        }
      });
    } else {
      APIClient.authenticateClient(formValue).then((clientData) => {
        if (clientData) {
          const clientDTO = new ClientDTO(clientData);
          const clientModel = new Client(clientDTO);
          LocalStorageManager.shared.client = clientModel;
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
    <Grid container className={styles.pageContainer}>
      <Grid item lg={4} md={6} xs={10}>
        <CardContent>
          <Typography className={styles.header}>Log in</Typography>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Stack direction={'column'} rowGap={3}>
                <FormControl variant="filled">
                  <FormHelperText hidden={!loginError} error={true}>
                    Your email or password were incorrect
                  </FormHelperText>
                  <CustomTextField
                    required
                    fullWidth
                    label="Email"
                    id="username"
                    type="email"
                    onChange={handleInput}
                    value={formValue.id}
                    className={styles.formRow}
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
                    className={styles.formRow}
                  />
                </FormControl>
                <BlackButton
                  id="login-submit"
                  type="submit"
                  variant="contained"
                  disabled={loading}
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
export default NewLogin;
