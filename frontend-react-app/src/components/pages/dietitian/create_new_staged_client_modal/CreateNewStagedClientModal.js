import Grid from '@mui/material/Grid';
import { useState, useReducer } from 'react';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Dialog from '@mui/material/Dialog';
import APIClient from '../../../../helpers/APIClient';
import Transition from '../../../shared_components/Transition';
import StagedClient from '../../../../data_models/model/StagedClient';
import StagedScheduleMealDTO from '../../../../data_models/dto/StagedScheduleMealDTO';
import StagedScheduleSnackDTO from '../../../../data_models/dto/StagedScheduleSnackDTO';
import StagedClientDTO from '../../../../data_models/dto/StagedClientDTO';
import ClientMenu from '../../client_sign_up/client_menu/ClientMenu';
import SignUpSummary from '../SignUpSummary';
import ModalBody from './ModalBody';
import createNewStagedClientModal from './scss/CreateNewStagedClientModal.module.scss';
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
  const [shippingCost, setShippingCost] = useState(false);
  const [stagedClientId, setStagedClientId] = useState('');
  const [formValue, setFormValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      // if the client secret exists then this page is being rerendered and all of these values have been inputted

      id: '',
      firstName: '',
      mealPlanId: '',
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

    setError(false);
    return form.checkValidity();
  };

  // Input handlers
  const handleButtonClick = async (scheduleMeals, scheduleSnacks) => {
    const newStagedClient = new StagedClient(formValue);
    setStagedClientId(newStagedClient.id);

    // Regular client creation with no meals selected nor paid for
    if (!formValue.mealsPreSelected) {
      setLoading(true);
      const newStagedClientDTO =
        StagedClientDTO.initializeFromStagedClient(newStagedClient);
      await APIClient.createStagedClient(newStagedClientDTO);
      props.handleFinishCreatingStagedClient(newStagedClient);
      resetFormValues();
      setLoading(false);
      setOpen(false);
      // Dietitian is selecting client meals, and has already filled out their info on the form
    } else if (formValue.mealsPreSelected && scheduleMeals) {
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
        setLoading(false);
        setShowMenu(false);
        setPage('SignUp');
      }
    } else {
      // Dietitian is selecting client meals, and has just filled out their info on the form
      setShowMenu(true);
      setPage('DietitianChooseClientMealsMenu');
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    // Check that all required values have been populated before triggering button click
    const validated = await validate(form);
    if (validated) {
      handleButtonClick(false, false);
    } else {
      return false;
    }
  };

  const handleInput = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    if (id === 'confirm-password') {
      setFormValue({ confirmPassword: value });
    } else if (id === undefined) {
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
          APIClient.getShippingCost().then((shippingCost) => {
            setShippingCost(shippingCost);
          });
          return true;
        }
      })();
      setFormValue({ mealsPreSelected: valueToSet });
      setFormValue({ mealsPrepaid: valueToSet });
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
      shippingCost={shippingCost}
    />
  );
  UIContainer['DietitianChooseClientMealsMenu'] = (
    <ClientMenu
      stagedClientId={formValue.id}
      dietitianChoosingClientMeals={true}
      onSubmit={(scheduleMeals, scheduleSnacks) =>
        handleButtonClick(scheduleMeals, scheduleSnacks)
      }
      extendedMeals={props.extendedMeals}
      snacks={props.snacks}
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
    />
  );
  return (
    <div className={createNewStagedClientModal.rootDiv}>
      <Button
        id="add-staged-client-button"
        variant="contained"
        onClick={handleClickOpen}
        className={createNewStagedClientModal.button}
      >
        + Add New Client
      </Button>
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
