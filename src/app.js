import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useUser } from './context/user-context';
import Login from './components/login';
import './app.css';

function App() {
  const user = useUser();
  console.log(user);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            { !user ? 
              <Login /> : (
                <div>{ JSON.stringify(user) }</div>
              )
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
