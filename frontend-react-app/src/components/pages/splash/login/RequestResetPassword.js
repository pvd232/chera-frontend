import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import BlackButton from '../../../shared_components/BlackButton.ts';
import APIClient from '../../../../helpers/APIClient.js';

const RequestResetPassword = (props) => {
  const customTheme = useTheme();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetpasswordError, setResetPasswordError] = useState(false);
  const [showText, setShowText] = useState(false);

  const validate = (form) => {
    return form.checkValidity();
  };
  // input handlers
  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      if (props.domain === 'dietitian') {
        APIClient.requestResetDietitianPassword(email).then((value) => {
          setLoading(false);
          if (value) {
            setShowText(true);
          } else {
            setResetPasswordError(true);
          }
        });
      } else {
        APIClient.requestResetClientPassword(email).then((value) => {
          setLoading(false);

          if (value) {
            setShowText(true);
          } else {
            setResetPasswordError(true);
          }
        });
      }
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
                    paddingBottom={'5vh'}
                    paddingTop={'6vh'}
                  >
                    Reset your password
                  </Typography>

                  <Grid item xs={12}>
                    <Stack direction={'column'} alignItems={'center'}>
                      <FormHelperText hidden={!resetpasswordError} error={true}>
                        Your email is incorrect
                      </FormHelperText>
                      <TextField
                        required
                        fullWidth
                        label={'Email'}
                        id="id"
                        sx={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          marginBottom: '5vh',
                          marginTop: '2vh',
                          width:
                            window.innerWidth < 450
                              ? '80%'
                              : window.innerWidth < 950
                              ? '75%'
                              : '70%',
                        }}
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                        value={email}
                      />
                      <BlackButton
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                          fontSize: '.75rem',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width:
                            window.innerWidth < 450
                              ? '80%'
                              : window.innerWidth < 950
                              ? '75%'
                              : '70%',
                          paddingTop: '1vh',
                          paddingBottom: '1vh',
                          marginBottom: '5vh',
                        }}
                      >
                        {loading ? (
                          <CircularProgress
                            size={24}
                            sx={{
                              color: `${customTheme.palette.black.main}`,
                            }}
                          />
                        ) : (
                          'Send Password Reset Email'
                        )}
                      </BlackButton>

                      <Typography
                        sx={{
                          opacity: showText ? 1 : 0,
                          marginBottom: '5vh',
                        }}
                      >
                        A link to reset your password has been sent to your
                        email.
                      </Typography>
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
export default RequestResetPassword;
