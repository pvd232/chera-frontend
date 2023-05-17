import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import BlackButton from '../../../reusable_ui_components/BlackButton';
import '../css/Splash.css';
import './css/IntroTextBox.css';
import { useNavigate } from 'react-router-dom';
const IntroTextBox = (props) => {
  const customTheme = useTheme();
  const navigate = useNavigate();
  return (
    <Grid
      container
      item
      xs={10}
      justifyContent={customTheme.smallerScreen() ? 'center' : 'flex-start'}
    >
      <Grid
        container
        item
        className="intro-text-box-container splash-theme-text"
      >
        <Grid item order={0}>
          <Typography
            className="intro-text-box-header"
            fontSize={customTheme.pages.splash.fontSize.header}
            textAlign={customTheme.smallerScreen() ? 'center' : 'left'}
          >
            Simplifying meal planning for
          </Typography>
          <Typography
            className="intro-text-box-header"
            fontSize={customTheme.pages.splash.fontSize.header}
            textAlign={customTheme.smallerScreen() ? 'center' : 'left'}
          >
            eating disorder recovery
          </Typography>
        </Grid>
        <Grid item order={1}>
          <Typography
            fontSize={customTheme.pages.splash.fontSize.subHeader}
            textAlign={customTheme.smallerScreen() ? 'center' : 'left'}
          >
            Chera enables faster, sustainable recovery by promoting regular
            eating habits.
          </Typography>
        </Grid>
        <Grid
          item
          container
          order={2}
          justifyContent={customTheme.smallerScreen() ? 'center' : 'flex-start'}
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
    </Grid>
  );
};
export default IntroTextBox;
