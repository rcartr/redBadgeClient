import * as React from 'react';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './site/Dashboard';
import Auth from './auth/Auth';
import Register from './auth/Register';
import Login from './auth/Login';
import ClanDisplay from './clan/ClanDisplay';
import Members from './members/Members';
import Events from './events/Events';

import './App.css';

function App() {
  const [sessionToken, setSessionToken] = useState("");


  useEffect(() => {
    if(localStorage.getItem("token")){
      setSessionToken(localStorage.getItem("token"));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken)
  }

  const clearToken = () =>{
    localStorage.clear();
    setSessionToken("");
  }

  // const protectedViews = () => {
  //   return(
      
  //   )
  // }

  return (
    <div className="App">
      <React.Fragment>
            <Router>
                <Dashboard clickLogout={clearToken} updateToken={updateToken} />
                
                <Switch>
                    <Route exact path="/auth" component={ Auth } />
                    <Route exact path="/clan" component={ ClanDisplay } />
                    <Route exact path="/members" component={ Members } />
                    <Route exact path="/events" component={ Events } />
                </Switch>
            </Router>
        </React.Fragment>
    </div>
  );
}

export default App;
