import Grid from '@mui/material/Grid';
import RHS from './RHS';
import LHS from './LHS';
import useReasonOpen from './hooks/useReasonOpen';
import styles from './scss/WhyUs.module.scss';
const WhyUs = () => {
  const [reasonOpen, setReasonOpen] = useReasonOpen();
  return (
    <Grid container item className={styles.whyUsFirstContainer}>
      <Grid container item className={styles.secondContainer} xs={10}>
        <LHS reasonOpen={reasonOpen} setReasonOpen={setReasonOpen} />
        <RHS />
      </Grid>
    </Grid>
  );
};
export default WhyUs;
