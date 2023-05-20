import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import fncePic from '../../static/images/me_at_fnce.jpg';
import anyaPic from '../../static/images/anya_circle.png';
import zoePic from '../../static/images/zoe.jpg';
import carolPic from '../../static/images/carol_standing_circle.png';
import titiPic from '../../static/images/titi_circle.png';
import { useTheme } from '@mui/material/styles';
import './scss/Splash.scss';
import './scss/About.scss';
const About = () => {
  const customTheme = useTheme();
  return (
    <Grid container item className="splash-page-container" xs={10}>
      <Grid item>
        <Typography
          className="splash-page-header"
          mb={{
            xs: '5vh',
            sm: '5vh',
            md: '10vh',
            lg: '10vh',
          }}
        >
          Meet the team
        </Typography>
      </Grid>
      <Grid className="about-page-container" container item>
        {/* Peter Profile */}
        <Grid container item className="about-profile-container">
          <Grid item lg={5}>
            <img
              src={fncePic}
              // Limit the width of the photo to 100% of the Grid container, which is 5/12 of the parent Grid which is 10/12 of the screen. The height will scale proportionally.
              style={{ maxWidth: '100%' }}
              alt="me at FNCE"
            ></img>
          </Grid>
          <Grid
            container
            item
            lg={6.3}
            flexDirection={'column'}
            rowSpacing={'1vh'}
          >
            <Grid item>
              <Typography
                className="about-quote-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                "For too long, the needs of those suffering from eating
                disorders have gone overlooked. I founded Chera to change that.
                We're building a platform that straddles a unique intersection
                of technology, nutrition, and mental healthcare; drawing on the
                expertise of our team of clinicians, dietitians, and engineers
                to streamline the recovery process.
              </Typography>
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <Typography
                className="about-quote-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                Eating disorder recovery is at the heart of everything we do.
                We're constantly innovating around ways we can help our clients
                both recover more quickly and relapse less frequently.
              </Typography>
            </Grid>
            <Grid item></Grid>

            <Grid item>
              <Typography
                className="about-quote-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                We believe in a better future for eating disorder recovery, and
                we're so excited to be working towards it."
              </Typography>
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <Typography
                className="about-quote-name-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                Peter Driscoll
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                className="about-quote-job-title-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                CEO
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Zoe Profile */}

        <Grid container item className="about-profile-container">
          <Grid item container lg={5} justifyContent={'center'}>
            <img
              src={zoePic}
              style={{ maxHeight: '50vh' }}
              alt="me at FNCE"
            ></img>
          </Grid>
          <Grid
            container
            item
            lg={6.3}
            flexDirection={'column'}
            rowSpacing={1.5}
          >
            <Grid item>
              <Typography
                className="about-quote-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                "At Chera, we understand that there can be so many obstacles
                between our clients and eating disorder recovery. Through our
                platform, we hope to ease the burden by providing
                individualized, prepared meals with the guidance of our clients'
                dietitians.
              </Typography>
            </Grid>
            <Grid item></Grid>

            <Grid item>
              <Typography
                className="about-quote-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                The journey to recovery is not something you have to do alone,
                and we at Chera hope to be a part of your support along the
                way."
              </Typography>
            </Grid>
            <Grid item></Grid>

            <Grid item>
              <Typography
                className="about-quote-name-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                Zoe Woloszko, MCN, RD, LD
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                className="about-quote-job-title-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                Chief Clinical Officer
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Rest of profiles */}
        <Grid
          container
          item
          justifyContent={'space-around'}
          rowSpacing={'5vh'}
          sx={{
            marginTop: {
              xs: '0vh',
              sm: '0vh',
              md: '10vh',
            },
          }}
        >
          {/* Carol profile */}
          <Grid
            item
            container
            lg={4}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            rowSpacing={'1vh'}
          >
            <Grid item>
              <img
                src={carolPic}
                height={customTheme.smallerScreen() ? '150vh' : '230vh'}
                alt="me at FNCE"
              ></img>
            </Grid>
            <Grid item>
              <Typography
                className="about-quote-name-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                Carol Spiliotis
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                className="about-quote-job-title-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                Chief Culinary Officer
              </Typography>
            </Grid>
          </Grid>
          {/* Anya profile */}
          <Grid
            item
            container
            lg={4}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            rowSpacing={'1vh'}
          >
            <Grid item>
              <img
                src={anyaPic}
                height={customTheme.smallerScreen() ? '150vh' : '230vh'}
                alt="me at FNCE"
              ></img>
            </Grid>
            <Grid item>
              <Typography
                className="about-quote-name-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                Anya Zeng
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                className="about-quote-job-title-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                Lead UX Designer
              </Typography>
            </Grid>
          </Grid>
          {/* Titi profile */}
          <Grid
            item
            container
            lg={4}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            rowSpacing={'1vh'}
          >
            <Grid item>
              <img
                src={titiPic}
                height={customTheme.smallerScreen() ? '150vh' : '230vh'}
                alt="me at FNCE"
              ></img>
            </Grid>
            <Grid item>
              <Typography
                className="about-quote-name-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                Ourania Rosettos, MD
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                className="about-quote-job-title-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                Advisor
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default About;
