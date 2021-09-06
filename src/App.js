import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';

import Main from './views/Main';
import NotFound from './views/NotFound';
import Note from './views/Note';

import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Profile from './views/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <div>
            <NavBar />
          </div>
          <Switch>
            <Route exact path="/">
              <Redirect to="/Notes" />
            </Route>
            <PrivateRoute exact path="/Profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute exact path="/Notes">
              <Main />
            </PrivateRoute>
            <PrivateRoute path="/Notes/:id">
              <Note />
            </PrivateRoute>
            <PrivateRoute path="*" component={NotFound} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
