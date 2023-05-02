import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import fncePic from '../../static/images/me_at_fnce.jpg';
import anyaPic from '../../static/images/anya.jpg';
import zoePic from '../../static/images/zoe.jpg';
import carolPic from '../../static/images/carol_3.png';
import { useTheme } from '@mui/material/styles';
const About = () => {
  const customTheme = useTheme();
  return (
    <Grid container item py={customTheme.pages.splash.spacing.pages} px={5}>
      <Grid container item xs={12} justifyContent={'center'}>
        <CardContent>
          <Typography
            fontFamily={'Inter'}
            fontSize={customTheme.pages.splash.fontSize.header}
            color={customTheme.palette.black.main}
            fontWeight={'500'}
          >
            Meet the Team
          </Typography>
        </CardContent>
      </Grid>
      <Grid container spacing={10}>
        <Grid
          item
          lg={9}
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
                  src={fncePic}
                  height={customTheme.smallerScreen() ? '200vh' : '600vh'}
                  alt="me at FNCE"
                ></img>
              </Grid>
              <Typography
                fontFamily={'Inter'}
                fontSize={customTheme.pages.about.fontSize.body}
                color={customTheme.palette.black.main}
                fontWeight={500}
                textAlign={'center'}
                paddingTop={'5vh'}
              >
                Here at Chera, our clients are at the heart of everything we do.
                Through a blend of personalized meal preparation, catered
                labeling and packaging, and high precision nutrition data, we
                empower our clients to stay committed to their meal plans.
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
                Peter Driscoll
              </Typography>
              <Typography
                fontFamily={'Inter'}
                fontSize={customTheme.pages.about.fontSize.signature}
                color={customTheme.palette.black.main}
                textAlign={'center'}
              >
                CEO
              </Typography>
            </Stack>
          </CardContent>
        </Grid>
        <Grid
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
                between our clients and eating disorder recovery. In our work,
                we hope to ease the burden by providing individualized, prepared
                meals with the guidance of our client’s dietitians.
              </Typography>

              <Typography
                fontFamily={'Inter'}
                fontSize={customTheme.pages.about.fontSize.body}
                color={customTheme.palette.black.main}
                textAlign={'center'}
              >
                The journey to recovery is not something you have to do alone,
                and we at Chera hope to be a part of your support along the way.
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
        </Grid>
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
        {/* <Grid item xs={9} marginLeft={customTheme.smallerScreen() ? '5vw' : ''}>
          <CardContent
            sx={{
              backgroundColor: customTheme.palette.lightGrey.secondary,
            }}
          >
            <Stack spacing={10} mt={'10vh'}>
              <Grid container item justifyContent={'center'}>
                <img
                  src={fncePic}
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
                Ourania Rosettos
              </Typography>
              <Typography
                fontFamily={'Inter'}
                fontSize={customTheme.pages.about.fontSize.signature}
                color={customTheme.palette.black.main}
                textAlign={'center'}
              >
                MD Advisor
              </Typography>
            </Stack>
          </CardContent>
        </Grid> */}
      </Grid>
    </Grid>
  );
};
export default About;
