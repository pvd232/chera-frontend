import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { Link as RRLink } from 'react-router-dom';
import logo from '../../static/images/chera_logo.png';
import LocalStorageManager from '../../helpers/LocalStorageManager';
import SplashLinks from './SplashLinks';
import ClientLinks from './ClientLinks';
import DietitianLinks from './DietitianLinks';

const Navbar = (props) => {
  const customTheme = useTheme();
  return (
    <>
      <Grid
        container
        sx={{
          height: 'auto',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{ backgroundColor: 'white', boxShadow: 0 }}
          >
            <Toolbar
              sx={{
                minHeight: '50px',
                py: 3,
              }}
            >
              <Grid
                container
                alignItems="flex-end"
                justifyContent={
                  customTheme.smallerScreen() ? 'center' : 'flex-start'
                }
                rowGap={customTheme.smallerScreen() ? 3 : 0}
                mr={2}
                ml={2}
              >
                <Grid item>
                  <RRLink to={LocalStorageManager.shared.homeUrl}>
                    <img
                      src={logo}
                      alt="chera logo"
                      style={{ height: '6vh' }}
                    ></img>
                  </RRLink>
                </Grid>
                {/* navbar links */}
                <Grid
                  container
                  item
                  lg={5}
                  md={props.domain !== 'splash' ? 7 : 10}
                  xs={12}
                  justifyContent={'space-around'}
                  sx={{
                    marginLeft: props.domain === 'splash' ? 'auto' : '',
                  }}
                  columnGap={
                    customTheme.extraSmallScreen()
                      ? 1.5
                      : customTheme.extraExtraSmallScreen()
                      ? 0
                      : 3.5
                  }
                >
                  {props.domain === 'splash' ? (
                    <SplashLinks customTheme={customTheme} />
                  ) : props.domain === 'client' ? (
                    <ClientLinks
                      customTheme={customTheme}
                      logoutUser={() => {
                        LocalStorageManager.shared.logoutUser();
                        window.location.assign('/');
                      }}
                      firstName={LocalStorageManager.shared.client.firstName}
                    />
                  ) : (
                    <DietitianLinks
                      customTheme={customTheme}
                      logoutUser={() => LocalStorageManager.shared.logoutUser()}
                      firstName={LocalStorageManager.shared.dietitian.firstName}
                    />
                  )}
                </Grid>
                {/* navbar links */}
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      {props.childComponent}
    </>
  );
};
export default Navbar;
