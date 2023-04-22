import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { Link as RRLink } from 'react-router-dom';
import logo from '../../static/images/chera-logo-3.png';
import LocalStorageManager from '../../helpers/LocalStorageManager';
import SplashLinks from './SplashLinks';
import AdminLinks from './AdminLinks';
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
                {/* logo */}
                <RRLink
                  to={LocalStorageManager.shared.homeUrl}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <img src={logo} alt="" height={'65vh'} />
                </RRLink>
                {/* logo */}
                <Grid container item lg={1.1} justifyContent={'flex-end'}>
                  <Grid item>
                    <RRLink
                      to={props.url}
                      style={{
                        textDecoration: 'none',
                        fontSize: '3rem',
                        color: `${customTheme.palette.olive.main}`,
                        fontWeight: 'bold',
                      }}
                    >
                      Chera
                    </RRLink>
                  </Grid>
                </Grid>
                {/* navbar links */}
                <Grid
                  container
                  item
                  lg={5}
                  md={props.domain !== 'splash' ? 7 : 10}
                  xs={12}
                  alignItems="flex-end"
                  justifyContent={'space-around'}
                  sx={{
                    marginLeft: props.domain === 'splash' ? 'auto' : '',
                  }}
                  columnGap={3.5}
                >
                  {props.domain === 'splash' ? (
                    <SplashLinks customTheme={customTheme} />
                  ) : props.domain === 'admin' ? (
                    <AdminLinks
                      customTheme={customTheme}
                      logoutUser={() => LocalStorageManager.shared.logoutUser()}
                      firstName={LocalStorageManager.shared.dietitian.firstName}
                    />
                  ) : props.domain === 'client' ? (
                    <ClientLinks
                      customTheme={customTheme}
                      logoutUser={() => LocalStorageManager.shared.logoutUser()}
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
