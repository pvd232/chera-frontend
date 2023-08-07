import Grid from '@mui/material/Grid';
import { useState, useReducer } from 'react';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import APIClient from '../../../../helpers/APIClient';
import Transition from '../../../shared_components/Transition';
import StagedClient from '../../../../data_models/model/StagedClient';
import StagedScheduleMealDTO from '../../../../data_models/dto/StagedScheduleMealDTO';
import StagedScheduleSnackDTO from '../../../../data_models/dto/StagedScheduleSnackDTO';
import StagedClientDTO from '../../../../data_models/dto/StagedClientDTO';
import COGSDTO from '../../../../data_models/dto/COGSDTO';
import ClientMenu from '../../client_sign_up/client_menu/ClientMenu';
import SignUpSummary from '../SignUpSummary';
import ModalBody from './ModalBody';
import createNewStagedClientModal from './scss/CreateNewStagedClientModal.module.scss';
import { validateZipcode } from '../../client_sign_up/account_registration/helpers/validateZipcode';
const CreateNewStagedClientModal = (props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [numberOfPrePaidMeals, setNumberOfPrePaidMeals] = useState(0);
  const [numberOfPrePaidSnacks, setNumberOfPrePaidSnacks] = useState(0);
  const [prepaidMeals, setPrepaidMeals] = useState([]);
  const [prepaidSnacks, setPrepaidSnacks] = useState([]);
  const [page, setPage] = useState('SignUp');
  const [zipcode, setZipcode] = useState('');
  const [cogs, setCogs] = useState('');
  const [mealPrice, setMealPrice] = useState(false);
  const [shippingRate, setShippingRate] = useState(false);
  const [zipcodeError, setZipcodeError] = useState(false);
  const [stagedClientId, setStagedClientId] = useState('');
  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      // if the client secret exists then this page is being rerendered and all of these values have been inputted

      id: '',
      firstName: '',
      mealPlanId: '',
      eatingDisorderId: '',
      currentWeight: 0,
      targetWeight: 0,
      age: 0,
      gender: '',
      notes: '',
      dietitianId: props.dietitianId,
      active: true,
      accountCreated: false,
      datetime: Date.now(),
      waitlisted: false,
      mealsPreSelected: false,
      mealsPrepaid: false,
    }
  );

  const resetFormValues = () => {
    const resetFormValues = {
      // if the client secret exists then this page is being rerendered and all of these values have been inputted

      id: '',
      firstName: '',
      mealPlanId: '',
      eatingDisorderId: '',
      currentWeight: 0,
      targetWeight: 0,
      age: 0,
      gender: '',
      notes: '',
      dietitianId: props.dietitianId,
      active: true,
      accountCreated: false,
      datetime: Date.now(),
      waitlisted: false,
      mealsPreSelected: false,
      mealsPrepaid: false,
    };
    setFormValue(resetFormValues);
  };

  const validate = async (form) => {
    const stagedClientIdExists = await APIClient.getStagedClient(formValue.id);
    const clientIdExists = await APIClient.getClient(formValue.id);
    const clientIdExistsAsDietitian = await APIClient.getDietitian(
      formValue.id
    );

    if (stagedClientIdExists || clientIdExistsAsDietitian || clientIdExists) {
      setError(true);
      return false;
    }
    const validZipcode = validateZipcode(zipcode);
    if (!validZipcode) {
      setZipcodeError(true);
    }

    setError(false);
    setZipcodeError(false);
    return form.checkValidity();
  };

  // Input handlers
  const handleButtonClick = async (
    scheduleMeals,
    scheduleSnacks,
    mealPrice = false
  ) => {
    // Make sure initializing Staged Client with new property works - shouldnt have to do anything here
    const newStagedClient = new StagedClient(formValue);
    setStagedClientId(newStagedClient.id);

    // Regular client creation with no meals selected nor paid for
    if (!formValue.mealsPreSelected) {
      const newStagedClientDTO =
        StagedClientDTO.initializeFromStagedClient(newStagedClient);
      await APIClient.createStagedClient(newStagedClientDTO);
      props.handleFinishCreatingStagedClient(newStagedClient);
      resetFormValues();
      setLoading(false);
      setOpen(false);
      // Dietitian is selecting client meals, and has already filled out their info on the form and picked their meals
    } else if (formValue.mealsPreSelected && scheduleMeals) {
      // Meal price will be determined dynamically as the meals are being selected
      // Thus set the meal price after the dietitian has selected the meals
      setMealPrice(mealPrice);
      const newStagedClient = new StagedClient(formValue);
      const stagedScheduleMealDTOs = scheduleMeals.map((stagedScheduleMeal) =>
        StagedScheduleMealDTO.initializeFromStagedScheduleMeal(
          stagedScheduleMeal
        )
      );
      const stagedScheduleSnackDTOs = scheduleSnacks.map(
        (stagedScheduleSnack) =>
          StagedScheduleSnackDTO.initializeFromStagedScheduleSnack(
            stagedScheduleSnack
          )
      );
      const newStagedClientDTO =
        StagedClientDTO.initializeFromStagedClient(newStagedClient);
      await APIClient.createStagedClient(newStagedClientDTO);
      await APIClient.createStagedScheduleMeals(stagedScheduleMealDTOs);
      await APIClient.createStagedScheduleSnacks(stagedScheduleSnackDTOs);

      props.handleFinishCreatingStagedClient(newStagedClient);
      setLoading(false);

      if (formValue.mealsPrepaid) {
        // Pass extendedScheduleMeals to DiscountOrderSummary page via props
        setNumberOfPrePaidMeals(scheduleMeals.length);
        setNumberOfPrePaidSnacks(scheduleSnacks.length);
        setPrepaidMeals(scheduleMeals);
        setPrepaidSnacks(scheduleSnacks);
        setShowCheckout(true);
        setPage('SignUpSummary');
      } else {
        setOpen(false);
        resetFormValues();
        setShowMenu(false);
        setPage('SignUp');
      }
    } else {
      // Dietitian is selecting client meals, and has just filled out their info on the form
      const shippingRate = await APIClient.getShippingRate(zipcode);
      const cogsData = await APIClient.getCOGS();
      const cogsDTOs = cogsData.map((cog) => {
        return new COGSDTO(cog);
      });
      setCogs(cogsDTOs);
      setShippingRate(shippingRate);
      setShowMenu(true);
      setPage('DietitianChooseClientMealsMenu');
      setLoading(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;

    // Check that all required values have been populated before triggering button click
    const validated = await validate(form);
    if (validated) {
      handleButtonClick(false, false);
    } else {
      return false;
    }
  };

  const handleEatingDisorderInput = (event) => {
    const value = event.target.value;
    setFormValue({ eatingDisorderId: value });
  };

  const handleGenderInput = (event) => {
    const value = event.target.value;
    setFormValue({ gender: value });
  };

  const handleInput = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    if (id === undefined) {
      setFormValue({ mealPlanId: value });
    } else if (id === 'mealsPreSelected') {
      const valueToSet = (() => {
        // Performing this operation: setState(!booleanValue)
        if (value === 'true') {
          return false;
        } else if (value === 'false') {
          return true;
        }
      })();
      setFormValue({ mealsPreSelected: valueToSet });
    } else if (id === 'mealsPrepaid') {
      const valueToSet = (() => {
        // Performing this operation: setState(!booleanValue)
        if (value === 'true') {
          return false;
        } else if (value === 'false') {
          return true;
        }
      })();
      setFormValue({ mealsPreSelected: valueToSet });
      setFormValue({ mealsPrepaid: valueToSet });
    } else if (id === 'zipcode') {
      setZipcode(value);
    } else {
      setFormValue({ [id]: value });
    }
  };
  const handleClickOpen = () => {
    setPage('SignUp');
    setError(false);
    setShowMenu(false);
    setShowCheckout(false);
    resetFormValues();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const isAdmin = () => {
    if (
      props.dietitianId === 'daniel.fleury02@gmail.com' ||
      props.dietitianId === 'azeng8232@gmail.com' ||
      props.dietitianId === 'peterdriscoll@cherahealth.com'
    ) {
      return true;
    } else {
      return false;
    }
  };
  const UIContainer = {};
  UIContainer['SignUpSummary'] = (
    <SignUpSummary
      stripePromise={props.stripePromise}
      numMeals={numberOfPrePaidMeals}
      numSnacks={numberOfPrePaidSnacks}
      stagedClientId={stagedClientId}
      dietitianId={props.dietitianId}
      prepaidMeals={prepaidMeals}
      prepaidSnacks={prepaidSnacks}
      mealPrice={mealPrice}
    />
  );
  UIContainer['DietitianChooseClientMealsMenu'] = (
    <ClientMenu
      stagedClientId={formValue.id}
      dietitianChoosingClientMeals={true}
      onSubmit={(scheduleMeals, scheduleSnacks, mealPrice) =>
        handleButtonClick(scheduleMeals, scheduleSnacks, mealPrice)
      }
      extendedMeals={props.extendedMeals}
      snacks={props.snacks}
      // Passed in to determine meal price
      shippingRate={shippingRate}
      cogs={cogs}
    />
  );
  UIContainer['SignUp'] = (
    <ModalBody
      formValue={formValue}
      handleInput={handleInput}
      error={error}
      loading={loading}
      handleSubmit={handleSubmit}
      mealPlans={props.mealPlans}
      eatingDisorders={props.eatingDisorders}
      handleEatingDisorderInput={handleEatingDisorderInput}
      handleGenderInput={handleGenderInput}
      zipcode={zipcode}
      zipcodeError={zipcodeError}
    />
  );
  return (
    <div className={createNewStagedClientModal.rootDiv}>
      {props.isSampleTrialPeriod && !isAdmin() ? (
        <Grid container>
          <Grid
            item
            container
            justifyContent={'flex-end'}
            alignItems={'flex-end'}
          >
            <Grid item>
              <Tooltip
                title={
                  'The platform will be fully functional by EOD today (August 7th)! We will be sending you an email with more details.'
                }
              >
                <IconButton>
                  <InfoIcon className={createNewStagedClientModal.toolTip} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              id="add-staged-client-button"
              variant="contained"
              onClick={handleClickOpen}
              className={createNewStagedClientModal.buttonDisabled}
              disabled={true}
            >
              + Add New Client
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Button
          id="add-staged-client-button"
          variant="contained"
          onClick={handleClickOpen}
          className={createNewStagedClientModal.button}
        >
          + Add New Client
        </Button>
      )}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth={page === 'SignUp' ? 'md' : 'xl'}
        fullWidth={true}
      >
        <Grid
          container
          className={
            showMenu && !showCheckout
              ? createNewStagedClientModal.themeColoredContainer
              : createNewStagedClientModal.regularContainer
          }
        >
          <Grid item>
            <Icon
              onClick={handleClose}
              className={createNewStagedClientModal.closeIcon}
            >
              close
            </Icon>
          </Grid>
        </Grid>
        {UIContainer[page]}
      </Dialog>
    </div>
  );
};
export default CreateNewStagedClientModal;
