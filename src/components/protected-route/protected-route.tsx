import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useEffect, ReactElement } from 'react';
import { useSelector, useDispatch } from '../../index';
import { getUser } from '../../services/actions';

type TElement = {
  element: ReactElement
}

export const ProtectedRoutePasswordResetElement = ({element}: TElement) => {
  const forgot = useSelector(store => store.forgot.state);

  if (forgot !== 'success') {
    return <Navigate to='/forgot-password' />;
  }

  return element;
}

export const ProtectedRouteLoginElement = ({element}: TElement) => {
  const dispatch = useDispatch();
  let user = useSelector(store => store.user);
  const isToken = getCookie('token');
  const succes = user.loadState === 'succes';

  useEffect(() => {
    if (isToken) {
      dispatch(getUser());
    } 
  }, [dispatch, isToken]);

  if (isToken && succes) {
    return <Navigate to='/' />;
  }

  return element;
}

export const ProtectedRouteElement = ({ element }: TElement) => {
  const dispatch = useDispatch();
  const location = useLocation();

  let user = useSelector(store => store.user);
  const isToken = getCookie('token');
  const failed = user.loadState === 'failed';
  const loading = user.loadState === 'loading';
  const noUser = user.loadState === '';

  useEffect(() => {
    if (isToken) {
      dispatch(getUser());
    } 
  }, [dispatch, isToken]);

  if (!isToken || failed) {
    return <Navigate to='/login' state={{from: location}} replace/>;
  }

  if (loading || noUser) {
    return null;
  }

  return element;
}