import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useState, useReducer } from 'react';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import Transition from '../../../reusable_ui_components/Transition';
import APIClient from '../../../helpers/APIClient';
import StagedClient from '../../../data_models/model/StagedClient';
import SignUpSummary from '../SignUpSummary';
import ModalBody from './ModalBody';
import ClientMenu from '../../sign_up/client_menu/ClientMenu';
import StagedScheduleMeal from '../../../data_models/model/StagedScheduleMeal';
import StagedScheduleMealDTO from '../../../data_models/dto/StagedScheduleMealDTO';
import StagedClientDTO from '../../../data_models/dto/StagedClientDTO';
const OrangeSolidButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.olive.main,
  color: theme.palette.white1.main,
  backgroundColor: theme.palette.olive.main,
  fontWeight: 'bold',
  fontSize: theme.fontEqualizer(14),
  '&:hover': {
    borderColor: theme.palette.olive.main,
  },
}));
const CreateNewStagedClientModal = (props) => {
  const customTheme = useTheme();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [numberOfPrePaidMeals, setNumberOfPrePaidMeals] = useState(0);
  const [prepaidMeals, setPrepaidMeals] = useState([]);
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
    const clientIdExists = await APIClient.getStagedClient(formValue.id);
    if (clientIdExists) {
      setError(true);
      return false;
    }

    setError(false);
    return form.checkValidity();
  };

  // Input handlers
  const handleButtonClick = async (scheduleMeals) => {
    const newStagedClient = new StagedClient(formValue);
    setStagedClientId(newStagedClient.id);

    // Regular client creation with no meals selected nor paid for
    if (!formValue.mealsPreSelected) {
      setLoading(true);
      await APIClient.createStagedClient(newStagedClient);
      props.handleFinishEditing(newStagedClient);
      resetFormValues();
      setLoading(false);
      setOpen(false);
      // Dietitian is selecting client meals, and has already filled out their info on the form
    } else if (formValue.mealsPreSelected && scheduleMeals) {
      const newStagedClient = new StagedClient(formValue);
      // Schedule Meals are created in Menu Page, must map them to StagedScheduleMeals
      const stagedScheduleMeals = scheduleMeals.map((scheduleMeal) =>
        StagedScheduleMeal.initializeFromScheduleMeal(
          scheduleMeal,
          newStagedClient.id
        )
      );
      const stagedScheduleMealDTOs = stagedScheduleMeals.map(
        (stagedScheduleMeal) =>
          StagedScheduleMealDTO.initializeFromStagedScheduleMeal(
            stagedScheduleMeal
          )
      );
      const newStagedClientDTO =
        StagedClientDTO.initializeFromStagedClient(newStagedClient);
      await APIClient.createStagedClient(newStagedClientDTO);
      await APIClient.createStagedScheduleMeals(stagedScheduleMealDTOs);

      props.handleFinishEditing(newStagedClient);

      if (formValue.mealsPrepaid) {
        // Pass extendedScheduleMeals to DiscountOrderSummary page via props
        setNumberOfPrePaidMeals(scheduleMeals.length);
        setPrepaidMeals(scheduleMeals);
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
      // dietitian is selecting client meals, and has just filled out their info on the form
      setShowMenu(true);
      setPage('DietitianChooseClientMealsMenu');
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    // check that all required values have been populated before triggering button click
    const validated = await validate(form);
    if (validated) {
      handleButtonClick(false);
    } else {
      return false;
    }
  };

  const handleInput = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    // state value
    if (id === 'confirm-password') {
      setFormValue({ confirmPassword: value });
    } else if (id === undefined) {
      setFormValue({ mealPlanId: value });
    } else if (id === 'mealsPreSelected') {
      const valueToSet = (() => {
        // performing this operation: setState(!booleanValue)
        if (value === 'true') {
          return false;
        } else if (value === 'false') {
          return true;
        }
      })();
      setFormValue({ mealsPreSelected: valueToSet });
    } else if (id === 'mealsPrepaid') {
      const valueToSet = (() => {
        // performing this operation: setState(!booleanValue)
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
    // setting the state unfocuses the user cursor in the form, and setting auto-focus to true fixes it, but autofocus can only be true for the input that is currently being typed in
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
      stagedClientId={stagedClientId}
      dietitianId={props.dietitianId}
      prepaidMeals={prepaidMeals}
      shippingCost={shippingCost}
    />
  );
  UIContainer['DietitianChooseClientMealsMenu'] = (
    <ClientMenu
      stagedClientId={formValue.id}
      dietitianChoosingClientMeals={true}
      onSubmit={(param) => handleButtonClick(param)}
      extendedMeals={props.extendedMeals}
    />
  );
  UIContainer['SignUp'] = (
    <ModalBody
      customTheme={customTheme}
      formValue={formValue}
      handleInput={handleInput}
      error={error}
      loading={loading}
      handleSubmit={handleSubmit}
      mealPlans={props.mealPlans}
    />
  );
  return (
    <>
      <div
        style={{
          paddingLeft: '2vw',
          paddingBottom: '4vh',
        }}
      >
        <OrangeSolidButton
          variant="contained"
          onClick={handleClickOpen}
          fontSize={customTheme.fontEqualizer(14)}
          sx={{
            cursor: 'pointer',
          }}
        >
          + Add New Client
        </OrangeSolidButton>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => handleClose()}
          aria-describedby="alert-dialog-slide-description"
          maxWidth={page === 'SignUp' ? 'md' : 'xl'}
          fullWidth={true}
        >
          <Grid
            container
            justifyContent={'flex-end'}
            paddingRight={'1vw'}
            paddingTop={'1vw'}
            sx={{
              backgroundColor:
                showMenu && !showCheckout
                  ? customTheme.palette.olive.quaternary
                  : customTheme.palette.white1.main,
            }}
          >
            <Grid item>
              <Icon
                onClick={() => handleClose()}
                sx={{ cursor: 'pointer', marginLeft: 'auto' }}
              >
                close
              </Icon>
            </Grid>
          </Grid>
          {UIContainer[page]}
        </Dialog>
      </div>
    </>
  );
};
export default CreateNewStagedClientModal;
