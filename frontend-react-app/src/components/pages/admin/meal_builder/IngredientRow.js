import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Icon from '@mui/material/Icon';
import capitalize from '../../../../helpers/capitalize';
import RecipeIngredientItem from '../../../ui_data_containers/RecipeIngredientItem';
import { v4 as uuid } from 'uuid';
import { FormControl } from '@mui/material';
const IngredientRow = (props) => {
  return (
    <Grid container item alignItems={'center'} spacing={2}>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="ingredientLabelId">Ingredient</InputLabel>
          <Select
            labelId="ingredientLabelId"
            required
            label="Ingredient"
            name="usdaIngredientId"
            value={props.ingredient ? props.ingredient.usdaIngredientId : ''}
            onChange={(event) => {
              const extendedUSDAIngredient = props.extendedUSDAIngredients.get(
                event.target.value
              );
              const recipeIngredientId = uuid();
              const newIngredient =
                RecipeIngredientItem.constructFromExtendedUSDAIngredient(
                  extendedUSDAIngredient,
                  recipeIngredientId
                );
              props.updateIngredient(newIngredient);
            }}
          >
            {Array.from(props.extendedUSDAIngredients.values()).map(
              (ingredient) => (
                <MenuItem
                  key={`usdaIngredientId-${ingredient.id}`}
                  value={ingredient.id}
                >
                  {capitalize(ingredient.name)} - ({ingredient.id})
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <TextField
          required
          name={`quantity-${props.index}`}
          label="Quantity"
          type="number"
          disabled={!props.ingredient}
          value={props.ingredient ? props.ingredient.quantity : 0}
          onChange={(event) => {
            const newIngredient = new RecipeIngredientItem(props.ingredient);
            newIngredient.quantity = event.target.value;
            props.updateIngredient(newIngredient);
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="ingredientServingSizeLabel">Serving Size</InputLabel>
          <Select
            labelId="ingredientServingSizeLabel"
            label="Serving Size"
            required
            name="servingSize"
            disabled={!props.ingredient}
            value={
              props.ingredient ? props.ingredient.usdaIngredientPortionId : ''
            }
            onChange={(event) => {
              const usdaIngredientPortion =
                props.ingredient.usdaIngredientPortions.find(
                  (portion) => portion.id === event.target.value
                );
              const newIngredient = new RecipeIngredientItem(props.ingredient);
              newIngredient.nonMetricUnit = event.target.nonMetricUnit;
              newIngredient.usdaIngredientPortionId = usdaIngredientPortion.id;
              props.updateIngredient(newIngredient);
            }}
          >
            {props.ingredient &&
              props.ingredient.usdaIngredientPortions.map((portion) => (
                <MenuItem
                  key={`usdaIngredientPortion${portion.id}`}
                  value={portion.id}
                >
                  {capitalize(portion.nonMetricUnit)} - {portion.fdaPortionId}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      {props.ingredient && (
        <Grid item>
          <Icon
            onClick={props.removeIngredient}
            sx={{ cursor: 'pointer', marginLeft: 'auto' }}
          >
            close
          </Icon>
        </Grid>
      )}
    </Grid>
  );
};
export default IngredientRow;
