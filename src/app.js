import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useUser } from './context/user-context';
import Home from './pages/home';
import Login from './pages/login';
import './app.css';

function App() {
  const user = useUser();

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <Home user={ user } { ...props } />
            )} 
          />
          <Route exact path="/login">
            { user ?
              <Redirect to="/" /> :
              <Login />
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
