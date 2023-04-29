import React from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import capitalize from '../../helpers/capitalize';
import Icon from '@mui/material/Icon';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { useTheme } from '@mui/material/styles';

const MenuListComposition = (props) => {
  const customTheme = useTheme();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleLogOut = async () => {
    props.logoutUser();
    window.location.assign('/');
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Grid
      container
      item
      xs={3.5}
      xl={1}
      lg={1.5}
      columnGap={customTheme.smallerScreen() ? 0.3 : 1}
      alignItems="center"
      ref={anchorRef}
      id="composition-button"
      aria-controls={open ? 'composition-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
      sx={{
        cursor: 'pointer',
        position: customTheme.largerScreen() ? 'absolute' : 'static',
        right: '0',
      }}
    >
      {/* <Grid item sx={{ p: "0px !important" }}> */}
      <Icon
        sx={{
          color: customTheme.palette.black.main,
          fontSize: customTheme.fontSize.linkSymbol,
        }}
      >
        person_outlined
      </Icon>
      {/* </Grid> */}
      {/* <Grid item sx={{ p: "0px !important" }}> */}
      <Typography
        color={customTheme.palette.black.main}
        fontSize={customTheme.fontSize.linkText}
      >
        {capitalize(props.firstName)}
      </Typography>
      {/* </Grid> */}
      {/* <Grid item sx={{ p: "0px !important" }}> */}
      <Icon
        sx={{
          color: customTheme.palette.black.main,
          fontSize: customTheme.fontSize.linkSymbol,
        }}
      >
        arrow_drop_down
      </Icon>
      {/* </Grid> */}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper sx={customTheme.smallerScreen() ? { p: 0 } : {}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={customTheme.smallerScreen() ? { py: 0 } : {}}
                >
                  <MenuItem
                    onClick={handleLogOut}
                    sx={customTheme.smallerScreen() ? { py: 0 } : {}}
                  >
                    <Typography fontSize={customTheme.linkText}>
                      Log out
                    </Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  );
};
export default MenuListComposition;
