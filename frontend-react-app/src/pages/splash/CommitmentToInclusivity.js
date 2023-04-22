import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
const CommitmentToInclusivity = (props) => (
  <Grid
    item
    xs={12}
    sx={{
      paddingLeft: '5vw',
      paddingRight: '5vw',
    }}
  >
    <CardContent>
      <Stack spacing={5}>
        <Typography
          fontFamily={'Inter'}
          fontSize={props.customTheme.fontEqualizer(48)}
          color={props.customTheme.palette.black.main}
          fontWeight={'500'}
          textAlign={'center'}
        >
          Commitment to Inclusivity
        </Typography>

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
