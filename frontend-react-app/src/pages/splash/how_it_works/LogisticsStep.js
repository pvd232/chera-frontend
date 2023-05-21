import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import styles from './scss/LogisticsStep.module.scss';
const LogisticsStep = (props) => (
  <Grid container item className={styles.logisticsStepContainer}>
    <Grid item>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon}>{props.symbolName}</Icon>
      </div>
    </Grid>
    <Grid item>
      <Typography className={styles.header}>{props.headerText}</Typography>
    </Grid>
    <Grid item xs={11.5}>
      <Typography className={styles.bodyText}>{props.bodyText}</Typography>
    </Grid>
  </Grid>
);
export default LogisticsStep;
