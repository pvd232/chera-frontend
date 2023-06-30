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
import { useOpen } from './hooks/useOpen.ts';
import styles from './scss/AboutDropDown.module.scss';
import { useNavigate } from 'react-router-dom';
const AboutDropDown = () => {
  const anchorRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = useOpen(anchorRef);
  const navigate = useNavigate();

  const handleNavigate = (event: React.MouseEvent<HTMLElement>) => {
    const id = event.currentTarget.id;
    switch (id) {
      case 'our-mission':
        navigate('/our-mission');
        break;
      case 'resources':
        navigate('/resources');
        break;
      case 'faqs':
        navigate('/faqs');
        break;
      default:
        break;
    }
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
      className={styles.aboutDropDownContainer}
    >
      <Grid item>
        <Typography className={styles.link}>About Chera</Typography>
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
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {/* <MenuItem
                      id="our-mission"
                      onClick={handleNavigate}
                      className={styles.menuItem}
                    >
                      <Typography className={styles.text}>
                        Our mission
                      </Typography>
                    </MenuItem> */}
                    <MenuItem
                      id="resources"
                      onClick={handleNavigate}
                      className={styles.menuItem}
                    >
                      <Typography className={styles.text}>Resources</Typography>
                    </MenuItem>
                    <MenuItem
                      id="faqs"
                      onClick={handleNavigate}
                      className={styles.menuItem}
                    >
                      <Typography className={styles.text}>
                        Contact / FAQs
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
export default AboutDropDown;
