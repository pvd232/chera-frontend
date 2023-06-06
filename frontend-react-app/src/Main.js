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
import NewNavbar from './reusable_ui_components/navbar/NewNavbar';
import NewSplashLinks from './reusable_ui_components/navbar/links/NewSplashLinks';
import NewClientLinks from './reusable_ui_components/navbar/links/NewClientLinks';
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
            <NewNavbar
              childComponent={<Splash></Splash>}
              links={<NewSplashLinks />}
              homeUrl={'/'}
            ></NewNavbar>
          }
        />

        <Route
          path="/splash-menu"
          element={
            <NewNavbar
              childComponent={<SplashMenu></SplashMenu>}
              links={<NewSplashLinks />}
              homeUrl="/"
            />
          }
        />
        <Route
          path="/contact"
          element={
            <NewNavbar
              childComponent={<ContactUs />}
              links={<NewSplashLinks />}
              homeUrl="/"
            />
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
            <NewNavbar
              childComponent={<DietitianSignUp />}
              links={<NewSplashLinks />}
              homeUrl="/"
            />
          }
        />
        <Route
          path="/faqs"
          element={
            <NewNavbar
              childComponent={<FAQs />}
              links={<NewSplashLinks />}
              homeUrl="/"
            />
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
            <NewNavbar
              childComponent={<ClientHomeContainer />}
              links={<NewClientLinks />}
              homeUrl="/home"
            />
            // <Navbar domain={'client'}></Navbar>
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
          path="/login"
          element={
            <NewNavbar
              childComponent={<LoginSignUpChoice />}
              links={<NewSplashLinks />}
              homeUrl="/"
            />
          }
        />

        <Route
          path="/dietitian-login"
          element={
            <NewNavbar
              childComponent={<Login domain={'dietitian'} />}
              links={<NewSplashLinks />}
              homeUrl="/"
            />
          }
        />
        <Route
          path="/client-login"
          element={
            <NewNavbar
              childComponent={<Login domain={'client'} />}
              links={<NewSplashLinks />}
              homeUrl="/"
            />
          }
        />
        <Route
          exact
          path="/request-reset-client-password"
          element={
            <NewNavbar
              childComponent={<RequestResetPassword domain={'client'} />}
              links={<NewSplashLinks />}
              homeUrl="/"
            />
          }
        />
        <Route
          path="/request-reset-dietitian-password"
          element={
            <NewNavbar
              childComponent={
                <RequestResetPassword
                  domain={'dietitian'}
                ></RequestResetPassword>
              }
              links={<NewSplashLinks />}
              homeUrl="/"
            />
          }
        />
        <Route
          exact
          path="/reset-client-password"
          element={
            <NewNavbar
              childComponent={<ResetPassword domain={'client'} />}
              links={<NewSplashLinks />}
              homeUrl="/"
            />
          }
        />
        <Route
          path="/reset-dietitian-password"
          element={
            <NewNavbar
              childComponent={<ResetPassword domain={'dietitian'} />}
              links={<NewSplashLinks />}
              homeUrl="/"
            />
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
            <NewNavbar
              childComponent={<Resources />}
              links={<NewSplashLinks />}
              homeUrl="/"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Main;
