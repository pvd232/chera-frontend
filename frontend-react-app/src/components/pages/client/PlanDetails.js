import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import planDetails from './scss/PlanDetails.module.scss';
import planImage from './../../../static/images/plan.png';
const PlanDetails = () => {
  return (
    <Grid container item className={planDetails.pageContainer} xs={8}>
      <Grid item container justifyContent={'center'} borderBottom={'2px solid darkGrey'}>
        <Typography
          id={'plan-details-header'}
          className={planDetails.header}
        >
          Your Plan Details
        </Typography>
      </Grid>

      {/* Starter Plan Section */}
      <Grid container item className={planDetails.contentContainer}>
        <Grid container item className={planDetails.cardContainer}>
          <Grid item xs={2}>
            <img src={planImage} alt="Plan" className={planDetails.planImage}/>
          </Grid>
          <Grid item xs={8}>
            <Typography className={planDetails.planText}>
              Starter Plan
            </Typography>
            <Typography>
              Free to use with no monthly fees or volume restrictions when you use Shippo's carrier accounts.
            </Typography>
            <Typography>
              $0.05 fee will be applied per label when using your own carrier account(s).
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="success" className={planDetails.upgradeButton}>
              Upgrade Plan
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Close Account Section */}
      <Grid container item className={planDetails.contentContainer}>
        <Grid container item className={planDetails.cardContainer}>
          <Grid item xs={8}>
            <Typography className={planDetails.closeAccountText}>
              Close Account
            </Typography>
            <Typography>
              When you close your account, you lose access to your historical shopping data and settings.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Link to="/close-account" className={planDetails.closeAccountLink}>
              Close Account
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlanDetails;
