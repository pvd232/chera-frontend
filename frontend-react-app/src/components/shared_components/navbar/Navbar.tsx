import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { NavbarProps } from './types/NavbarProps.ts';
import navbar from './scss/Navbar.module.scss';
import { useWindowWidth } from '../../hooks/useWindowWidth.ts';
import ScreenSize from '../../../types/enums/ScreenSize.ts';

const Navbar = (props: NavbarProps) => {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= ScreenSize.xs;
  const shouldShowProfileDropDown = () => {
    if (!isMobile) {
      return true;
      // Client navbar does not have hamburger menu, so the profile dropdown should always be shown
    } else if (isMobile && props.profileDropDown && props.homeUrl === '/home') {
      return true;
    } else {
      // Dietitian mobile navbar has hamburger menu, so the profile dropdown should not be shown
      return false;
    }
  };
  const handleClickLogo = () => {
    navigate(props.homeUrl);
  };
  return (
    <Grid container className={navbar.viewContainer}>
      <Grid container className={navbar.childContentContainer}>
        <Grid container item className={navbar.navbarContainer}>
          <Box className={navbar.box}>
            <AppBar className={navbar.appBar}>
              <Toolbar className={navbar.toolBar}>
                <Grid container className={navbar.contentTopContainer}>
                  <Grid
                    container
                    item
                    className={navbar.contentContainer}
                    xs={10}
                  >
                    <Grid item>
                      <Typography
                        className={navbar.logoText}
                        onClick={handleClickLogo}
                      >
                        Chera
                      </Typography>
                    </Grid>
                    <Grid item>{props.links}</Grid>
                    {shouldShowProfileDropDown() && (
                      <Grid item className={navbar.profileDropDown}>
                        {props.profileDropDown}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </Box>
        </Grid>
        <Grid item className={navbar.pageContentContainer}>
          {props.childComponent}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Navbar;
