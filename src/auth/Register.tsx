import * as React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogContent from '@mui/material/DialogContent'
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogActions from '@mui/material/DialogActions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import APIURL from '../helpers/environment';
import { AppDialog, appDialogState } from '../helpers/AppDialog'

type StateData = {
    login: boolean,
    email: string,
    password: string,
    username: string,
    open?: boolean,
}

type PropsType = {
    state: StateData,
    updateToken: any,
}

type StateType = {
    login: boolean,
    email: string,
    password: string,
    username: string,
    open?: boolean,
}

class Register extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            login: false,
            email: "",
            password: "",
            username: "",
            open: false
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleSubmitClick = () => console.log('Dialog?!');

    handleRegister(event: any) {
        event.preventDefault()
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({user: {email: this.state.email, password: this.state.password, username: this.state.username}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((res) => res.json())
        .then((data) => {
            this.props.updateToken(data.sessionToken)
            if(data.message === "User successfully registered") {
                return alert('Registration successful!')
            } else {
                return alert("Registration unsuccessful, please try again.")
            }
        })
        .catch(e => console.log(e))
    }

    stateEmail(event: any) {
        this.setState({ email: event.target.value })
    }

    statePassword(event: any) {
        this.setState({ password: event.target.value })
    }

    stateUsername(event: any) {
        this.setState({ username: event.target.value })
    }

    myTheme = createTheme({
        palette: {
            primary: {
                light: '#819ca9',
                main: '#546e7a',
                dark: '#29434e',
                contrastText: '#ffffff',
              },
              secondary: {
                light: '#ffffff',
                main: '#eceff1',
                dark: '#babdbe',
                contrastText: '#000000',
            },
          },
    });

    render() {
        return(
        <ThemeProvider theme={this.myTheme}>
            <Box component="form" onSubmit={this.handleRegister}>
                <TextField required
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email Address"
                    autoComplete="email"
                    fullWidth
                    autoFocus
                    onChange={(e) => this.stateEmail(e)}
                    value={this.state.email}
                />
                <TextField required
                    margin="normal"
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                    fullWidth
                    onChange={(e) => this.statePassword(e)}
                    value={this.state.password}
                />
                <TextField required
                    margin="normal"
                    id="username"
                    name="username"
                    label="Display Name"
                    fullWidth
                    onChange={(e) => this.stateUsername(e)}
                    value={this.state.username}
                />
                <Button className="authSubmit" 
                    type="submit" variant="contained" fullWidth 
                    onClick={() => appDialogState('Registration successful!', this.handleSubmitClick)}>
                    Submit
                </Button>
                <AppDialog />
            </Box>
        </ThemeProvider>
        );
    };
};

export default Register;