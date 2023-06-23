import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { CircularProgress } from '@mui/material';
import APIClient from '../../../../helpers/APIClient';
import BlackButton from '../../../shared_components/BlackButton.ts';
import RowBorder from '../../dietitian/dietitian_menu/nutrition_details/RowBorder';
import capitalize from '../../../../helpers/capitalize';
import LocalStorageManager from '../../../../helpers/LocalStorageManager.ts';
import MealPlanMealDTO from '../../../../data_models/dto/MealPlanMealDTO';
import RecipeIngredientDTO from '../../../../data_models/dto/RecipeIngredientDTO';
import BlueCircularProgress from '../../../shared_components/BlueCircularProgress';
import IngredientRow from './IngredientRow';
import OrangeSwitch from './OrangeSwitch';
import MealCard from './MealCard';
import updateUSDAIngredients from './helpers/updateUSDAIngredients';
import createMealData from './helpers/createMealData';
import getMeal from './helpers/getMeal';
const MealBuilder = () => {
  const [mealPlanMeals, setMealPlanMeals] = useState([]);
  const [selectedMealIndex, setSelectedMealIndex] = useState(0);
  const [mealId, setMealId] = useState(false);
  const [mealName, setMealName] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [mealPrice, setMealPrice] = useState(0);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [mealIngredients, setMealIngredients] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);

  const [extendedUsdaIngredients, setExtendedUsdaIngredients] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [hasBeenSaved, setHasBeenSaved] = useState(false);

  useEffect(() => {
    let mounted = true;
    updateUSDAIngredients({
      mounted: mounted,
      setExtendedUsdaIngredients: setExtendedUsdaIngredients,
      setMealPrice: setMealPrice,
      setDietaryRestrictions: setDietaryRestrictions,
      setMealPlans: setMealPlans,
      setMealPlanMeals: setMealPlanMeals,
    });
    return () => (mounted = false);
  }, []);
  const handleUpdateMealIndex = (index) => {
    setSelectedMealIndex(index);
    setMealId(getMeal(mealPlanMeals, index).mealId);
    setMealName(getMeal(mealPlanMeals, index).mealName);
    setMealTime(getMeal(mealPlanMeals, index).mealTime);
    setMealDescription(getMeal(mealPlanMeals, index).mealDescription);
    setIsVegetarian(getMeal(mealPlanMeals, index).isVegetarian);
    setImageUrl(getMeal(mealPlanMeals, index).imageUrl);
    setMealIngredients(getMeal(mealPlanMeals, index).mealIngredients);
    setHasBeenSaved(false);
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (mealId) {
      // Delete old meal first
      await APIClient.deleteMeal(mealId);
    }

    // Generate new meal id
    const newMealId = uuid();

    const [newMealDTO, newMealDietaryRestrictionDTO] = createMealData(
      newMealId,
      dietaryRestrictions,
      mealName,
      mealTime,
      mealPrice,
      mealDescription,
      imageUrl,
      isVegetarian
    );
    await APIClient.createMeal(newMealDTO);

    if (newMealDietaryRestrictionDTO) {
      await APIClient.createMealDietaryRestriction(
        newMealDietaryRestrictionDTO
      );
    }

    for (const mealPlan of mealPlans) {
      const mealPlanMealDTO = new MealPlanMealDTO({
        id: uuid(),
        meal_id: newMealId,
        meal_plan_id: mealPlan.id,
        multiplier: 1,
        active: true,
      });
      await APIClient.createMealPlanMeal(mealPlanMealDTO);
      const recipeIngredients = mealIngredients.map((ingredient) => {
        const newRecipeIngredientId = uuid();
        return new RecipeIngredientDTO({
          id: newRecipeIngredientId,
          usda_ingredient_id: ingredient.usdaIngredientId,
          meal_plan_meal_id: mealPlanMealDTO.id,
          meal_plan_snack_id: '',
          usda_ingredient_portion_id: ingredient.usdaIngredientPortionId,
          quantity: ingredient.quantity,
          active: true,
        });
      });
      await APIClient.createRecipeIngredients(recipeIngredients);
      await APIClient.createRecipeIngredientNutrients(recipeIngredients);
    }
    setLoading(false);
    setHasBeenSaved(false);

    alert('Meal created!');
    window.location.reload();
  };
  const handleSave = () => {
    setSaveButtonLoading(true);
    const mealBuilderMeal = {
      mealId: mealId,
      mealName: mealName,
      mealTime: mealTime,
      mealDescription: mealDescription,
      mealPrice: mealPrice,
      isVegetarian: isVegetarian,
      dietaryRestrictions: dietaryRestrictions,
      imageUrl: imageUrl,
      mealIngredients: mealIngredients,
    };
    LocalStorageManager.shared.savedMealBuilderMeal = mealBuilderMeal;
    updateUSDAIngredients({
      mounted: true,
      setExtendedUsdaIngredients: setExtendedUsdaIngredients,
      setMealPrice: setMealPrice,
      setDietaryRestrictions: setDietaryRestrictions,
      setMealPlans: setMealPlans,
      setMealPlanMeals: setMealPlanMeals,
    }).then(() => setSaveButtonLoading(false));
    setHasBeenSaved(true);
  };

  const handleAddIngredient = (newIngredient) => {
    setMealIngredients([...mealIngredients, newIngredient]);
  };
  const handleRemoveIngredient = (index) => {
    setMealIngredients((prevMealIngredients) => {
      const newIngredients = [...prevMealIngredients];
      newIngredients.splice(index, 1);
      return newIngredients;
    });
  };
  const handleUpdateIngredient = (index, newIngredient) => {
    setMealIngredients((prevMealIngredients) => {
      const newMealIngredients = [...prevMealIngredients];
      newMealIngredients.splice(index, 1, newIngredient);
      return newMealIngredients;
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
                    {'Meal Builder :)'}
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
                      <InputLabel id="mealsLabel">Edit Meal</InputLabel>
                      <Select
                        labelId="mealsLabel"
                        required
                        label="Edit Meal"
                        name="selectedMealIndex"
                        value={selectedMealIndex}
                        onChange={(event) => {
                          handleUpdateMealIndex(event.target.value);
                        }}
                      >
                        <MenuItem value={0} key={0}>
                          {'New Meal'}
                        </MenuItem>
                        {mealPlanMeals.map((meal, i) => (
                          <MenuItem key={i + 1} value={i + 1}>
                            {capitalize(meal.mealName)}
                          </MenuItem>
                        ))}
                        {LocalStorageManager.shared.savedMealBuilderMeal && (
                          <MenuItem value={mealPlanMeals.length + 1}>
                            {'(Saved meal) ' +
                              capitalize(
                                LocalStorageManager.shared.savedMealBuilderMeal
                                  .mealName
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
                  <Typography>Meal</Typography>
                </Grid>
                {/* Meal information */}
                <Grid item lg={2}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="mealName"
                    multiline
                    value={mealName}
                    onChange={(event) => {
                      setMealName(event.target.value);
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
                    name="mealDescription"
                    multiline
                    value={mealDescription}
                    onChange={(event) => setMealDescription(event.target.value)}
                  />
                </Grid>
                <Grid item lg={1.5} sx={{ textAlign: 'left' }}>
                  <FormControl fullWidth>
                    <InputLabel id="mealTimeLabel">Meal Time</InputLabel>
                    <Select
                      labelId="mealTimeLabel"
                      required
                      label="Meal Time"
                      name="mealTime"
                      value={mealTime}
                      onChange={(event) => setMealTime(event.target.value)}
                    >
                      {LocalStorageManager.shared.mealTimes.map((mealTime) => (
                        <MenuItem key={mealTime} value={mealTime}>
                          {capitalize(mealTime)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                <Grid container item lg={1} alignItems="center">
                  <Grid item lg={2}>
                    <FormControlLabel
                      control={
                        <OrangeSwitch
                          checked={isVegetarian}
                          onChange={() => setIsVegetarian(!isVegetarian)}
                        />
                      }
                      label="Vegetarian"
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Spacer */}
              <Grid item xs={12} paddingBottom={2}></Grid>
              {/* Ingredients */}

              <Grid container spacing={2}>
                {mealIngredients.map((ingredient, i) => (
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
                  index={mealIngredients.length + 1}
                  key={'newIngredient'}
                  updateIngredient={(newIngredient) =>
                    handleAddIngredient(newIngredient)
                  }
                  extendedUSDAIngredients={extendedUsdaIngredients}
                />
              </Grid>
              {hasBeenSaved && (
                <Grid container justifyContent={'center'} paddingTop={10}>
                  <Grid item paddingBottom={2}>
                    <MealCard
                      mealName={mealName}
                      mealTime={mealTime}
                      mealDescription={mealDescription}
                      imageUrl={imageUrl}
                    />
                  </Grid>
                </Grid>
              )}
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
export default MealBuilder;
