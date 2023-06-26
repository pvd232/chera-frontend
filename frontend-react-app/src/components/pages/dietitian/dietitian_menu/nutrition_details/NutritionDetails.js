import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import '../../../../../static/scss/NutritionLabel.scss';
import OrangeButton from '../../../../shared_components/OrangeButton';
import Transition from '../../../../shared_components/Transition';
import NutritionLabel from './NutritionLabel';
import DailyNutrientChart from './DailyNutrientChart';
import MacrosPieChart from './MacrosPieChart';
import MacrosLegend from './MacrosLegend';
import { getNutrientsDataSource } from './helpers/getNutrientsDataSource';
const NutritionDetails = (props) => {
  const customTheme = useTheme();

  const [open, setOpen] = useState(false);
  const [fatColor, setFatColor] = useState('');
  const [carbColor, setCarbColor] = useState('');
  const [proteinColor, setProteinColor] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const nutrientDataSource = getNutrientsDataSource(
    props.mealPlanMeal.nutrients
  );

  return (
    <>
      <OrangeButton
        variant="outlined"
        sx={{
          position: 'absolute',
          // Max distance, Ideal distance, Required distance
          bottom: 'clamp(2vh, 2vh, 10px)',
        }}
        onClick={handleClickOpen}
      >
        Nutrition Details
      </OrangeButton>
      {open ? (
        <Dialog
          open={open}
          keepMounted
          TransitionComponent={Transition}
          onClose={handleClose}
          fullWidth={true}
          maxWidth={'xl'}
        >
          <Grid
            container
            justifyContent={'flex-end'}
            alignItems={'flex-end'}
            sx={{ position: 'absolute', right: 20 }}
          >
            <Grid item sx={{ marginTop: '1vh' }}>
              <Icon onClick={handleClose} sx={{ cursor: 'pointer' }}>
                close
              </Icon>
            </Grid>
          </Grid>
          <DialogContent
            sx={{
              paddingTop: '0',
              paddingBottom: '0',
              margin: '20px 10px 20px 10px',
            }}
          >
            <Grid container justifyContent={'space-evenly'}>
              {/* Left side bar */}

              <Grid
                container
                item
                lg={3.5}
                md={12}
                sx={{
                  borderRight:
                    customTheme.largeScreen() || customTheme.extraLargeScreen()
                      ? `2px solid ${customTheme.palette.lightGrey.main}`
                      : '',
                }}
                justifyContent={'center'}
              >
                <Grid
                  item
                  container
                  spacing={1}
                  paddingTop={'1.5vw'}
                  justifyContent={'center'}
                >
                  <Grid item xs={12}>
                    <Typography
                      fontSize={'1.3rem'}
                      fontWeight={'bold'}
                      paddingBottom={'3vh'}
                    >
                      {props.mealPlanMeal.associatedMeal.name}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      padding: '0 !important',
                    }}
                  >
                    <Typography
                      fontSize={customTheme.fontEqualizer(18)}
                      textAlign={'center'}
                    >
                      Macronutrients
                    </Typography>
                  </Grid>
                  {/* Shifting pie chart to push white space out of view */}

                  <Grid
                    container
                    item
                    sx={{
                      position: 'relative',
                      bottom: 100,
                      left: 0,
                      padding: '0 !important',
                    }}
                  >
                    <Grid container justifyContent={'center'}>
                      <Grid
                        item
                        xl={9}
                        lg={10}
                        md={4}
                        sm={7}
                        xs={11}
                        sx={{
                          position: 'relative',
                          top: customTheme.smallerScreen() ? 40 : 50,
                          marginRight: 'auto',
                          marginLeft: 'auto',
                        }}
                      >
                        <MacrosPieChart
                          mealPlanMeal={props.mealPlanMeal}
                          setProteinColor={(color) => setProteinColor(color)}
                          setCarbColor={(color) => setCarbColor(color)}
                          setFatColor={(color) => setFatColor(color)}
                        ></MacrosPieChart>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      lg={10}
                      md={5}
                      sm={7}
                      xs={11}
                      sx={{
                        marginRight: 'auto',
                        marginLeft: 'auto',
                      }}
                    >
                      <MacrosLegend
                        customTheme={customTheme}
                        proteinColor={proteinColor}
                        carbColor={carbColor}
                        fatColor={fatColor}
                      ></MacrosLegend>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    item
                    sx={{
                      position: 'relative',
                      bottom: customTheme.largerScreen() ? 80 : 60,
                      height: customTheme.largerScreen() ? '50%' : '100%',
                    }}
                    justifyContent={'center'}
                  >
                    <Grid item>
                      <NutritionLabel
                        customTheme={customTheme}
                        mealPlanMeal={props.mealPlanMeal}
                        nutrients={nutrientDataSource}
                      ></NutritionLabel>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* Daily nutrition bar charts */}

              <Grid
                container
                item
                lg={8.5}
                md={12}
                justifyContent={'center'}
                marginBottom={customTheme.smallerScreen() ? '5vh' : ''}
              >
                <Grid
                  container
                  item
                  alignItems={'flex-end'}
                  justifyContent={'center'}
                >
                  <Typography
                    fontSize={customTheme.fontEqualizer(18)}
                    paddingBottom={'2vh'}
                  >
                    Vitamins and Nutrients (% Daily Values)
                  </Typography>
                </Grid>
                {/* Spacer */}
                <DailyNutrientChart
                  customTheme={customTheme}
                  dataSource={nutrientDataSource}
                ></DailyNutrientChart>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};
export default NutritionDetails;
