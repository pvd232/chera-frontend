import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Splash from './pages/splash/Splash';
import SplashMenu from './pages/splash/SplashMenu';
import MealPlans from './pages/dietitian/meal_plans/MealPlans';
import TaskBar from './pages/sign_up/task_bar/TaskBar';
import MealBuilder from './pages/admin/meal_builder/MealBuilder';
import MealPlanMealBuilder from './pages/admin/meal_plan_meal_builder/MealPlanMealBuilder';
import MealPlanMealBuilderContainer from './pages/admin/meal_plan_meal_builder/MealPlanMealBuilderContainer';
import PreviousDeliveries from './pages/client/PreviousDeliveries';
import Login from './pages/splash/login/Login';
import LoginSignUpChoice from './pages/splash/login/LoginSignUpChoice';
import ClientMeals from './pages/dietitian/client_meals/ClientMeals';
import ClientHomeContainer from './pages/client/ClientHomeContainer';
import DietitianHomeContainer from './pages/dietitian/DietitianHomeContainer';
import DietitianMenuContainer from './pages/dietitian/dietitian_menu/DietitianMenuContainer';
import DietititanHome from './pages/dietitian/DietitianHome';
import RequestResetPassword from './pages/splash/RequestResetPassword';
import ResetPassword from './pages/splash/ResetPassword';
import ReactGA from 'react-ga';
import ContactUs from './pages/splash/ContactUs';
import Navbar from './reusable_ui_components/navbar/Navbar';
import DietitianMenu from './pages/dietitian/dietitian_menu/DietitianMenu';
import Resources from './pages/splash/resources/Resources';
import SignUpPage from './pages/sign_up/ClientSignUp';
import SnackBuilder from './pages/admin/snack_builder/SnackBuilder';
import FAQs from './pages/splash/faqs/FAQs';
import DietitianSignUp from './pages/splash/dietitian_sign_up/DietitianSignUp';
const TRACKING_ID = 'UA-238874096-1'; // OUR_TRACKING_ID

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize(TRACKING_ID);
}

const Main = (props) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);
  return (
    // The Routes decides which element to show based on the current URL
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navbar
              childComponent={<Splash></Splash>}
              domain={'splash'}
            ></Navbar>
          }
        />

        <Route
          path="/splash-menu"
          element={
            <Navbar
              childComponent={<SplashMenu></SplashMenu>}
              domain={'splash'}
            ></Navbar>
          }
        />
        <Route
          path="/contact"
          element={
            <Navbar childComponent={<ContactUs />} domain={'splash'}></Navbar>
          }
        />

        <Route
          path="/splash-meal-plans"
          element={
            <Navbar childComponent={<MealPlans />} domain={'splash'}></Navbar>
          }
        />
        <Route
          path="/meal-plans"
          element={
            <Navbar
              childComponent={
                <DietitianHomeContainer
                  stripePromise={props.stripePromise}
                  childComponent={<MealPlans />}
                />
              }
              domain={'dietitian'}
            />
          }
        />
        <Route
          path="/dietitian-sign-up"
          element={
            <Navbar childComponent={<DietitianSignUp />} domain={'splash'} />
          }
        />
        <Route
          path="/faqs"
          element={
            <Navbar childComponent={<FAQs />} domain={'splash'} />
          }
        />    
        <Route
          path="/client-sign-up"
          element={
            <TaskBar
              stripePromise={props.stripePromise}
              childComponent={<SignUpPage />}
            />
          }
        />
        <Route path="/meal-builder" element={<MealBuilder />} />
        <Route path="/snack-builder" element={<SnackBuilder />} />
        <Route
          path="/meal-plan-meal-builder"
          element={
            <MealPlanMealBuilderContainer
              childComponent={<MealPlanMealBuilder />}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Navbar
              childComponent={<ClientHomeContainer />}
              domain={'client'}
            ></Navbar>
          }
        />
        <Route
          path="/d-home"
          element={
            <Navbar
              childComponent={
                <DietitianHomeContainer
                  stripePromise={props.stripePromise}
                  childComponent={<DietititanHome />}
                />
              }
              domain={'dietitian'}
            ></Navbar>
          }
        />
        <Route
          path="/d-home-payment-confirmed"
          element={
            <Navbar
              childComponent={
                <DietitianHomeContainer
                  stripePromise={props.stripePromise}
                  paymentConfirmed={true}
                  childComponent={<DietititanHome />}
                />
              }
              domain={'dietitian'}
            ></Navbar>
          }
        />
        <Route
          path="/client-meals"
          element={
            <Navbar
              childComponent={
                <DietitianHomeContainer
                  stripePromise={props.stripePromise}
                  childComponent={<ClientMeals />}
                />
              }
              domain={'dietitian'}
            ></Navbar>
          }
        />
        <Route
          path="/previous-deliveries"
          element={
            <Navbar
              childComponent={<PreviousDeliveries />}
              domain={'client'}
            ></Navbar>
          }
        />
        <Route
          path="/login-sign-up-choice"
          element={
            <Navbar
              childComponent={<LoginSignUpChoice />}
              domain={'splash'}
            ></Navbar>
          }
        />

        <Route
          path="/dietitian-login"
          element={
            <Navbar
              childComponent={<Login domain={'dietitian'} />}
              domain={'splash'}
            ></Navbar>
          }
        />
        <Route
          path="/client-login"
          element={
            <Navbar
              childComponent={<Login domain={'client'} />}
              domain={'splash'}
            ></Navbar>
          }
        />
        <Route
          exact
          path="/request-reset-client-password"
          element={
            <Navbar
              childComponent={
                <RequestResetPassword domain={'client'}></RequestResetPassword>
              }
              domain={'splash'}
            ></Navbar>
          }
        />
        <Route
          path="/request-reset-dietitian-password"
          element={
            <Navbar
              childComponent={
                <RequestResetPassword
                  domain={'dietitian'}
                ></RequestResetPassword>
              }
              domain={'splash'}
            ></Navbar>
          }
        />
        <Route
          exact
          path="/reset-client-password"
          element={
            <Navbar
              childComponent={<ResetPassword domain={'client'} />}
              domain={'splash'}
            ></Navbar>
          }
        />
        <Route
          path="/reset-dietitian-password"
          element={
            <Navbar
              childComponent={<ResetPassword domain={'dietitian'} />}
              domain={'splash'}
            ></Navbar>
          }
        />
        <Route
          path="/dietitian-menu"
          element={
            <Navbar
              childComponent={
                <DietitianMenuContainer
                  stripePromise={props.stripePromise}
                  childComponent={<DietitianMenu />}
                />
              }
              domain={'dietitian'}
            ></Navbar>
          }
        />
        <Route
          path="/resources"
          element={
            <Navbar childComponent={<Resources />} domain={'splash'}></Navbar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Main;
