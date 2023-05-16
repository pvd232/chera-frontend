import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import fncePic from '../../static/images/me_at_fnce.jpg';
import anyaPic from '../../static/images/anya.jpg';
import zoePic from '../../static/images/zoe.jpg';
import carolPic from '../../static/images/carol_greece.jpg';
import titiPic from '../../static/images/titi.jpg';
import { useTheme } from '@mui/material/styles';
import './css/Splash.css';
import './css/About.css';
const About = () => {
  const customTheme = useTheme();
  return (
    <Grid
      className="splash-page-container"
      container
      item
      justifyContent={'center'}
    >
      <Grid item>
        <Typography
          fontSize={customTheme.pages.splash.fontSize.header}
          className="splash-page-title"
          mb={customTheme.largerScreen() ? '15vh' : '10vh'}
        >
          Meet the team
        </Typography>
      </Grid>
      <Grid
        className="about-page-container"
        container
        item
        justifyContent={'center'}
      >
        {/* Peter Profile */}
        <Grid container className="about-profile-container" lg={10}>
          <Grid item lg={5}>
            <img
              src={fncePic}
              // Limit the width of the photo to 100% of the Grid container, which is 5/12 of the parent Grid which is 10/12 of the screen. The height will scale proportionally.
              style={{ maxWidth: '100%' }}
              alt="me at FNCE"
            ></img>
          </Grid>
          <Grid container item lg={5} flexDirection={'column'} rowSpacing={1.5}>
            <Grid item>
              <Typography
                className="about-quote-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                "Here at Chera, our clients are at the heart of everything we
                do. Through a blend of personalized meal preparation,
                intentional labeling and packaging, and high precision nutrition
                data, we empower our clients to stay comitted to regular
                eating."
              </Typography>
            </Grid>
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

        <Grid container className="about-profile-container" lg={10}>
          <Grid item container lg={5} justifyContent={'center'}>
            <img
              src={zoePic}
              style={{ maxHeight: '50vh' }}
              alt="me at FNCE"
            ></img>
          </Grid>
          <Grid container item lg={5} flexDirection={'column'} rowSpacing={1.5}>
            <Grid item>
              <Typography
                className="about-quote-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                "At Chera, we understand that there can be so many obstacles
                between our clients and eating disorder recovery. Through our
                platform, we hope to ease the burden by providing
                individualized, prepared meals with the guidance of our client’s
                dietitians."
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                className="about-quote-text"
                fontSize={customTheme.pages.splash.fontSize.subHeader}
              >
                "The journey to recovery is not something you have to do alone,
                and we at Chera hope to be a part of your support along the
                way."
              </Typography>
            </Grid>
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
        {/* <Grid
        item
        xs={11}
        sx={{
          marginLeft: 'auto',
          marginRight: customTheme.smallerScreen() ? '5vw' : '',
        }}
      >
        <CardContent
          sx={{ backgroundColor: customTheme.pages.splash.color.lightBlue }}
        >
          <Stack spacing={10} mt={'10vh'}>
            <Grid container item justifyContent={'center'}>
              <img
                src={zoePic}
                height={customTheme.smallerScreen() ? '250vh' : '600vh'}
                alt="me at FNCE"
              ></img>
            </Grid>
            <Typography
              fontFamily={'Inter'}
              fontSize={customTheme.pages.about.fontSize.body}
              paddingTop={'5vh'}
              color={customTheme.palette.black.main}
              textAlign={'center'}
            >
              At Chera, we understand that there can be so many obstacles
              between our clients and eating disorder recovery. Through our
              platform, we hope to ease the burden by providing individualized,
              prepared meals with the guidance of our client’s dietitians.
            </Typography>

            <Typography
              fontFamily={'Inter'}
              fontSize={customTheme.pages.about.fontSize.body}
              color={customTheme.palette.black.main}
              textAlign={'center'}
            >
              The journey to recovery is not something you have to do alone, and
              we at Chera hope to be a part of your support along the way.
            </Typography>
          </Stack>
          <Stack
            justifyContent={'center'}
            sx={{ marginTop: '10vh', marginBottom: '5vh' }}
          >
            <Typography
              fontFamily={'Inter'}
              fontSize={customTheme.pages.about.fontSize.signature}
              color={customTheme.palette.black.main}
              textAlign={'center'}
              fontWeight={'bold'}
            >
              Zoe Woloszko, MCN, RD, LD
            </Typography>
            <Typography
              fontFamily={'Inter'}
              fontSize={customTheme.pages.about.fontSize.signature}
              color={customTheme.palette.black.main}
              textAlign={'center'}
            >
              Chief Clinical Officer
            </Typography>
          </Stack>
        </CardContent>
      </Grid> */}
        <Grid
          item
          xs={11}
          marginLeft={customTheme.smallerScreen() ? '5vw' : ''}
        >
          <CardContent
            sx={{
              backgroundColor: customTheme.palette.lightGrey.secondary,
            }}
          >
            <Stack spacing={10} mt={'10vh'}>
              <Grid container item justifyContent={'center'}>
                <img
                  src={carolPic}
                  height={customTheme.smallerScreen() ? '250vh' : '600vh'}
                  alt="me at FNCE"
                ></img>
              </Grid>
            </Stack>
            <Stack
              justifyContent={'center'}
              sx={{ marginTop: '10vh', marginBottom: '5vh' }}
            >
              <Typography
                fontFamily={'Inter'}
                fontSize={customTheme.pages.about.fontSize.signature}
                color={customTheme.palette.black.main}
                textAlign={'center'}
                fontWeight={'bold'}
              >
                Carol Spiliotis
              </Typography>
              <Typography
                fontFamily={'Inter'}
                fontSize={customTheme.pages.about.fontSize.signature}
                color={customTheme.palette.black.main}
                textAlign={'center'}
              >
                Chief Culinary Officer
              </Typography>
            </Stack>
          </CardContent>
        </Grid>
        <Grid
          item
          xs={11}
          marginRight={customTheme.smallerScreen() ? '5vw' : ''}
          sx={{ marginLeft: 'auto' }}
        >
          <CardContent
            sx={{
              backgroundColor: customTheme.pages.splash.color.lightBlue,
            }}
          >
            <Stack spacing={10} mt={'10vh'}>
              <Grid container item justifyContent={'center'}>
                <img
                  src={anyaPic}
                  height={customTheme.smallerScreen() ? '250vh' : '600vh'}
                  alt="me at FNCE"
                ></img>
              </Grid>
            </Stack>
            <Stack
              justifyContent={'center'}
              sx={{ marginTop: '10vh', marginBottom: '5vh' }}
            >
              <Typography
                fontFamily={'Inter'}
                fontSize={customTheme.pages.about.fontSize.signature}
                color={customTheme.palette.black.main}
                textAlign={'center'}
                fontWeight={'bold'}
              >
                Anya Zeng
              </Typography>
              <Typography
                fontFamily={'Inter'}
                fontSize={customTheme.pages.about.fontSize.signature}
                color={customTheme.palette.black.main}
                textAlign={'center'}
              >
                Lead UX Designer
              </Typography>
            </Stack>
          </CardContent>
        </Grid>
        <Grid item xs={9} marginLeft={customTheme.smallerScreen() ? '5vw' : ''}>
          <CardContent
            sx={{
              backgroundColor: customTheme.palette.lightGrey.secondary,
            }}
          >
            <Stack spacing={10} mt={'10vh'}>
              <Grid container item justifyContent={'center'}>
                <img
                  src={titiPic}
                  height={customTheme.smallerScreen() ? '250vh' : '600vh'}
                  alt="me at FNCE"
                ></img>
              </Grid>
            </Stack>
            <Stack
              justifyContent={'center'}
              sx={{ marginTop: '10vh', marginBottom: '5vh' }}
            >
              <Typography
                fontFamily={'Inter'}
                fontSize={customTheme.pages.about.fontSize.signature}
                color={customTheme.palette.black.main}
                textAlign={'center'}
                fontWeight={'bold'}
              >
                Ourania Rosettos, MD
              </Typography>
              <Typography
                fontFamily={'Inter'}
                fontSize={customTheme.pages.about.fontSize.signature}
                color={customTheme.palette.black.main}
                textAlign={'center'}
              >
                Advisor
              </Typography>
            </Stack>
          </CardContent>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default About;
