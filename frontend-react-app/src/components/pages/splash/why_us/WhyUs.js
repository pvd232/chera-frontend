import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import ScreenSize from '../../../../types/enums/ScreenSize';
import { useReasonOpen } from './hooks/useReasonOpen';
import styles from './scss/WhyUs.module.scss';
import RHS from './RHS';
import LHS from './LHS';
const WhyUs = () => {
  const [reasonOpen, setReasonOpen] = useReasonOpen();
  const xsScreen = useWindowWidth() <= ScreenSize.xs;
  return (
    <Grid container item className={styles.whyUsFirstContainer}>
      <Grid container item sm={10} xs={11} className={styles.secondContainer}>
        <Grid container item>
          <Grid item>
            <Typography className={styles.header}>Why Chera?</Typography>
          </Grid>
        </Grid>
        <Grid container item className={styles.contentContainer}>
          <LHS
            reasonOpen={reasonOpen}
            setReasonOpen={setReasonOpen}
            xsScreen={xsScreen}
          />
          <RHS />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default WhyUs;
