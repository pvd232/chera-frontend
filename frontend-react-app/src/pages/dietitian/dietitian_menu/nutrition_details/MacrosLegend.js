import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
const MacrosLegend = (props) => (
  <Grid container>
    <Grid
      container
      item
      xs={4}
      justifyContent={'space-evenly'}
      alignItems={'flex-end'}
    >
      <Typography
        fontSize={14}
        color={props.customTheme.palette.black.main}
        backgroundColor={'transparent'}
      >
        Carb
      </Typography>
      <Icon sx={{ color: props.carbColor }}>square</Icon>
    </Grid>

    <Grid
      container
      item
      xs={4}
      justifyContent={'space-evenly'}
      alignItems={'flex-end'}
    >
      <Typography
        fontSize={'.85rem'}
        color={props.customTheme.palette.black.main}
        backgroundColor={'transparent'}
      >
        Protein
      </Typography>

      <Icon sx={{ color: props.proteinColor }}>square</Icon>
    </Grid>
    <Grid
      container
      item
      xs={4}
      justifyContent={'space-evenly'}
      alignItems={'flex-end'}
    >
      <Typography
        fontSize={'.85rem'}
        color={props.customTheme.palette.black.main}
        backgroundColor={'transparent'}
      >
        Fat
      </Typography>

      <Icon sx={{ color: props.fatColor }}>square</Icon>
    </Grid>
  </Grid>
);
export default MacrosLegend;
