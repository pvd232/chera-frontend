import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import Splash from './components/pages/splash/Splash';
import MealPlans from './components/pages/dietitian/meal_plans/MealPlans';
import TaskBar from './components/pages/client_sign_up/task_bar/TaskBar';
import MealBuilder from './components/pages/admin/meal_builder/MealBuilder';
import MealPlanMealBuilder from './components/pages/admin/meal_plan_meal_builder/MealPlanMealBuilder';
import MealPlanMealBuilderContainer from './components/pages/admin/meal_plan_meal_builder/MealPlanMealBuilderContainer';
import MealPlanSnackBuilder from './components/pages/admin/meal_plan_snack_builder/MealPlanSnackBuilder';
import MealPlanSnackBuilderContainer from './components/pages/admin/meal_plan_snack_builder/MealPlanSnackBuilderContainer';
import PreviousDeliveries from './components/pages/client/PreviousDeliveries';
import ClientMeals from './components/pages/dietitian/client_meals/ClientMeals';
import ClientHomeContainer from './components/pages/client/ClientHomeContainer';
import DietitianHomeContainer from './components/pages/dietitian/DietitianHomeContainer';
import LoadingPage from './components/pages/splash/LoadingPage';
import DietitianMenuContainer from './components/pages/dietitian/dietitian_menu/DietitianMenuContainer';
import DietititanHome from './components/pages/dietitian/DietitianHome';
import Navbar from './components/shared_components/navbar/Navbar';
import SplashLinks from './components/shared_components/navbar/links/SplashLinks';
import ClientLinks from './components/shared_components/navbar/links/ClientLinks';
import DietitianMenu from './components/pages/dietitian/dietitian_menu/DietitianMenu';
import Resources from './components/pages/splash/resources/Resources';
import SignUpPage from './components/pages/client_sign_up/ClientSignUp';
import SnackBuilder from './components/pages/admin/snack_builder/SnackBuilder';
import FAQs from './components/pages/splash/faqs/FAQs';
import DietitianSignUp from './components/pages/splash/dietitian_sign_up/DietitianSignUp';
import DietitianLinks from './components/shared_components/navbar/links/DietitianLinks';
import { Auth0Navigator } from './auth0/Auth0Navigator';
import UpdateAddress from './components/pages/client/client_home/UpdateAddress';
import Payment from './components/pages/client/ClientPayment';
import ClientInvoice from './components/pages/client/ClientInvoice';
import PlanDetails from './components/pages/client/PlanDetails';
import Privacy from './components/pages/splash/Privacy';
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
      <Auth0Navigator>
        <Routes>
          <Route
            path="/"
            element={
              <Navbar
                childComponent={<Splash></Splash>}
                links={<SplashLinks />}
                homeUrl={'/'}
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
                links={<DietitianLinks />}
                homeUrl="/d-home"
              />
            }
          />
          <Route
            path="/dietitian-sign-up"
            element={
              <Navbar childComponent={<DietitianSignUp />} homeUrl="/" />
            }
          />
          <Route
            path="/update-address"
            element={<Navbar childComponent={<UpdateAddress />} homeUrl="/" />}
          />
          <Route
            path="/faqs"
            element={
              <Navbar
                childComponent={<FAQs />}
                links={<SplashLinks />}
                homeUrl="/"
              />
            }
          />
          <Route
            path="/sample-menu"
            element={
              <Navbar
                childComponent={
                  <DietitianMenuContainer childComponent={<DietitianMenu />} />
                }
                links={<SplashLinks />}
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
          <Route path="/loading" element={<LoadingPage />} />
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
            path="/meal-plan-snack-builder"
            element={
              <MealPlanSnackBuilderContainer
                childComponent={<MealPlanSnackBuilder />}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Navbar
                childComponent={<ClientHomeContainer />}
                links={<ClientLinks />}
                homeUrl="/home"
              />
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
                links={<DietitianLinks />}
                homeUrl="/d-home"
              />
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
                links={<DietitianLinks />}
                homeUrl={'/d-home'}
              />
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
                links={<DietitianLinks />}
                homeUrl={'/d-home'}
              />
            }
          />
          <Route
            path="/previous-deliveries"
            element={
              <Navbar
                childComponent={<PreviousDeliveries />}
                links={<ClientLinks />}
                homeUrl="/home"
              />
            }
          />

          <Route
            path="/payment"
            element={
              <Navbar
                childComponent={<Payment stripePromise={props.stripePromise} />}
                links={<ClientLinks />}
                homeUrl="/home"
              />
            }
          />

          <Route
            path="/invoices"
            element={
              <Navbar
                childComponent={
                  <ClientInvoice stripePromise={props.stripePromise} />
                }
                links={<ClientLinks />}
                homeUrl="/home"
              />
            }
          />

          <Route
            path="/plan-details"
            element={
              <Navbar
                childComponent={<PlanDetails domain={'client'} />}
                links={<ClientLinks />}
                homeUrl="/home"
              />
            }
          />
          <Route
            path="/menu"
            element={
              <Navbar
                childComponent={
                  <DietitianMenuContainer childComponent={<DietitianMenu />} />
                }
                links={<DietitianLinks />}
                homeUrl="/d-home"
              />
            }
          />
          <Route
            path="/resources"
            element={
              <Navbar
                childComponent={<Resources />}
                links={<SplashLinks />}
                homeUrl="/"
              />
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Navbar
                childComponent={<Privacy />}
                links={<SplashLinks />}
                homeUrl="/"
              />
            }
          />
        </Routes>
      </Auth0Navigator>
    </BrowserRouter>
  );
};
export default Main;
