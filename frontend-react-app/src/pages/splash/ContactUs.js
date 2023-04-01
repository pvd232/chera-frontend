import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import FAQs from './faqs/FAQs';
const ContactUs = () => {
  const customTheme = useTheme();

  return (
    <Grid item container justifyContent={'center'} marginBottom={'10vh'}>
      <Grid
        item
        container
        justifyContent={'center'}
        marginRight={'auto'}
        marginLeft={'auto'}
        paddingTop={customTheme.largerScreen() ? '5vh' : '3v'}
        paddingBottom={'10vh'}
        sx={{
          backgroundColor: '#ffd491',
        }}
        rowSpacing={10}
        margin={'0 !important'}
      >
        <Grid item xs={10}>
          <Typography
            sx={{
              fontSize: customTheme.fontEqualizer(48),
              textAlign: 'center',
            }}
            color={customTheme.palette.black.main}
          >
            Questions?
          </Typography>
        </Grid>

        <Grid item lg={4} xs={10}>
          <Typography fontSize={customTheme.fontEqualizer(28)}>
            Email us at{' '}
            <span>
              {' '}
              <a
                href="mailto:contact@bendito.io"
                style={{
                  color: `${customTheme.palette.black.main}`,
                  fontWeight: 'bold',
                }}
              >
                contact@bendito.io
              </a>
            </span>{' '}
            and we will get back to you in an hour or less!
          </Typography>
        </Grid>
      </Grid>
      <Grid item container marginTop={'10vh'}>
        <FAQs></FAQs>
      </Grid>
    </Grid>
  );
};
export default ContactUs;
