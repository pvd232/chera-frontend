import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import '../../../../../static/scss/NutritionLabel.scss';
import NutrientItem from '../../../../ui_data_containers/NutrientItem';
import NewNutrientItem from '../../../../ui_data_containers/NewNutrientItem';
import RowBorder from './RowBorder';

const NutritionLabel = (props) => (
  <section className="performance-facts">
    <header className="performance-facts__header">
      <h1 className="performance-facts__title">Nutrition Facts</h1>
      <Typography sx={{ marginBottom: '0' }} fontSize={'.85rem'}>
        Serving Size: 1 meal ({props.mealPlanMeal.weight.toFixed()}g)
      </Typography>
      <Typography sx={{ marginBottom: '0' }} fontSize={'.85rem'}>
        Servings per container: 1
      </Typography>
    </header>
    <Grid container item>
      <Grid item>
        <Typography
          color={'black'}
          fontSize={'.75rem'}
          sx={{ paddingTop: '2px' }}
        >
          Amount Per Serving
        </Typography>
      </Grid>
      <RowBorder height={'1px'}></RowBorder>
      <Grid container>
        <Grid item xs={12}>
          <Typography color={'black'} fontSize={'.85rem'}>
            <b>Calories</b> {props.mealPlanMeal.kCal.toFixed()}
          </Typography>
        </Grid>

        <RowBorder height={'5px'}></RowBorder>

        <Grid item xs={12} textAlign={'right'}>
          <Typography color={'black'} fontSize={'.75rem'} fontWeight={'bold'}>
            % Daily Value*
          </Typography>
        </Grid>
        <RowBorder height={'1px'}></RowBorder>
        {/* TODO link all daily values to props.mealPlanMeal */}
        <Grid container>
          <Grid container item xs={12} justifyContent={'space-between'}>
            <Grid item>
              <Typography
                color={'black'}
                fontSize={'.85rem'}
                fontWeight={'bold'}
              >
                Total Fat{' '}
                {Math.round(
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('fat'))
                    .amount
                )}{' '}
                g
              </Typography>
            </Grid>

            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                {Math.round(
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('fat'))
                    .dailyValue * 100
                )}
                %
              </Typography>
            </Grid>
          </Grid>
          <RowBorder height={'1px'} truncate={true}></RowBorder>
          <Grid container justifyContent={'flex-end'}>
            <Grid container item xs={11.5} justifyContent={'space-between'}>
              <Grid item>
                <Typography color={'black'} fontSize={'.85rem'}>
                  Saturated Fat{' '}
                  {Math.round(
                    new NewNutrientItem(
                      props.mealPlanMeal.getNutrient('saturated_fat')
                    ).amount
                  )}{' '}
                  g
                </Typography>
              </Grid>

              <Grid item>
                <Typography color={'black'} fontSize={'.85rem'}>
                  {Math.round(
                    new NewNutrientItem(
                      props.mealPlanMeal.getNutrient('saturated_fat')
                    ).dailyValue * 100
                  )}
                  %
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <RowBorder height={'1px'} truncate={true}></RowBorder>

          <Grid container justifyContent={'flex-end'}>
            <Grid item xs={11.5}>
              <Typography color={'black'} fontSize={'.85rem'}>
                Trans Fat 0g
              </Typography>
            </Grid>
          </Grid>
          <RowBorder height={'1px'}></RowBorder>
          <Grid container item xs={12} justifyContent={'space-between'}>
            <Grid item>
              <Typography
                color={'black'}
                fontSize={'.85rem'}
                fontWeight={'bold'}
              >
                Cholesterol{' '}
                {Math.round(
                  new NewNutrientItem(
                    props.mealPlanMeal.getNutrient('cholesterol')
                  ).amount
                )}{' '}
                {
                  new NewNutrientItem(
                    props.mealPlanMeal.getNutrient('cholesterol')
                  ).unit
                }
              </Typography>
            </Grid>

            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                {Math.round(
                  new NewNutrientItem(
                    props.mealPlanMeal.getNutrient('cholesterol')
                  ).dailyValue * 100
                )}
                %
              </Typography>
            </Grid>
          </Grid>
          <RowBorder height={'1px'}></RowBorder>
          <Grid container item xs={12} justifyContent={'space-between'}>
            <Grid item>
              <Typography
                color={'black'}
                fontSize={'.85rem'}
                fontWeight={'bold'}
              >
                Sodium{' '}
                {Math.round(
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('sodium'))
                    .amount
                )}{' '}
                {
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('sodium'))
                    .unit
                }
              </Typography>
            </Grid>

            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                {Math.round(
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('sodium'))
                    .dailyValue * 100
                )}
                %
              </Typography>
            </Grid>
          </Grid>
          <RowBorder height={'1px'}></RowBorder>
          <Grid container item xs={12} justifyContent={'space-between'}>
            <Grid item>
              <Typography
                color={'black'}
                fontSize={'.85rem'}
                fontWeight={'bold'}
              >
                Total Carbohydrates{' '}
                {Math.round(
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('carb'))
                    .amount
                )}{' '}
                {
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('carb'))
                    .unit
                }
              </Typography>
            </Grid>

            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                {Math.round(
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('carb'))
                    .dailyValue * 100
                )}
                %
              </Typography>
            </Grid>
          </Grid>
          <RowBorder height={'1px'} truncate={true}></RowBorder>
          <Grid container justifyContent={'flex-end'}>
            <Grid container item xs={11.5} justifyContent={'space-between'}>
              <Grid item>
                <Typography color={'black'} fontSize={'.85rem'}>
                  Dietary Fiber{' '}
                  {Math.round(
                    new NewNutrientItem(
                      props.mealPlanMeal.getNutrient('dietary_fiber')
                    ).amount
                  )}{' '}
                  {
                    new NewNutrientItem(
                      props.mealPlanMeal.getNutrient('dietary_fiber')
                    ).unit
                  }
                </Typography>
              </Grid>

              <Grid item>
                <Typography color={'black'} fontSize={'.85rem'}>
                  {Math.round(
                    new NewNutrientItem(
                      props.mealPlanMeal.getNutrient('dietary_fiber')
                    ).dailyValue * 100
                  )}
                  %
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <RowBorder height={'1px'} truncate={true}></RowBorder>

          <Grid container justifyContent={'flex-end'}>
            <Grid item xs={11.5}>
              <Typography color={'black'} fontSize={'.85rem'}>
                Sugars{' '}
                {Math.round(
                  new NewNutrientItem(
                    props.mealPlanMeal.getNutrient('dietary_fiber')
                  ).amount
                )}{' '}
                {
                  new NewNutrientItem(
                    props.mealPlanMeal.getNutrient('dietary_fiber')
                  ).unit
                }
              </Typography>
            </Grid>
          </Grid>
          <RowBorder height={'1px'}></RowBorder>
          <Grid container item xs={12} justifyContent={'space-between'}>
            <Grid item>
              <Typography
                color={'black'}
                fontSize={'.85rem'}
                fontWeight={'bold'}
              >
                Protein{' '}
                {Math.round(
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('protein'))
                    .amount
                )}{' '}
                {
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('protein'))
                    .unit
                }
              </Typography>
            </Grid>

            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                {Math.round(
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('protein'))
                    .dailyValue * 100
                )}
                %
              </Typography>
            </Grid>
          </Grid>
          {/* vitamins */}
          <RowBorder height={'10px'}></RowBorder>
          <Grid container item xs={12} justifyContent={'space-between'}>
            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                Vitamin D{' '}
                {Math.round(
                  new NewNutrientItem(
                    props.mealPlanMeal.getNutrient('vitamin_d')
                  ).amount
                )}{' '}
                {
                  new NewNutrientItem(
                    props.mealPlanMeal.getNutrient('vitamin_d')
                  ).unit
                }
              </Typography>
            </Grid>

            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                {Math.round(
                  new NewNutrientItem(
                    props.mealPlanMeal.getNutrient('vitamin_d')
                  ).dailyValue * 100
                )}
                %
              </Typography>
            </Grid>
          </Grid>
          <RowBorder height={'1px'}></RowBorder>
          <Grid container item xs={12} justifyContent={'space-between'}>
            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                Calcium{' '}
                {Math.round(
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('calcium'))
                    .amount
                )}{' '}
                {
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('calcium'))
                    .unit
                }
              </Typography>
            </Grid>

            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                {Math.round(
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('calcium'))
                    .dailyValue * 100
                )}
                %
              </Typography>
            </Grid>
          </Grid>
          <RowBorder height={'1px'}></RowBorder>
          <Grid container item xs={12} justifyContent={'space-between'}>
            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                Iron{' '}
                {Math.round(
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('iron'))
                    .amount
                )}{' '}
                {
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('iron'))
                    .unit
                }
              </Typography>
            </Grid>

            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                {Math.round(
                  new NewNutrientItem(props.mealPlanMeal.getNutrient('iron'))
                    .dailyValue * 100
                )}
                %
              </Typography>
            </Grid>
          </Grid>
          <RowBorder height={'1px'}></RowBorder>
          <Grid container item xs={12} justifyContent={'space-between'}>
            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                Potassium{' '}
                {Math.round(
                  new NewNutrientItem(
                    props.mealPlanMeal.getNutrient('potassium')
                  ).amount
                )}{' '}
                {
                  new NewNutrientItem(
                    new NewNutrientItem(
                      props.mealPlanMeal.getNutrient('potassium')
                    )
                  ).unit
                }
              </Typography>
            </Grid>

            <Grid item>
              <Typography color={'black'} fontSize={'.85rem'}>
                {Math.round(
                  new NewNutrientItem(
                    props.mealPlanMeal.getNutrient('potassium')
                  ).dailyValue * 100
                )}
                %
              </Typography>
            </Grid>
          </Grid>
          <RowBorder height={'5px'}></RowBorder>
        </Grid>
      </Grid>
    </Grid>

    {/* <Typography color={'black'} fontSize={'.7rem'}>
      * Percent Daily Values are based on Meal Plan{' '}
      {props.mealPlanMeal.associatedMealPlan.number} <br /> (currently selected)
      which is a {props.mealPlanMeal.associatedMealPlan.statedCaloricLowerBound}{' '}
      – {props.mealPlanMeal.associatedMealPlan.statedCaloricUpperBound} calorie
      diet.
    </Typography> */}
  </section>
);
export default NutritionLabel;
