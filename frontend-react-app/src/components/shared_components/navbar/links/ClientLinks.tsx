import ClientProfileDropDown from '../ClientProfileDropDown';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import clientLinks from '../scss/ClientLinks.module.scss';

const ClientLinks = () => {
  const navigate = useNavigate();
  return (
    <Grid container item className={clientLinks.container}>
      <Grid item>
        <Typography
          className={clientLinks.link}
          onClick={() => navigate('/home')}
        >
          My schedule
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          id="client-previous-deliveries"
          className={clientLinks.link}
          onClick={() => navigate('/previous-deliveries')}
        >
          Previous deliveries
        </Typography>
      </Grid>
      <Grid item>
        <ClientProfileDropDown />
      </Grid>
    </Grid>
  );
};
export default ClientLinks;
