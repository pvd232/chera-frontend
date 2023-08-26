import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dietitianLinks from '../scss/DietitianLinks.module.scss';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import ScreenSize from '../../../../types/enums/ScreenSize';
import DietitianMobileDropDown from '../DietitianMobileDropDown';

const DietitianLinks = () => {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= ScreenSize.xs;
  return (
    <Grid container item className={dietitianLinks.container}>
      {isMobile ? (
        <Grid
          item
          id="mobile-dropdown-grid-item"
          className={dietitianLinks.mobileDropDown}
        >
          <DietitianMobileDropDown />
        </Grid>
      ) : (
        <>
          <Grid item>
            <Typography
              className={dietitianLinks.link}
              onClick={() => navigate('/d-home')}
            >
              Dashboard
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={dietitianLinks.link}
              onClick={() => navigate('/client-meals')}
            >
              Client meals
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={dietitianLinks.link}
              onClick={() => navigate('/menu')}
            >
              Weekly Menu
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default DietitianLinks;
