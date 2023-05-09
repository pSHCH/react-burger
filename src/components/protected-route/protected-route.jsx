import { Navigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../services/actions';

export const ProtectedRoutePasswordResetElement = ({element}) => {
  let forgot = getCookie('forgot');

  if (!forgot) {
    return <Navigate to='/forgot-password' />;
  }

  return element;
}

export const ProtectedRouteLoginElement = ({element}) => {
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

export const ProtectedRouteElement = ({ element }) => {
  const dispatch = useDispatch(); 

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
    return <Navigate to='/login' />;
  }

  if (loading || noUser) {
    return null;
  }

  return element;
}