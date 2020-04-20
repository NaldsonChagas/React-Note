import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../Pages/Home';

export default function ProtectedRouter(props) {
  const { path, component } = props;

  function isAuthenticated() {
    return localStorage.getItem('Authorization')
      && localStorage.getItem('userId');
  }

  if (isAuthenticated()) {
    return <Route path={path} component={component} />;
  }
  return (
    <Redirect to={{
      pathname: '/',
      state: {
        alert: {
          message: 'Faça login primeiro',
          type: 'warning',
        },
      },
    }}
    />
  );
}

ProtectedRouter.defaultProps = {
  path: '/',
  component: Home,
};

ProtectedRouter.propTypes = {
  path: PropTypes.string,
  component: PropTypes.elementType,
};
