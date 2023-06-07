import { useTheme } from '@mui/material/styles';
import { Link as RRLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import logo from '../../../static/images/chera_logo.png';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import DietitianLinks from './links/LegacyDietitianLinks';
import styles from './scss/Navbar.module.scss';
const Navbar = (props) => {
  const customTheme = useTheme();
  return (
    <>
      <Grid container className={styles.navbarContainer}>
        <Box className={styles.box}>
          <AppBar position="static" className={styles.appBar}>
            <Toolbar className={styles.toolBar}>
              <Grid container className={styles.contentContainer}>
                <Grid item>
                  <RRLink to={LocalStorageManager.shared.homeUrl}>
                    <img
                      className={styles.logoImg}
                      src={logo}
                      alt="chera logo"
                    ></img>
                  </RRLink>
                </Grid>
                {/* Navbar links */}
                <Grid container item lg={10} className={styles.linksContainer}>
                  <DietitianLinks
                    customTheme={customTheme}
                    logoutUser={() => LocalStorageManager.shared.logoutUser()}
                    firstName={LocalStorageManager.shared.dietitian.firstName}
                  />
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
