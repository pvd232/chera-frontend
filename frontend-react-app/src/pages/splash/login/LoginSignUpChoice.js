import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import styles from './scss/LoginSignUpChoice.module.scss';
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
              <Grid item container>
                <Stack rowGap={3} flexGrow={1}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate('../client-login', { replace: true })
                    }
                    className={styles.loginButton}
                  >
                    Client
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate('../dietitian-login', { replace: true })
                    }
                    className={styles.loginButton}
                  >
                    Dietitian
                  </Button>
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
