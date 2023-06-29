import Grid from '@mui/material/Grid';
import MissionTextBox from './MissionTextBox.tsx';
import styles from './scss/MissionPage.module.scss';
const MissionPage = () => {
    return (
      <Grid
        id="missionPage"
        container
        item
        className={styles.missionPageContainer}
      >
        <MissionTextBox />
      </Grid>
    );
  };
  export default MissionPage;