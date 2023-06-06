import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import styles from './scss/Navbar.module.scss';
import { NavbarProps } from './types/NavbarProps.ts';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
const NewNavbar = (props: NavbarProps) => {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate(props.homeUrl);
  };
  return (
    <>
      <Grid container className={styles.navbarContainer}>
        <Box className={styles.box}>
          <AppBar className={styles.appBar}>
            <Toolbar className={styles.toolBar}>
              <Grid container className={styles.contentTopContainer}>
                <Grid container className={styles.contentContainer} xs={11.3}>
                  <Grid item>
                    <Typography
                      className={styles.logoText}
                      onClick={handleClickLogo}
                    >
                      Chera
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    className={styles.linksContainer}
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
      {props.childComponent}
    </>
  );
};
export default NewNavbar;
