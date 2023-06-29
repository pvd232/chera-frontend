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
import { useNavigate } from 'react-router-dom';
import aboutDropDown from './scss/AboutDropDown.module.scss';
import LocalStorageManager from '../../../helpers/LocalStorageManager.ts';
import APIClient from '../../../helpers/logoutUser.ts';
// import Payment from '../../pages/client_sign_up/Payment.js';

const ClientProfileDropDown = () => {
  const userFirstName =
    LocalStorageManager.shared.client.firstName.toUpperCase();
  const navigate = useNavigate();
  const anchorRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = useOpen(anchorRef);

  const handleLogout = () => {
    navigate('/');
    LocalStorageManager.shared.logoutUser();
  };

  const handlePayment = () => {
      console.log(LocalStorageManager.shared);
    console.log(LocalStorageManager.shared.client);
    console.log(LocalStorageManager.shared.clientMealSubscription);
    console.log(LocalStorageManager.shared.mealTimes);
    console.log(LocalStorageManager.shared);
    navigate('/payment');
    // navigate('/');
    // <Payment
    //   clientSecret={LocalStorageManager.shared.client.clientSecret}
    //   stripePromise={props.stripePromise}
    //   scheduleMeals={scheduleMeals}
    //   scheduleSnacks={scheduleSnacks}
    //   discountCode={''}
    //   orderDiscount={''}
    //   stagedClient={LocalStorageManager.shared.client}
    //   shippingCost={props.shippingCost}
    //   handleSubmit={handleSubmit}
    // />


    // console.log(LocalStorageManager.shared);
    // console.log(LocalStorageManager.shared.client);
    // // await APIClient.stripe_payment_methods(LocalStorageManager.shared.client)
    // console.log(LocalStorageManager.shared.clientMealSubscription);
    // console.log(LocalStorageManager.shared.mealTimes);
    // console.log(LocalStorageManager.shared);


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
        <div className={aboutDropDown.personIconContainer} id="test">
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
                      id="logout"
                      onClick={handleLogout}
                      className={aboutDropDown.menuItem}
                    >
                      <Typography className={aboutDropDown.text}>
                        Log out
                      </Typography>
                    </MenuItem>


                    <MenuItem
                      id="payment"
                      onClick={handlePayment}
                      className={aboutDropDown.menuItem}
                    >
                      <Typography className={aboutDropDown.text}>
                        Payment
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
