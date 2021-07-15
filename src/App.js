import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Main from './views/Main';
import NotFound from './views/NotFound';
import Auth from './views/Auth';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';

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
              <Main />
            </Route>
            <Route exact path="/Auth">
              <Auth />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
