import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import APIClient from '../../../../helpers/APIClient';
import BlackButton from '../../../shared_components/BlackButton';
import RowBorder from '../../dietitian/dietitian_menu/nutrition_details/RowBorder';
import capitalize from '../../../../helpers/capitalize';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
import MealPlanSnackDTO from '../../../../data_models/dto/MealPlanSnackDTO';
import RecipeIngredientDTO from '../../../../data_models/dto/RecipeIngredientDTO';
import BlueCircularProgress from '../../../shared_components/BlueCircularProgress';
import IngredientRow from '../meal_builder/IngredientRow';
import SnackCard from '../meal_builder/MealCard';
import updateUSDAIngredients from './helpers/updateUSDAIngredients';
import createSnackData from './helpers/createSnackData';
import getSnack from './helpers/getSnack';

const SnackBuilder = () => {
  const [mealPlanSnacks, setMealPlanSnacks] = useState([]);
  const [selectedSnackIndex, setSelectedSnackIndex] = useState(0);
  const [snackId, setSnackId] = useState(false);
  const [snackName, setSnackName] = useState('');
  const [snackDescription, setSnackDescription] = useState('');
  const [snackPrice, setSnackPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [snackIngredients, setSnackIngredients] = useState([]);

  const [extendedUsdaIngredients, setExtendedUsdaIngredients] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    updateUSDAIngredients({
      mounted: mounted,
      setExtendedUsdaIngredients: setExtendedUsdaIngredients,
      setSnackPrice: setSnackPrice,
      setMealPlans: setMealPlans,
      setMealPlanSnacks: setMealPlanSnacks,
    });

    return () => (mounted = false);
  }, []);

  const handleUpdateSnackIndex = (index) => {
    setSelectedSnackIndex(index);
    setSnackId(getSnack(mealPlanSnacks, index).snackId);
    setSnackName(getSnack(mealPlanSnacks, index).snackName);
    setSnackDescription(getSnack(mealPlanSnacks, index).snackDescription);
    setImageUrl(getSnack(mealPlanSnacks, index).imageUrl);
    setSnackIngredients(getSnack(mealPlanSnacks, index).snackIngredients);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (snackId) {
      // Delete old snack first
      await APIClient.deleteSnack(snackId);
    }

    // Generate new snack id
    const newSnackId = uuid();
    const newSnackDTO = createSnackData(
      newSnackId,
      snackName,
      snackPrice,
      snackDescription,
      imageUrl
    );
    await APIClient.createSnack(newSnackDTO);

    for (const mealPlan of mealPlans) {
      const mealPlanSnackDTO = new MealPlanSnackDTO({
        id: uuid(),
        snack_id: newSnackId,
        meal_plan_id: mealPlan.id,
        active: true,
      });
      await APIClient.createMealPlanSnack(mealPlanSnackDTO);
      const recipeIngredients = snackIngredients.map((ingredient) => {
        const newRecipeIngredientId = uuid();
        return new RecipeIngredientDTO({
          id: newRecipeIngredientId,
          usda_ingredient_id: ingredient.usdaIngredientId,
          meal_plan_meal_id: '',
          meal_plan_snack_id: mealPlanSnackDTO.id,
          usda_ingredient_portion_id: ingredient.usdaIngredientPortionId,
          quantity: ingredient.quantity,
          active: true,
        });
      });
      await APIClient.createRecipeIngredients(recipeIngredients);
      await APIClient.createRecipeIngredientNutrients(recipeIngredients);
    }
    setLoading(false);
    alert('Snack created!');
    window.location.reload();
  };
  const handleSave = () => {
    setSaveButtonLoading(true);
    const mealBuilderSnack = {
      snackId: snackId,
      snackName: snackName,
      snackDescription: snackDescription,
      snackPrice: snackPrice,
      imageUrl: imageUrl,
      snackIngredients: snackIngredients,
    };
    LocalStorageManager.shared.savedMealBuilderSnack = mealBuilderSnack;
    updateUSDAIngredients({
      mounted: true,
      setExtendedUsdaIngredients: setExtendedUsdaIngredients,
      setSnackPrice: setSnackPrice,
      setMealPlans: setMealPlans,
      setMealPlanSnacks: setMealPlanSnacks,
    }).then(() => setSaveButtonLoading(false));
  };

  const handleAddIngredient = (newIngredient) => {
    setSnackIngredients([...snackIngredients, newIngredient]);
  };
  const handleRemoveIngredient = (index) => {
    setSnackIngredients((prevSnackIngredients) => {
      const newIngredients = [...prevSnackIngredients];
      newIngredients.splice(index, 1);
      return newIngredients;
    });
  };
  const handleUpdateIngredient = (index, newIngredient) => {
    setSnackIngredients((prevSnackIngredients) => {
      const newSnackIngredients = [...prevSnackIngredients];
      newSnackIngredients.splice(index, 1, newIngredient);
      return newSnackIngredients;
    });
  };
  return (
    <Grid
      container
      paddingTop={'5vh'}
      paddingLeft={'3vw'}
      paddingRight={'3vw'}
      paddingBottom={'10vh'}
    >
      <Grid
        container
        item
        paddingTop={'6vh'}
        justifyContent={window.innerWidth < 450 ? 'center' : 'flex-start'}
        spacing={2}
      >
        <Grid item container>
          <Grid item>
            <Grid container item rowSpacing={4} columnGap={2}>
              <Grid item container justifyContent={'center'}>
                <Grid item>
                  <Typography variant="h4" fontWeight={'bold'}>
                    {'Snack Builder :)'}
                  </Typography>
                </Grid>
                <Grid container justifyContent={'flex-end'}>
                  <BlackButton onClick={handleSave}>
                    {saveButtonLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      'Save'
                    )}
                  </BlackButton>
                </Grid>
                <Grid container justifyContent={'flex-end'} marginTop={2}>
                  <Grid item lg={3} sx={{ textAlign: 'left' }}>
                    <FormControl fullWidth>
                      <InputLabel id="snacksLabel">Edit Snack</InputLabel>
                      <Select
                        labelId="snacksLabel"
                        required
                        label="Edit Snack"
                        name="selectedSnackIndex"
                        value={selectedSnackIndex}
                        onChange={(event) => {
                          handleUpdateSnackIndex(event.target.value);
                        }}
                      >
                        <MenuItem value={0} key={0}>
                          {'New Snack'}
                        </MenuItem>
                        {mealPlanSnacks.map((snack, i) => (
                          <MenuItem key={i + 1} value={i + 1}>
                            {capitalize(snack.snackName)}
                          </MenuItem>
                        ))}
                        {LocalStorageManager.shared.savedMealBuilderSnack && (
                          <MenuItem value={mealPlanSnacks.length + 1}>
                            {'(Saved snack) ' +
                              capitalize(
                                LocalStorageManager.shared.savedMealBuilderSnack
                                  .snackName
                              )}
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={12}>
                  <Typography>Snack</Typography>
                </Grid>
                {/* Snack information */}
                <Grid item lg={2}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="snackName"
                    multiline
                    value={snackName}
                    onChange={(event) => {
                      setSnackName(event.target.value);
                      setImageUrl(
                        'https://storage.googleapis.com/chera_meal_photos/' +
                          event.target.value
                            .toLowerCase()
                            .replace('&', 'and')
                            .split(' ')
                            .join('_') +
                          '.jpg'
                      );
                    }}
                  />
                </Grid>

                <Grid item lg={5} sx={{ textAlign: 'right' }}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="snackDescription"
                    multiline
                    value={snackDescription}
                    onChange={(event) =>
                      setSnackDescription(event.target.value)
                    }
                  />
                </Grid>

                <Grid item lg={2} sx={{ textAlign: 'right' }}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="imageURL"
                    multiline
                    value={imageUrl}
                    onChange={(event) => setImageUrl(event.target.value)}
                  />
                </Grid>
              </Grid>
              {/* Spacer */}
              <Grid item xs={12} paddingBottom={2}></Grid>
              {/* Ingredients */}

              <Grid container spacing={2}>
                {snackIngredients.map((ingredient, i) => (
                  <IngredientRow
                    key={ingredient.id}
                    ingredient={ingredient}
                    index={i}
                    updateIngredient={(newIngredient) =>
                      handleUpdateIngredient(i, newIngredient)
                    }
                    removeIngredient={() => handleRemoveIngredient(i)}
                    extendedUSDAIngredients={extendedUsdaIngredients}
                  />
                ))}
                <IngredientRow
                  index={snackIngredients.length + 1}
                  key={'newIngredient'}
                  updateIngredient={(newIngredient) =>
                    handleAddIngredient(newIngredient)
                  }
                  extendedUSDAIngredients={extendedUsdaIngredients}
                />
              </Grid>
              <Grid container justifyContent={'center'} paddingTop={10}>
                <Grid item paddingBottom={2}>
                  <SnackCard
                    snackName={snackName}
                    snackDescription={snackDescription}
                    imageUrl={imageUrl}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} marginY={'3vh'}>
            <RowBorder height={'2px'}></RowBorder>
          </Grid>
        </Grid>
        <Grid item xs={2} sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <BlackButton
            variant="contained"
            onClick={handleSubmit}
            sx={{ width: '100%', padding: '1vh' }}
          >
            {loading ? <BlueCircularProgress /> : 'Submit'}
          </BlackButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SnackBuilder;
