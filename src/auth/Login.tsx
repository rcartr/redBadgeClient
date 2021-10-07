import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import APIURL from "../helpers/environment";
import { AppDialog, appDialogState } from '../helpers/AppDialog'

type StateData = {
    login: boolean,
    email: string,
    password: string,
    
}

type PropsType = {
    state: StateData,
    updateToken: any
}

type StateType = {
    login: boolean,
    email: string,
    password: string
}


class Login extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            login: false,
            email: "",
            password: ""
        }
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleSubmitClick = () => console.log('Dialog?!');

    handleLogin(event: any) {
        event.preventDefault()
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({user: {
                email: this.state.email,
                password: this.state.password
            }}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then (
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken)
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    stateEmail(event: any) {
        this.setState({ email: event.target.value })
    }

    statePassword(event: any) {
        this.setState({ password: event.target.value })
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
            <Box component="form" onSubmit={this.handleLogin}>
                <TextField required
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email Address"
                    value={this.state.email}
                    autoComplete="email"
                    fullWidth
                    autoFocus
                    onChange={(event) => this.stateEmail(event)}
                />
                <TextField required
                    margin="normal"
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={this.state.password}
                    autoComplete="current-password"
                    fullWidth
                    onChange={(event) => this.statePassword(event)}
                />
                <Button className="authSubmit"
                    type="submit" variant="contained" fullWidth
                    onClick={() => appDialogState('You are logged in!', this.handleSubmitClick)}>
                    Submit
                </Button>
                <AppDialog />
            </Box>
        </ThemeProvider>
            
        )
    };
};

export default Login