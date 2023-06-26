import { Button } from '@mui/material';
export const OtherMealButton = (props) => {
  <Button
    variant={'contained'}
    onClick={() => props.handleAddScheduledOrderMeal(props.meal)}
    disabled={props.cantMakeChanges}
    className={props.className}
  >
    Add meal
  </Button>;
};
