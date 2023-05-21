import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BlackButton from '../../../reusable_ui_components/BlackButton.ts';
import Stack from '@mui/material/Stack';

const LoginSignUpChoice = () => {
  const customTheme = useTheme();
  const navigate = useNavigate();
  return (
    <Grid
      container
      justifyContent={'center'}
      sx={{ position: 'fixed', top: '25%', bottom: '25%' }}
    >
      <CardContent>
        <Grid item xs={12}>
          <div
            style={{
              boxShadow: customTheme.border.boxShadow.medium,
              padding: '10vh 5vw',
              boxSizing: 'border-box',
            }}
          >
            <Grid
              item
              container
              xs={12}
              justifyContent={'center'}
              alignItems={'center'}
              height={'100%'}
            >
              <Grid item>
                <Typography
                  fontSize={'1.5rem'}
                  textAlign={'center'}
                  margin={'0 auto'}
                  mb={10}
                >
                  Let's get started
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack direction={'column'} rowGap={3}>
                  <BlackButton
                    variant="contained"
                    onClick={() =>
                      navigate('../client-login', { replace: true })
                    }
                    sx={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width: '80%',
                      paddingTop: '1vh',
                      paddingBottom: '1vh',
                    }}
                  >
                    Client
                  </BlackButton>
                  <BlackButton
                    variant="contained"
                    onClick={() =>
                      navigate('../dietitian-login', { replace: true })
                    }
                    sx={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width: '80%',
                      paddingTop: '1vh',
                      paddingBottom: '1vh',
                      marginBottom: '5vh',
                    }}
                  >
                    Dietitian
                  </BlackButton>
                </Stack>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </CardContent>
    </Grid>
  );
};
export default LoginSignUpChoice;
