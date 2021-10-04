import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

import Login from "./Login";
import Register from "./Register";

type StateData = {
    login: boolean,
    email: string,
    password: string,
    username: string
}

type PropsType = {
    state: StateData,
    updateToken: any
}

type StateType = {
    login: boolean,
    email?: string,
    password?: string,
    username?: string
}

class Auth extends React.Component<PropsType, StateType> {
    // const [login: any, setLogin: any] = useState(false)
    // flipLogin = () => setLogin(!login)
    constructor(props: PropsType) {
        super(props)

        this.state = {
            login: false
        }
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
            <Box>
                <Button startIcon={<FlipCameraAndroidIcon />} className="authFlip" size="small" color="primary" onClick={() => this.setState(previousState => ({ login: !previousState.login }))}>Need to {this.state.login ? <>Register?</> : <>Login?</>}</Button>
                {this.state.login ? <Divider><Typography color="primary">LOGIN</Typography></Divider> : <Divider><Typography color="primary">REGISTER</Typography></Divider>}
                {this.state.login ? <Login updateToken={this.props.updateToken} state={this.props.state} />  :  <Register updateToken={this.props.updateToken} state={this.props.state} />}
            </Box>
        </ThemeProvider>
        );
    };
};

export default Auth;