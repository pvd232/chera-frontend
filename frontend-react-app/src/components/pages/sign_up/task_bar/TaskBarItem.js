import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';

const TaskBarItem = (props) => {
  const customTheme = useTheme();
  return (
    <Grid item>
      <Stack direction={'column'} alignItems={'center'} spacing={1}>
        <Icon
          sx={{
            transform: `scale(1.7)`,
            color: `${
              props.index === props.taskIndex
                ? customTheme.palette.orange.main
                : customTheme.palette.lightGrey.main
            }`,
          }}
        >
          {props.symbolName}
        </Icon>
        <Typography
          fontSize={customTheme.fontEqualizer(6, true)}
          fontWeight={'bold'}
          color={
            props.index === props.taskIndex
              ? customTheme.palette.orange.main
              : customTheme.palette.lightGrey.main
          }
        >
          {props.text}
        </Typography>
      </Stack>
    </Grid>
  );
};
export default TaskBarItem;
