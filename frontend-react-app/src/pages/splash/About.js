import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import fncePic from '../../static/images/me_at_fnce.jpg';
import { useTheme } from '@mui/material/styles';
const About = () => {
  const customTheme = useTheme();
  return (
    <Grid
      container
      item
      py={customTheme.pages.splash.spacing.pages}
      px={0}
      spacing={'10vh'}
    >
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
        <Grid
          container
          item
          justifyContent={'center'}
          sx={{ marginTop: '5vh', marginBottom: '5vh' }}
        >
          <img
            src={fncePic}
            height={customTheme.smallerScreen() ? '250vh' : '600vh'}
            alt="me at FNCE"
          ></img>
        </Grid>
      </Grid>
      <Grid container spacing={10}>
        <Grid item xs={9} marginLeft={customTheme.smallerScreen() ? '5vw' : ''}>
          <CardContent
            sx={{
              backgroundColor: customTheme.palette.lightGrey.secondary,
            }}
          >
            <Stack spacing={10}>
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
                CEO, Founder
              </Typography>
            </Stack>
          </CardContent>
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            marginLeft: 'auto',
            marginRight: customTheme.smallerScreen() ? '5vw' : '',
          }}
        >
          <CardContent
            sx={{ backgroundColor: customTheme.pages.splash.color.lightBlue }}
          >
            <Stack spacing={10}>
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
        <Grid item xs={9} marginLeft={customTheme.smallerScreen() ? '5vw' : ''}>
          <CardContent
            sx={{
              backgroundColor: customTheme.palette.lightGrey.secondary,
            }}
          >
            <Stack spacing={10}>
              <Typography
                fontFamily={'Inter'}
                fontSize={customTheme.pages.about.fontSize.body}
                color={customTheme.palette.black.main}
                fontWeight={500}
                textAlign={'center'}
                paddingTop={'5vh'}
              >
                Chera is a rare intersection of technology and healthcare that
                inspires me. Mental health is an area that everyone struggles
                with, yet as a society we have not prioritized it for
                innovation.
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
                Davis Handler
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
