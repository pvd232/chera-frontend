import React from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { useOpen } from './hooks/useOpen.ts';
//import { useNavigate } from 'react-router-dom';
import aboutDropDown from './scss/AboutDropDown.module.scss';
import LocalStorageManager from '../../../helpers/LocalStorageManager.ts';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
const ClientProfileDropDown = () => {
  const { logout } = useAuth0();

  const userFirstName =
    LocalStorageManager.shared.client.firstName.toUpperCase();
  const navigate = useNavigate();
  const anchorRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = useOpen(anchorRef);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const handlePayment = () => {
    navigate('/payment');
  };

  const handleInvoices = () => {
    navigate('/invoices');
  };

  const handleUpdateAddress = () => {
    navigate('/update-address');
  };

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
      id="composition-button"
      aria-controls={open ? 'composition-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
      className={aboutDropDown.clientDropDownContainer}
    >
      <Grid item>
        <div className={aboutDropDown.personIconContainer} id="accountDetails">
          <Typography className={aboutDropDown.personIcon}>
            {userFirstName.charAt(0)}
          </Typography>
        </div>
      </Grid>

      <Grid item>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom"
          transition
          disablePortal={false}
          className={aboutDropDown.aboutPopper}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              className={aboutDropDown.dropDownContent}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      id="payment"
                      onClick={handlePayment}
                      className={aboutDropDown.menuItem}
                    >
                      <Typography className={aboutDropDown.text}>
                        Payment Methods
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      id="invoices"
                      onClick={handleInvoices}
                      className={aboutDropDown.menuItem}
                    >
                      <Typography className={aboutDropDown.text}>
                        Invoices
                      </Typography>
                    </MenuItem>

                    <MenuItem
                      id="updateAddress"
                      onClick={handleUpdateAddress}
                      className={aboutDropDown.menuItem}
                    >
                      <Typography className={aboutDropDown.text}>
                        Shipping Address
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      id="account-management"
                      onClick={() => navigate('/account-management')}
                      className={aboutDropDown.menuItem}
                    >
                      <Typography className={aboutDropDown.text}>
                        Account management
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      id="logout"
                      onClick={handleLogout}
                      className={aboutDropDown.menuItem}
                    >
                      <Typography className={aboutDropDown.text}>
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
    </Grid>
  );
};
export default ClientProfileDropDown;
