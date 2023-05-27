import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../services/actions';
import PropTypes from 'prop-types';


export const ProtectedRoutePasswordResetElement = ({element}) => {
  const forgot = useSelector(store => store.forgot.state);

  if (forgot !== 'success') {
    return <Navigate to='/forgot-password' />;
  }

  return element;
}

ProtectedRoutePasswordResetElement.propTypes = { 
  element: PropTypes.object.isRequired
};

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

ProtectedRouteLoginElement.propTypes = { 
  element: PropTypes.object.isRequired
};

export const ProtectedRouteElement = ({ element }) => {
  const dispatch = useDispatch(); 
  let location = useLocation();

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

ProtectedRouteElement.propTypes = { 
  element: PropTypes.object.isRequired
};