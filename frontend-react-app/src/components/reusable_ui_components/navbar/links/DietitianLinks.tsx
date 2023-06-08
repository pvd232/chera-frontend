import DietitianProfileDropDown from '../DietitianProfileDropDown';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dietitianLinks from '../scss/DietitianLinks.module.scss';

const DietitianLinks = () => {
  const navigate = useNavigate();
  return (
    <Grid container item className={dietitianLinks.clientLinksContainer}>
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
          onClick={() => navigate('/meal-plans')}
        >
          Meal plans
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          className={dietitianLinks.link}
          onClick={() => navigate('/menu')}
        >
          Menu
        </Typography>
      </Grid>
      <Grid item>
        <DietitianProfileDropDown />
      </Grid>
    </Grid>
  );
};
export default DietitianLinks;
