import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from '../Pages/Login';

export default function ProtectedRouter(props) {
  const { path, component } = props;

  function isAuthenticated() {
    return localStorage.getItem('Authorization')
      && localStorage.getItem('userId');
  }

  if (isAuthenticated()) {
    return <Route path={path} component={component} />;
  }
  return <Redirect to="/" />;
}

ProtectedRouter.defaultProps = {
  path: '/',
  component: Login,
};

ProtectedRouter.propTypes = {
  path: PropTypes.string,
  component: PropTypes.elementType,
};
