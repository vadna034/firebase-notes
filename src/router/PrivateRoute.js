import React from 'react';
import { Route } from 'react-router';

import { AuthContext } from '../context/AuthContext';
import Auth from '../views/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        return context.user ? (
          <Route {...rest} />
        ) : context.user === undefined ? (
          <div className="loading loading-lg"></div>
        ) : (
          <Auth />
        );
      }}
    </AuthContext.Consumer>
  );
};

export default PrivateRoute;
