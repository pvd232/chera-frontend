import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import capitalize from '../../../helpers/capitalize';
import BlackButton from '../../../reusable_ui_components/BlackButton';
import BlueCircularProgress from '../../../reusable_ui_components/BlueCircularProgress';

const ModalBody = (props) => (
  <DialogContent sx={{ marginBottom: '8vh' }}>
    <Stack spacing={2} paddingBottom={'3vh'}>
      <Typography fontSize={'2rem'} textAlign={'center'} margin={'0 auto'}>
        Add a New Client
      </Typography>
      <Typography
        fontFamily={'Inter'}
        fontSize={props.customTheme.fontEqualizer(16)}
        textAlign={'center'}
      >
        Your client will receive an email with a link to sign up
      </Typography>
    </Stack>
    <form onSubmit={props.handleSubmit} autoComplete="new-password">
      <fieldset
        style={{
          boxShadow: props.customTheme.border.boxShadow.medium,
          padding: '4vh 5vw',
          boxSizing: 'border-box',
          margin: '0 10%',
          height: 'fit-content',
          border: 'none',
          borderRadius: props.customTheme.border.radius.medium,
        }}
      >
        <FormGroup>
          <Grid container>
            <Grid item xs={12} sx={{ marginTop: '2vh' }}>
              <Stack direction={'column'} rowGap={3}>
                <InputLabel
                  sx={{ color: props.customTheme.palette.black.main }}
                >
                  Client Email
                </InputLabel>

                <TextField
                  required
                  fullWidth
                  label={'Email'}
                  id="id"
                  type="email"
                  value={props.formValue.id}
                  onChange={props.handleInput}
                  error={props.error}
                  helperText={props.error ? 'This email is already taken' : ''}
                />
                <InputLabel
                  sx={{ color: props.customTheme.palette.black.main }}
                >
                  Client First Name
                </InputLabel>

                <TextField
                  required
                  fullWidth
                  label={'First Name'}
                  id="firstName"
                  value={props.formValue.firstName}
                  onChange={props.handleInput}
                />
                <InputLabel
                  sx={{ color: props.customTheme.palette.black.main }}
                >
                  Client Notes
                </InputLabel>

                <TextField
                  fullWidth
                  label={'Notes'}
                  id="notes"
                  value={props.formValue.notes}
                  onChange={props.handleInput}
                />
                <InputLabel
                  sx={{ color: props.customTheme.palette.black.main }}
                >
                  Client Meal Plan
                </InputLabel>
                <FormControl>
                  <InputLabel
                    sx={{ color: props.customTheme.palette.black.main }}
                  >
                    Meal Plan
                  </InputLabel>
                  <Select
                    label="Meal Plan"
                    required
                    id="mealPlanId"
                    value={props.formValue.mealPlanId}
                    onChange={props.handleInput}
                  >
                    {props.mealPlans.map((mealPlan, i) => (
                      <MenuItem key={`mealPlan-${i}`} value={mealPlan.id}>
                        {`${capitalize(mealPlan.name)}: ${
                          mealPlan.statedCaloricLowerBound
                        }-${mealPlan.statedCaloricUpperBound} calories`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="mealsPreSelected"
                        checked={props.formValue.mealsPreSelected}
                        value={props.formValue.mealsPreSelected}
                        onChange={props.handleInput}
                      />
                    }
                    label="Choose Client Meals"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="mealsPrepaid"
                        checked={props.formValue.mealsPrepaid}
                        value={props.formValue.mealsPrepaid}
                        onChange={props.handleInput}
                      />
                    }
                    label="Pay for First Week Meals"
                  />
                </FormGroup>
                <BlackButton
                  type="submit"
                  variant="contained"
                  disabled={props.loading}
                  sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '100%',
                  }}
                >
                  {props.loading ? (
                    <BlueCircularProgress />
                  ) : props.formValue.mealsPreSelected ? (
                    'Continue to Select Meals'
                  ) : (
                    'Submit'
                  )}
                </BlackButton>
                <Typography
                  fontFamily={'Inter'}
                  fontSize={props.customTheme.fontEqualizer(12)}
                  color={props.customTheme.palette.secondaryText.main}
                >
                  By clicking above, you agree to our{' '}
                  <a href="/">Terms of Use</a> and consent to our{' '}
                  <a href="/">Privacy Policy</a>
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </FormGroup>
      </fieldset>
    </form>
  </DialogContent>
);
export default ModalBody;
