import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ListOfReasons from './ListOfReasons';
import styles from './scss/WhyUs.module.scss';

const LHS = (props) => (
  <>
    <Grid item xs={11}>
      <Typography className={styles.lhsHeader}>Why Chera?</Typography>
    </Grid>
    <Grid item lg={6}>
      <ListOfReasons
        reasonOpen={props.reasonOpen}
        setReasonOpen={props.setReasonOpen}
      />
    </Grid>
  </>
);
export default LHS;
