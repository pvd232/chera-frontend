/* eslint-disable jsx-a11y/alt-text */
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import styles from './scss/FNCEApproved.module.scss';
import useWindowWidth from './landing_page/hooks/useWindowWidth.ts';
import FNCElogo from '../../static/images/fnce_logo.png';
import cheraPlusFNCE from '../../static/images/chera_plus_fnce.png';
import cheraLogo from '../../static/images/chera_logo.png';
import eatRightLogo from '../../static/images/eat_right_logo_5.png';
const FNCEApproved = () => {
  const windowWidth = useWindowWidth();
  const smallScreen = windowWidth < 600;
  return (
    <Grid container item className={styles.fnceApprovedPageContainer}>
      <Grid container item className={styles.childPageContainer} xs={10}>
        <Grid item>
          <Typography className={styles.header}>
            Dietitian vetted & approved
          </Typography>
        </Grid>
        <Grid container item className={styles.contentContainer}>
          {!smallScreen ? (
            <>
              <Grid item>
                <img
                  id="image1"
                  src={cheraPlusFNCE}
                  className={styles.firstImage}
                  alt="chera plus fnce"
                ></img>
              </Grid>
              <Grid item>
                <Typography className={styles.content}>=</Typography>
              </Grid>
              <Grid item className={styles.secondImageContainer}>
                <img
                  id="image2"
                  src={FNCElogo}
                  className={styles.secondImage}
                  alt="FNCE logo"
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item lg={4} xs={10}>
                <img
                  id="image1"
                  src={cheraLogo}
                  className={styles.firstImage}
                  alt="chera logo"
                ></img>
              </Grid>
              <Grid item>
                <Icon className={styles.content}>add</Icon>
              </Grid>
              <Grid
                container
                item
                xs={8}
                lg={4}
                className={styles.contentContainer}
              >
                <img
                  id="image2"
                  src={eatRightLogo}
                  className={styles.secondImage}
                  alt="eat right logo"
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FNCEApproved;
