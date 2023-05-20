import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import BlackButton from '../../../reusable_ui_components/BlackButton';
import '../scss/Splash.scss';
import './scss/IntroTextBox.scss';
import { useNavigate } from 'react-router-dom';
const IntroTextBox = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      item
      className="intro-text-box-container splash-theme-text"
      xs={10}
      sx={{
        alignItems: {
          xs: 'center',
          sm: 'flex-start',
          md: 'flex-start',
          lg: 'flex-start',
        },
      }}
    >
      <Grid item>
        <Typography
          className="intro-text-box-header"
          sx={{
            textAlign: {
              xs: 'center',
              sm: 'left',
              md: 'left',
              lg: 'left',
            },
          }}
        >
          Simplifying meal planning for eating disorder recovery
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          className="splash-page-subheader"
          sx={{
            textAlign: {
              xs: 'left',
              sm: 'left',
              md: 'left',
              lg: 'left',
            },
          }}
        >
          Chera enables faster, sustainable recovery by promoting regular eating
          habits.
        </Typography>
      </Grid>
      <Grid
        item
        container
        order={2}
        justifyContent={{
          xs: 'center',
          sm: 'center',
          md: 'flex-start',
          lg: 'flex-start',
        }}
      >
        <BlackButton
          variant={'contained'}
          onClick={() => navigate('/dietitian-sign-up')}
          id="getStartedButton"
          className="splash-filled-button splash-theme-filled"
        >
          Get started
        </BlackButton>
      </Grid>
    </Grid>
    // </Grid>
  );
};
export default IntroTextBox;
