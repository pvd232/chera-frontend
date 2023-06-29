import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styles from './scss/MissionTextBox.module.scss';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import ScreenSize from '../../../../types/enums/ScreenSize';

const MissionTextBox = () => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < ScreenSize.sm;

  const paragraph = "Chera is a team of dietitians, doctors, and engineers dedicated to eating disorder recovery. ".repeat(3);

  return (
    <Grid
      id="missionTextBox"
      container
      item
      className={styles.missionTextBoxContainer}
      xs={10}
    >
      <Grid item id="missionTextBoxHeader">
        <Typography className={styles.header}>Hi, we're Chera.</Typography>
      </Grid>
      <Grid item>
        <Typography className={styles.subheader}>{paragraph}</Typography>
      </Grid>
    </Grid>
  );
};

export default MissionTextBox;
