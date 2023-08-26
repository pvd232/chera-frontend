import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LogisticsStep from './LogisticsStep';
import styles from './scss/HowItWorks.module.scss';

const HowItWorks = (props) => (
  <Grid container item className={styles.howItWorksContainer}>
    <Grid item>
      <Typography className={styles.header}>How Chera works</Typography>
    </Grid>
    <Grid container item xs={11} className={styles.illustrationContainer}>
      <Grid item lg={2.8} md={5} xs={10}>
        <LogisticsStep
          customTheme={props.customTheme}
          headerText={'Dietitian refers client'}
          bodyText={
            'Simple interface for adding clients and choosing a portion size that best fits their needs.'
          }
          symbolName={'format_list_numbered'}
        />
      </Grid>
      <Grid item lg={2.8} md={5} xs={10}>
        <LogisticsStep
          customTheme={props.customTheme}
          headerText={'Pick weekly meals'}
          bodyText={
            'Client (or their dietitian) builds their meal plan. Our menu is updated weekly'
          }
          symbolName={'dinner_dining'}
        />
      </Grid>
      <Grid item lg={2.8} md={5} xs={10}>
        <LogisticsStep
          customTheme={props.customTheme}
          headerText={'We cook and deliver meals'}
          bodyText={
            'Gourmet, dietitian-approved meals, thoughtfully labeled and home delivered.'
          }
          symbolName={'delivery_dining_outlined'}
        />
      </Grid>
      <Grid item lg={2.8} md={5} xs={10}>
        <LogisticsStep
          customTheme={props.customTheme}
          headerText={'Heat, sit back and enjoy'}
          bodyText={
            'Simple instructions + microwave safe = ready in minutes! Skip a week or pause deliveries anytime.'
          }
          symbolName={'sentiment_very_satisfied_outlined'}
        />
      </Grid>
    </Grid>
  </Grid>
);
export default HowItWorks;
