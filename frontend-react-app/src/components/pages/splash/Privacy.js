import { Grid, Typography } from '@mui/material';

const Privacy = () => (
  <Grid
    container
    item
    style={{
      marginTop: '10vh',
      marginBottom: '20vh',
    }}
  >
    <Grid container item justifyContent={'center'} mb={'5vh'}>
      <Grid item>
        <Typography fontWeight={'bold'}>Privacy Policy</Typography>
      </Grid>
    </Grid>
    <Grid container item justifyContent={'center'}>
      <Grid item xs={10}>
        <Typography>
          Varied information is gathered from visitors. Passive information is
          collected via log files that are stored on the web server saving
          details such as the visitor's IP address, browser type, referring page
          and time of visit. Cookies may be used to remember visitor preferences
          when interacting with the website.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography>
          Where registration is required, the visitor's email will be stored on
          the server. The information is used primarly to communicate with the
          vistor regarding products and services, as well as to enhance the
          vistor's experience when using the website to display personalised
          content. E-mail addresses will not be sold, rented or leased to 3rd
          parties. E-mail may be sent to inform you of news of our services or
          offers by us or our affiliates. If you have subscribed to one of our
          services, you may unsubscribe by following the instructions which are
          included in e-mail that you receive. You may be able to block cookies
          via your browser settings but this may prevent you from access to
          certain features of the website. Cookies Cookies are small digital
          signature files that are stored by your web browser that allow your
          preferences to be recorded when visiting the website. Also they may be
          used to track your return visits to the website. 3rd party advertising
          companies will not use cookies for tracking purposes.
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);

export default Privacy;
