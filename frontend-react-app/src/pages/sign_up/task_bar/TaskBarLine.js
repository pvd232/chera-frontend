import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import { useTheme } from '@mui/material/styles';
const TaskBarLine = (props) => {
  const customTheme = useTheme();
  return (
    <Grid container item xs={1} direction={'column'}>
      <Grid item xs={6}></Grid>
      <Grid item xs={6}>
        <Icon
          sx={{
            transform: 'scale(1.8)',
            color: `${
              props.index === props.taskIndex ||
              (props.taskIndex === 3 && props.index === props.taskIndex - 1)
                ? customTheme.palette.orange.main
                : customTheme.palette.lightGrey.main
            }`,
          }}
        >
          horizontal_rule
        </Icon>
      </Grid>
    </Grid>
  );
};
export default TaskBarLine;
