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
          <div
            style={{
              borderRadius: '50%',
              padding: '1rem',
              backgroundColor: `#ffd5da`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon
              fontSize="large"
              sx={{
                color: `${props.customTheme.palette.olive.main}`,
              }}
            >
              {props.symbolName}
            </Icon>
          </div>
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
