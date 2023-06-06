import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import FAQs from './faqs/FAQs';
const ContactUs = () => {
  const customTheme = useTheme();
  return (
    <Grid item container justifyContent={'center'} my={10}>
      <Grid
        item
        container
        justifyContent={'center'}
        marginRight={'auto'}
        marginLeft={'auto'}
        pt={10}
        pb={20}
        sx={{
          backgroundColor: customTheme.palette.fucia.secondary,
        }}
        rowSpacing={10}
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

        <Grid item lg={6} xs={10}>
          <Typography fontSize={customTheme.fontEqualizer(28)}>
            Email us at{' '}
            <span>
              {' '}
              <a
                href="mailto:contact@cherahealth.com"
                style={{
                  color: `${customTheme.palette.black.main}`,
                  fontWeight: 'bold',
                }}
              >
                contact@cherahealth.com
              </a>
            </span>{' '}
            and we will get back to you by end of day!
          </Typography>
        </Grid>
      </Grid>
      <Grid item container>
        <FAQs></FAQs>
      </Grid>
    </Grid>
  );
};
export default ContactUs;
