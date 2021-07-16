import { Component, useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Loading from '../components/Loading';

import { AuthContext, AuthProvider } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { user, setUser } = useContext(AuthContext);

  const handle = () => {
    console.log('here');
  };

  console.log(user);
  console.log(user !== null);
  return user == 'loading' ? (
    <h1>Loading</h1>
  ) : user == null ? (
    <Redirect to="/Auth" />
  ) : (
    <Route path={path} {...rest} />
  );
};

export default PrivateRoute;
