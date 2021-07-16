import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Main from './views/Main';
import NotFound from './views/NotFound';
import Auth from './views/Auth';
import Note from './views/Note';

import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Create from './views/Create';

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
            <Route exact path="/Notes">
              <Main />
            </Route>
            <Route exact path="/Auth">
              <Auth />
            </Route>
            <Route path="/Notes/:id">
              <Note />
            </Route>
            <Route path="/Create/:id">
              <Create />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
