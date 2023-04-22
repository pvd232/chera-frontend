import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import '../../../static/css/Resources.css';

const ResourceCategory = (props) => {
  const customTheme = useTheme();
  return (
    <Grid
      container
      lg={9}
      md={10}
      xs={11}
      sx={{ backgroundColor: customTheme.palette.oliveCompliment.tertiary }}
      alignItems={'center'}
      paddingBottom="1vh"
      paddingTop="1vh"
      paddingLeft={customTheme.smallerScreen() ? '5vw' : '2vw'}
      justifyContent={
        customTheme.largerScreen() ? 'space-evenly' : 'flex-start'
      }
      onClick={props.executeScroll}
      columnGap={customTheme.smallerScreen() ? '3vw' : ''}
      className="hoverLink"
    >
      <Grid>
        <Icon
          sx={{
            fontSize: '2.5rem',
          }}
        >
          {props.icon}
        </Icon>
      </Grid>
      <Grid lg={9}>
        <Typography
          sx={{
            fontSize: customTheme.fontEqualizer(20),
            textAlign: 'center',
          }}
          color={customTheme.palette.black.main}
        >
          {props.text}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default ResourceCategory;
