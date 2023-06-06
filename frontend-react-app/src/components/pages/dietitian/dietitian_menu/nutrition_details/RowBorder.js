import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

const RowBorder = (props) => {
  const customTheme = useTheme();
  return (
    <Grid
      item
      container
      xs={props.truncate ? 11.5 : 12}
      sx={{
        backgroundColor: props.greyRow
          ? `${customTheme.palette.lightGrey.main}`
          : `${customTheme.palette.black.main}`,
        height: props.height,
        bottom: '0',
        left: '1vw',
        right: '1vw',
        marginLeft: props.truncate ? 'auto' : '',
        marginTop: '3px',
        marginBottom: '3px',
      }}
    ></Grid>
  );
};
export default RowBorder;
