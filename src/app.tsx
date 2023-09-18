import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from './index';

import { getIngredients } from './services/actions';

import { HomePage } from './pages/home/home';
import { NotFoundPage } from './pages/notFound/notFound';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { ForgotPasswordPage } from './pages/forgotPassword/forgotPassword';
import { ResetPasswordPage } from './pages/resetPassword/resetPassword';
import { ProfilePage } from './pages/profile/profile';
import { IngredientPage } from './pages/ingredient/ingredient';
import { FeedsPage } from './pages/feeds/feeds';
import { FeedPage } from './pages/feed/feed';
import { PersonalFeedPage } from './pages/personalFeed/personalFeed';
import { OrdersPage } from './pages/orders/orders';
import { ProtectedRouteElement, ProtectedRouteLoginElement, ProtectedRoutePasswordResetElement } from './components/protected-route/protected-route';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const location = useLocation();
  const state = location?.state?.backgroundLocation;

  if (state) {
    if (location.pathname.includes('feed')) {
      const id = location.pathname.split('/feed/').pop();

      return <Routes location={state?.backgroundLocation || location}>
        <Route path='/feed/:id' element={<FeedsPage id={id}/>} />
      </Routes>
    }

    if (location.pathname.includes('profile/orders')) {
      const id = location.pathname.split('/profile/orders/').pop();

      return <Routes location={state?.backgroundLocation || location}>
        <Route path='/profile/orders/:id' element={<OrdersPage id={id}/>} />
      </Routes>
    }

    if (location.pathname.includes('ingredients')) {
      
      const id = location.pathname.split('/ingredients/').pop();

      return <Routes location={state?.backgroundLocation || location}>
        <Route path='/ingredients/:id' element={<HomePage id={id}/>} />
      </Routes>
    }
  }

  return (
    <Routes location={state?.backgroundLocation || location}>
      <Route path='/' element={<HomePage />} />
      <Route path='/ingredients/:id' element={<IngredientPage />} />
      <Route path='/login' element={<ProtectedRouteLoginElement element={<LoginPage />} />} />
      <Route path='/register' element={<ProtectedRouteLoginElement element={<RegisterPage />} />} />
      <Route path='/forgot-password' element={<ProtectedRouteLoginElement element={<ForgotPasswordPage />} />} />
      <Route path='/reset-password' element={<ProtectedRouteLoginElement element={<ProtectedRoutePasswordResetElement element={<ResetPasswordPage />} />} />} />
      <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />} />} />
      <Route path='/profile/orders' element={<ProtectedRouteElement element={<OrdersPage />} />} />
      <Route path='/profile/orders/:id' element={<ProtectedRouteElement element={<PersonalFeedPage />} />} />
      <Route path='/feed' element={<FeedsPage />} />
      <Route path='/feed/:id' element={<FeedPage />}/>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;