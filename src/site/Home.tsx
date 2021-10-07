import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
// import Auth from '../auth/Auth';
// import Register from '../auth/Register';
// import Login from '../auth/Login';
// import ClanDisplay from '../clan/ClanDisplay';
// import Members from '../members/Members';
// import Events from '../events/Events';
// import ProtectedRoutes from './ProtectedRoutes'
// import ContactMe from './Contact'


// type StateData = {
//   login: boolean,
//   email: string,
//   password: string,
//   username: string,
//   role: string,
//   name: string,
//   description: string,
//   owner: number,
//   eventName: string,
//   eventDate: string,
//   eventDescription: string,
//   createdBy: string,
//   id: number,
//   clanId: any,
//   eventsArray: any,
//   open: boolean,
//   sessionToken: string | null,
// }

type PropsType = {
  // state: StateData,
  // sessionToken: string | null,
  // updateToken: any
}

type StateType = {
  login: boolean,
  email: string,
  password: string,
  username: string,
  role: string,
  name: string,
  description: string,
  owner: number,
  eventName: string,
  eventDate: string,
  eventDescription: string,
  createdBy: string,
  id: number,
  clanId: any,
  eventsArray: any,
  membersArray: any,
  open: boolean,
  clickLogout: any,
  sessionToken: string,
  updateToken: any,
}

class Home extends React.Component<{}, StateType> {
  constructor(props: {}) {
    super(props)
    this.state = {
      login: false,
      email: "",
      password: "",
      username: "",
      role: "",
      name: "",
      description: "",
      owner: 0,
      eventName: "",
      eventDate: "",
      eventDescription: "",
      createdBy: "",
      id: 0,
      clanId: 0,
      eventsArray: [],
      membersArray: [],
      open: false,
      clickLogout: "",
      sessionToken: "",
      updateToken: "",
    }
    this.updateToken = this.updateToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
  }


  updateToken(newToken: any) {
    localStorage.setItem("token", newToken);
    this.setState({sessionToken: newToken});
  }

  clearToken = () =>{
    localStorage.clear();
    // setSessionToken("");
  }

  componentDidMount() {
    if(localStorage.getItem("token")){
      this.setState({sessionToken: localStorage.getItem("token")})
    }
  }

  render() {

    return (
      <div>
        <Router>
          <React.Fragment>
            <Switch>
            <Route exact path="/"><Dashboard state={this.state} clickLogout={this.clearToken} updateToken={this.updateToken} sessionToken={this.state.sessionToken} /></Route>
                
          
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default Home;

// function setSessionToken(arg0: string) {
//   throw new Error('Function not implemented.');
// }
