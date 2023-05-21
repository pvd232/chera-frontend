import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import { Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import styles from './scss/ReasonBullet.module.scss';

const ReasonBullet = (props) => (
  <Grid
    item
    container
    className={
      props.reasonOpen
        ? `${styles.reasonBulletContainer} ${styles.themeColored}`
        : `${styles.reasonBulletContainer}`
    }
    onClick={props.setReasonOpen}
  >
    <Grid item className={styles.iconContainer}>
      <Icon className={props.reasonOpen ? styles.white : styles.black}>
        {props.icon}
      </Icon>
    </Grid>
    <Grid item>
      <CardContent>
        <Typography
          className={props.reasonOpen ? styles.headerOpen : styles.headerClosed}
        >
          {props.bulletPrimaryText}
        </Typography>
      </CardContent>
    </Grid>
    <Grid item container xs={1} className={styles.arrowContainer}>
      <Stack>
        <div className={styles.secondContainer}>
          {props.reasonOpen ? (
            <ArrowDropUpIcon fontSize="large" />
          ) : (
            <ArrowDropDownIcon fontSize="large" />
          )}
        </div>
      </Stack>
    </Grid>
    <Grid container item>
      <CardContent
        className={styles.subtitleContainer}
        sx={{
          display: props.reasonOpen ? 'block' : 'none',
        }}
      >
        <Typography className={styles.text}>
          {props.bulletSecondaryText}
        </Typography>
      </CardContent>
    </Grid>
  </Grid>
);
export default ReasonBullet;
