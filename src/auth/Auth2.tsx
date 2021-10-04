import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

import Login from "./Login";
import Register from "./Register";

type StateData = {
    login: boolean,
    email: string,
    password: string,
    username: string,
    open: any,
}

type PropsType = {
    state: StateData,
    updateToken: any
}

type StateType = {
    login: boolean,
    email?: string,
    password?: string,
    username?: string,
    open?: boolean,
}

class Auth2 extends React.Component<PropsType, StateType> {
    // I set this up to see if I could have the auth dialog modal set up entirely within its own component and simply call the component for it to render. Trying to set up modals for each component has been a problem as opening a modal makes every modal within the component open.
    constructor(props: PropsType) {
        super(props)

        this.state = {
            login: false,
            open: false
        }
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose(open: boolean) {
        open = false
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
        return (
            <ThemeProvider theme={this.myTheme}>
                <Dialog
                id="authModal"
                open={true}
                onClose={this.handleClose}
                >
                <DialogContent>
                    <Box>
                    <Button startIcon={<FlipCameraAndroidIcon />} className="authFlip" size="small" color="primary" onClick={() => this.setState(previousState => ({ login: !previousState.login }))}>Need to {this.state.login ? <>Register?</> : <>Login?</>}</Button>
                    {this.state.login ? <Divider><Typography color="primary">LOGIN</Typography></Divider> : <Divider><Typography color="primary">REGISTER</Typography></Divider>}
                    {this.state.login ? <Login updateToken={this.props.updateToken} state={this.props.state} />  :  <Register updateToken={this.props.updateToken} state={this.props.state} />}
                    </Box>
                </DialogContent>
                </Dialog>
        </ThemeProvider>
        );
    };
};

export default Auth2;