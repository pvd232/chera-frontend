import Grid from '@mui/material/Grid';
import ListOfReasons from './ListOfReasons';
import styles from './scss/WhyUs.module.scss';

const LHS = (props) => (
  <Grid item container lg={6} className={styles.lhsContainer}>
    <Grid item>
      <ListOfReasons
        reasonOpen={props.reasonOpen}
        setReasonOpen={props.setReasonOpen}
        xsScreen={props.xsScreen}
      />
    </Grid>
  </Grid>
);
export default LHS;
