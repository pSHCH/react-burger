import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useEffect, ReactElement } from 'react';
import type { ReduxState } from '../../utils/ReduxState';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../services/actions';
import PropTypes from 'prop-types';

type TElement = {
  element: ReactElement
}

export const ProtectedRoutePasswordResetElement = ({element}: TElement) => {
  const forgot = useSelector((store: ReduxState) => store.forgot.state);

  if (forgot !== 'success') {
    return <Navigate to='/forgot-password' />;
  }

  return element;
}

ProtectedRoutePasswordResetElement.propTypes = { 
  element: PropTypes.object.isRequired
};

export const ProtectedRouteLoginElement = ({element}: TElement) => {
  const dispatch: any = useDispatch();
  let user = useSelector((store: ReduxState) => store.user);
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

export const ProtectedRouteElement = ({ element }: TElement) => {
  const dispatch: any = useDispatch();
  let location = useLocation();

  let user = useSelector((store: ReduxState) => store.user);
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