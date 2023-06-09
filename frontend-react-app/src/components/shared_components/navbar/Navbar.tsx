import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { NavbarProps } from './types/NavbarProps.ts';
import navbar from './scss/Navbar.module.scss';

const Navbar = (props: NavbarProps) => {
  const navigate = useNavigate();
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
                    xs={11.2}
                  >
                    <Grid item>
                      <Typography
                        className={navbar.logoText}
                        onClick={handleClickLogo}
                      >
                        Chera
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      item
                      className={navbar.linksContainer}
                      xs={3}
                      sm={9}
                      md={8}
                      lg={6}
                    >
                      {props.links}
                    </Grid>
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
