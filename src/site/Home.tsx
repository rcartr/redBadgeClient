import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Auth from '../auth/Auth';
import Register from '../auth/Register';
import Login from '../auth/Login';
import ClanDisplay from '../clan/ClanDisplay';
import Members from '../members/Members';
import Events from '../events/Events';
import ProtectedRoutes from './ProtectedRoutes'

import './App.css';

type StateData = {
  login: boolean,
  sessionToken: string,
  updateToken: string,
  email: string,
  password: string,
  username: string,
}

type PropsType = {
  state: StateData,
  updateToken: any
}

type StateType = {
  login: boolean,
  sessionToken: string,
}

class Home extends React.Component<{}, StateType> {
  constructor(props: {}) {
    super(props)
    this.state = {
      login: false,
      sessionToken: "",
    }
    this.updateToken = this.updateToken.bind(this)
  }


  updateToken(newToken: any) {
    localStorage.setItem("token", newToken);
    this.setState({sessionToken: newToken});
  }

  const clearToken = () =>{
    localStorage.clear();
    setSessionToken("");
  }



  render() {

    return (
      <div>
        <Router>
          <React.Fragment>
            
            <Switch>
                
              <Route 
                path="/dashboard"
                component={() => <Dashboard clickLogout={clearToken} updateToken={updateToken} sessionToken={sessionToken} />}
              />
              <Route exact path="/auth" component={() => <Auth state={this.state} />} />
              <Route path="/login" component={() => <Login setIsAuth={setIsAuth} />} />
              <Route path="/register" component={() => <Register setIsAuth={setIsAuth} />} />
              <Route exact path="/clan" component={ ClanDisplay } />
              <Route exact path="/members" component={ Members } />
              <Route exact path="/events" component={ Events } />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default Home;