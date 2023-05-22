import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import fncePic from '../../static/images/me_at_fnce.jpg';
import anyaPic from '../../static/images/anya_circle.png';
import zoePic from '../../static/images/zoe.jpg';
import carolPic from '../../static/images/carol_standing_circle.png';
import titiPic from '../../static/images/titi_circle.png';
import styles from './scss/About.module.scss';
const About = () => (
  <Grid container item xs={10} className={styles.aboutPageContainer}>
    <Grid item>
      <Typography className={styles.header}>Meet the team</Typography>
    </Grid>
    <Grid className={styles.contentContainer} container item>
      {/* Peter Profile */}
      <Grid container item className={styles.VIPprofileContainer}>
        <Grid item lg={5}>
          <img
            src={fncePic}
            // Limit the width of the photo to 100% of the Grid container, which is 5/12 of the parent Grid which is 10/12 of the screen. The height will scale proportionally.
            alt="me at FNCE"
            className={styles.peterImg}
          ></img>
        </Grid>
        <Grid container item lg={6.3} className={styles.quoteContainer}>
          <Grid item>
            <Typography className={styles.quote}>
              "For too long, the needs of those suffering from eating disorders
              have gone overlooked. I founded Chera to change that. We're
              building a platform that straddles a unique intersection of
              technology, nutrition, and mental healthcare; drawing on the
              expertise of our team of clinicians, dietitians, and engineers to
              streamline the recovery process.
            </Typography>
          </Grid>
          <Grid item></Grid>
          <Grid item>
            <Typography className={styles.quote}>
              Eating disorder recovery is at the heart of everything we do.
              We're constantly innovating around ways we can help our clients
              both recover more quickly and relapse less frequently.
            </Typography>
          </Grid>
          <Grid item></Grid>

          <Grid item>
            <Typography className={styles.quote}>
              We believe in a better future for eating disorder recovery, and
              we're so excited to be working towards it."
            </Typography>
          </Grid>
          <Grid item></Grid>
          <Grid item>
            <Typography className={styles.name}>Peter Driscoll</Typography>
          </Grid>

          <Grid item>
            <Typography className={styles.jobTitle}>CEO</Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* Zoe Profile */}

      <Grid container item className={styles.VIPprofileContainer}>
        <Grid item container lg={5} className={styles.zoeImgContainer}>
          <img src={zoePic} alt="zoe headshot" className={styles.img}></img>
        </Grid>
        <Grid container item lg={6.3} className={styles.quoteContainer}>
          <Grid item>
            <Typography className={styles.quote}>
              "At Chera, we understand that there can be so many obstacles
              between our clients and eating disorder recovery. Through our
              platform, we hope to ease the burden by providing individualized,
              prepared meals with the guidance of our clients' dietitians.
            </Typography>
          </Grid>
          <Grid item></Grid>

          <Grid item>
            <Typography className={styles.quote}>
              The journey to recovery is not something you have to do alone, and
              we at Chera hope to be a part of your support along the way."
            </Typography>
          </Grid>
          <Grid item></Grid>

          <Grid item>
            <Typography className={styles.name}>
              Zoe Woloszko, MCN, RD, LD
            </Typography>
          </Grid>

          <Grid item>
            <Typography className={styles.jobTitle}>
              Chief Clinical Officer
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* Rest of profiles */}
      <Grid container item className={styles.restOfProfilesContainer}>
        {/* Carol profile */}
        <Grid item container lg={4} className={styles.profileContainer}>
          <img src={carolPic} alt="carol standing" className={styles.img}></img>
          <Grid item>
            <Typography className={styles.name}>Carol Spiliotis</Typography>
          </Grid>

          <Grid item>
            <Typography className={styles.jobTitle}>
              Chief Culinary Officer
            </Typography>
          </Grid>
        </Grid>
        {/* Anya profile */}
        <Grid item container lg={4} className={styles.profileContainer}>
          <Grid item>
            <img src={anyaPic} alt="anya headshot" className={styles.img}></img>
          </Grid>
          <Grid item>
            <Typography className={styles.name}>Anya Zeng</Typography>
          </Grid>

          <Grid item>
            <Typography className={styles.jobTitle}>
              Lead UX Designer
            </Typography>
          </Grid>
        </Grid>
        {/* Titi profile */}
        <Grid item container lg={4} className={styles.profileContainer}>
          <Grid item>
            <img src={titiPic} alt="titi headshot" className={styles.img}></img>
          </Grid>
          <Grid item>
            <Typography className={styles.name}>
              Ourania Rosettos, MD
            </Typography>
          </Grid>

          <Grid item>
            <Typography className={styles.jobTitle}>Advisor</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
export default About;
