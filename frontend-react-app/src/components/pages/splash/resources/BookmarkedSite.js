import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
const BookedmarkedSite = (props) => (
  <Grid
    container
    lg={4}
    md={5.5}
    xs={10}
    rowGap={2}
    padding={2}
    justifyContent="center"
    sx={{
      backgroundColor: props.customTheme.palette.white1.main,
    }}
  >
    <Grid
      container
      lg={10}
      md={10}
      xs={12}
      justifyContent="center"
      alignItems="flex-end"
      // border={"2px black solid"}
      height={
        props.customTheme.extraLargeScreen()
          ? '20vh'
          : props.customTheme.largeScreen()
          ? '15vh'
          : '15vh'
      }
      margin={2}
    >
      <a href={props.imgHref} className="hoverLink">
        <img
          src={props.imgSrc}
          alt=""
          style={{
            height: 'auto',
            width: '90%',
            padding: 3,
            margin: '5%',
          }}
        ></img>
      </a>
    </Grid>

    <Grid lg={11} md={12} xs={12} margin={2}>
      <Typography>{props.resourceDescription}</Typography>
    </Grid>
  </Grid>
);
export default BookedmarkedSite;
