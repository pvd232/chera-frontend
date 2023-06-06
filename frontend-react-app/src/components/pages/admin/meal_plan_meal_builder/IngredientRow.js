import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import capitalize from '../../../../helpers/capitalize';
import { FormControl } from '@mui/material';
import { useState } from 'react';
import ExtendedRecipeIngredientDTO from '../../../../data_models/dto/ExtendedRecipeIngredientDTO';
const IngredientRow = (props) => {
  const [localQuantity, setLocalQuantity] = useState(false);
  return (
    <Grid container item alignItems={'center'} spacing={2}>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <TextField
            name={`ingredientName`}
            label="Ingredient"
            type="text"
            disabled={true}
            value={capitalize(props.ingredient.name)}
          />
        </FormControl>
      </Grid>

      <Grid item>
        <TextField
          required
          name={`quantity-${props.index}`}
          label="Quantity"
          type="text"
          disabled={props.mealPlanNumber % 2 === 0}
          value={localQuantity ? localQuantity : props.ingredient.quantity}
          onChange={(event) => {
            const isMidwayThroughTyping =
              event.target.value.split('.').length > 1;
            if (isMidwayThroughTyping) {
              setLocalQuantity(event.target.value);
              return;
            }
            const newIngredient = new ExtendedRecipeIngredientDTO(
              props.ingredient.toJSON()
            );
            newIngredient.quantity = parseFloat(event.target.value);
            props.updateIngredient(newIngredient);
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <Grid item>
          <TextField
            name={`servingSize-${props.index}`}
            label="Serving Size"
            type="text"
            disabled={true}
            value={props.ingredient.nonMetricUnit}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default IngredientRow;
