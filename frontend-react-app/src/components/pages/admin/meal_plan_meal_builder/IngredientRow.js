import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import capitalize from '../../../../helpers/capitalize';
import { FormControl } from '@mui/material';
import { useState } from 'react';
import ExtendedRecipeIngredientDTO from '../../../../data_models/dto/ExtendedRecipeIngredientDTO';
const IngredientRow = (props) => {
  console.log('props.ingredient', props.ingredient);
  const [localQuantity, setLocalQuantity] = useState(false);
  const handleBlur = (event) => {
    const newIngredient = new ExtendedRecipeIngredientDTO(
      props.ingredient.toJSON()
    );
    newIngredient.quantity = parseFloat(event.target.value);
    props.updateIngredient(newIngredient);
  };
  return (
    <Grid container item alignItems={'center'} spacing={2}>
      <Grid container item alignItems={'center'} spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              name={`ingredientName`}
              label="Ingredient"
              type="text"
              disabled={true}
              value={
                capitalize(props.ingredient.name) +
                '-' +
                props.ingredient.usdaIngredientFdcId
              }
            />
          </FormControl>
        </Grid>

        <Grid item>
          <TextField
            required
            name={`quantity-${props.index}`}
            label="Quantity"
            type="number"
            disabled={props.mealPlanNumber % 2 === 0}
            value={localQuantity ? localQuantity : props.ingredient.quantity}
            onBlur={(e) => handleBlur(e)}
            onChange={(event) => {
              setLocalQuantity(event.target.value);
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
        <Grid item xs={2}>
          <TextField
            name={`kCal-${props.index}`}
            label="kCal"
            type="text"
            value={props.ingredient.kCal.toFixed()}
          />
        </Grid>
      </Grid>

      <Grid container item alignItems={'center'} spacing={2}>
        <Grid item xs={4}></Grid>

        <Grid item>
          <TextField
            required
            name={`quantity-${props.index}`}
            label="New Quantity"
            type="text"
            disabled={true}
            value={
              localQuantity
                ? localQuantity * props.multiplier
                : props.ingredient.quantity * props.multiplier
            }
            onBlur={(e) => handleBlur(e)}
            onChange={(event) => {
              setLocalQuantity(event.target.value * props.multiplier);
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
    </Grid>
  );
};
export default IngredientRow;
