import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getIngredients } from './services/actions';

import { HomePage } from './pages/home/home';
import { NotFoundPage } from './pages/notFound/notFound';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { ForgotPasswordPage } from './pages/forgotPassword/forgotPassword';
import { ResetPasswordPage } from './pages/resetPassword/resetPassword';
import { ProfilePage } from './pages/profile/profile';
import { IngredientPage } from './pages/ingredient/ingredient';
import { ProtectedRouteElement, ProtectedRouteLoginElement, ProtectedRoutePasswordResetElement } from './components/protected-route/protected-route';

const App = () => {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);


  let location = useLocation();
  const state = location?.state?.backgroundLocation;

  if (state) {
    const id = location.pathname.split('/ingredients/').pop();

    return <Routes location={state?.backgroundLocation || location}>
      <Route path='/ingredients/:id' element={<HomePage id={id}/>} />
    </Routes>
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
      <Route path='/profile/*' element={<ProtectedRouteElement element={<div></div>} />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;