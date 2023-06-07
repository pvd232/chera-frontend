import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
const BookToRead = (props) => (
  <Grid
    container
    lg={3.7}
    md={3.7}
    rowGap={1}
    padding={2}
    justifyContent="center"
  >
    <Grid
      container
      lg={10}
      md={10}
      justifyContent="center"
      alignItems="flex-end"
      height={'auto'}
      margin={0}
    >
      <img
        className="hoverLink"
        src={props.imgSrc}
        alt=""
        style={{
          height: '30vh',
          padding: 3,
          margin: '5%',
        }}
        onClick={() => window.location.assign(props.imgHref)}
      ></img>
    </Grid>
    <Grid lg={11} md={11} xs={12} textAlign="center">
      <Typography fontWeight={'bold'}>{props.bookTitle}</Typography>
    </Grid>
    <Grid
      lg={11}
      md={11}
      marginTop={1}
      padding={2}
      sx={{
        backgroundColor: props.customTheme.palette.fucia.secondary,
      }}
    >
      <Typography
        fontSize={props.customTheme.pages.resources.fontSize.cardTitle}
      >
        {props.resourceDescription}
      </Typography>
    </Grid>
  </Grid>
);
export default BookToRead;
