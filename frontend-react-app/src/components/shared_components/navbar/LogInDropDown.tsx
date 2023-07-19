import { useOpen } from './hooks/useOpen.ts';
import React from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import styles from './scss/AboutDropDown.module.scss';
import { useAuth0 } from '@auth0/auth0-react';

const LogInDropDown = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async (event: React.MouseEvent<HTMLElement>) => {
    const id = event.currentTarget.id;
    if (`${id}` === 'client-log-in') {
      await loginWithRedirect({
        appState: {
          returnTo: '/home',
        },
      });
    } else {
      await loginWithRedirect({
        appState: {
          returnTo: '/loading',
        },
      });
    }
  };

  const anchorRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = useOpen(anchorRef);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      event.target &&
      event.target instanceof Node &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <Grid
      container
      item
      ref={anchorRef}
      id="splash-login-dropdown"
      aria-controls={open ? 'composition-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
      className={styles.aboutDropDownContainer}
    >
      <Grid item>
        <Typography className={styles.link}>Log in</Typography>
      </Grid>
      <Icon className={styles.arrow}>arrow_drop_down</Icon>
      <Grid item>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom"
          transition
          disablePortal={false}
          className={styles.aboutPopper}
        >
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps} className={styles.dropDownContent}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      id="client-log-in"
                      onClick={handleLogin}
                      className={styles.menuItem}
                    >
                      <Typography className={styles.text}>
                        Client log in
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      id="dietitian-log-in"
                      onClick={handleLogin}
                      className={styles.menuItem}
                    >
                      <Typography className={styles.text}>
                        Dietitian log in
                      </Typography>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};
export default LogInDropDown;
