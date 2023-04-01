import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';

const LogisticsStep = (props) => (
  <Box flexGrow={1}>
    <CardContent
      sx={{
        paddingBottom: props.customTheme.smallerScreen()
          ? '8px !important'
          : '',
        paddingTop: props.customTheme.smallerScreen() ? '16px !important' : '',
      }}
    >
      <Grid
        container
        alignItems="center"
        spacing={
          props.customTheme.extraSmallScreen()
            ? 1
            : props.customTheme.smallScreen()
            ? 4
            : 6
        }
        justifyContent={props.customTheme.smallerScreen() ? 'center' : ''}
      >
        <Grid item>
          <Icon
            sx={{
              fontSize: props.customTheme.largerScreen() ? '4rem' : '3rem',
              color: `${props.customTheme.palette.olive.secondary}`,
            }}
          >
            {props.symbolName}
          </Icon>
        </Grid>
        <Grid container item lg={9} md={9} xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography
              fontFamily={'Inter'}
              fontSize={props.customTheme.fontEqualizer(
                `${props.primaryFontSize ?? 8}`,
                true
              )}
              fontWeight={'bold'}
              color={props.customTheme.palette.darkGrey.main}
            >
              {props.headerText}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              fontFamily={'Inter'}
              fontSize={props.customTheme.fontEqualizer(
                `${props.secondaryFontSize ?? 7}`,
                true
              )}
              color={props.customTheme.palette.secondaryText.main}
            >
              {props.bodyText}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Box>
);
export default LogisticsStep;
