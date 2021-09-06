import React, { Component, useContext } from 'react';
import { Redirect, Route } from 'react-router';

import { AuthContext } from '../context/AuthContext';
import Auth from '../views/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        console.log(context);
        return context.user ? (
          <Route {...rest} render={(props) => <Component {...props} />} />
        ) : context.user === undefined ? (
          <div class="loading loading-lg"></div>
        ) : (
          <Auth />
        );
      }}
    </AuthContext.Consumer>
  );
};

export default PrivateRoute;
