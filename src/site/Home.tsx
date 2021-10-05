import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
// import Auth from '../auth/Auth';
// import Register from '../auth/Register';
// import Login from '../auth/Login';
import ClanDisplay from '../clan/ClanDisplay';
import Members from '../members/Members';
import Events from '../events/Events';
import ProtectedRoutes from './ProtectedRoutes'


// type StateData = {
//   login: boolean,
//   sessionToken: string,
//   updateToken: string,
//   email: string,
//   password: string,
//   username: string,
// }

type PropsType = {
  // state: StateData,
  // updateToken: any
}

type StateType = {
  login: boolean,
    email?: string,
    password?: string,
    username?: string,
    role?: string,
    name?: string,
    description?: string,
    owner?: number,
    eventName?: string,
    eventDate?: string,
    eventDescription?: string,
    createdBy?: string,
    clanId?: number
    eventsArray?: any,
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

  clearToken = () =>{
    localStorage.clear();
    setSessionToken("");
  }



  render() {

    return (
      <div>
        <Router>
          <React.Fragment>
            <Dashboard />
            <Switch>
                
              <Route path="/dashboard"><Dashboard clickLogout={this.clearToken} updateToken={this.updateToken} sessionToken={this.state.sessionToken} /></Route>
              {/* <Route exact path="/auth"><Auth state={this.state} updateToken={this.updateToken} /> </Route> */}
              <Route path="/login"></Route>
              <Route path="/register"></Route>
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

function setSessionToken(arg0: string) {
  throw new Error('Function not implemented.');
}
