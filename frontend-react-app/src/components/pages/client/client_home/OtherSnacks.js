import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import OtherSnackCard from './OtherSnackCard';

const OtherSnacks = (props) => {
  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        background: `${props.customTheme.palette.lightGrey.secondary}`,
        borderTop: `solid 2px ${props.customTheme.palette.lightGrey.secondary}`,
      }}
      py={5}
      justifyContent={'center'}
    >
      <Grid
        container
        item
        lg={10}
        spacing={3}
        paddingTop={'3vh'}
        paddingBottom={'1vh'}
        justifyContent={'flex-start'}
      >
        <Grid item container>
          <Typography
            fontSize={'2rem'}
            fontWeight={'500'}
            component="div"
            paddingBottom={'3vh'}
          >
            Other snacks to choose from
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          spacing={2}
          marginTop={'2vh'}
          marginBottom={'4vh'}
        ></Grid>
        {props.otherSnacks.map((otherSnack, i) => (
          <Grid
            item
            key={`grid-${i}`}
            sx={{
              marginLeft: window.innerWidth < 450 ? 'auto' : '',
              marginRight: window.innerWidth < 450 ? 'auto' : '',
            }}
          >
            <OtherSnackCard
              key={`otherSnackCard-${i}`}
              snack={otherSnack}
              handleAddScheduledOrderSnack={(snack) =>
                props.handleAddScheduledOrderSnack(snack)
              }
              handleRemoveScheduledOrderSnack={(snack) =>
                props.handleRemoveScheduledOrderSnack(snack)
              }
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default OtherSnacks;
