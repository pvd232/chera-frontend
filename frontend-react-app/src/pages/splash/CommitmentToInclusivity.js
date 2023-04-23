import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
const CommitmentToInclusivity = (props) => (
  <Grid
    container
    item
    lg={8}
    xs={12}
    justifySelf={'center'}
    justifyContent={'center'}
    px={'5vw'}
    py={props.customTheme.pages.splash.spacing.pages}
    mx={'auto'}
  >
    <CardContent>
      <Typography
        fontFamily={'Inter'}
        fontSize={props.customTheme.fontEqualizer(48)}
        color={props.customTheme.palette.black.main}
        fontWeight={'500'}
        textAlign={'center'}
        mb={props.customTheme.pages.splash.spacing.header}
      >
        Commitment to Inclusivity
      </Typography>
      <Stack spacing={5}>
        <Typography
          fontFamily={'Inter'}
          fontSize={props.customTheme.fontEqualizer(20)}
          color={props.customTheme.palette.black.main}
          textAlign={'center'}
        >
          Eating disorders don't discriminate. However, Black, Indigenous, POC,
          LGBTQ+, men, and people in larger bodies are less likely to receive
          the care needed to successfully recover from an eating disorder.
        </Typography>
        <Typography
          fontFamily={'Inter'}
          fontSize={props.customTheme.fontEqualizer(20)}
          color={props.customTheme.palette.black.main}
          textAlign={'center'}
        >
          We recognize this and are committed to making Chera as culturally
          inclusive as possible. We offer ten different meal plans, incorporate
          multiple cuisines into our menus, and provide vegetarian options.
        </Typography>
      </Stack>
    </CardContent>
  </Grid>
);
export default CommitmentToInclusivity;
