import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { navBarList } from './NavBar';
import ClanDisplay from '../clan/ClanDisplay';
import Members from '../members/Members';
import Events from '../events/Events';
import Auth from '../auth/Auth';
import { AppDialog, appDialogState } from '../helpers/AppDialog';


const Dashboard = (props: any) => {
    const drawerWidth: number = 210;
    const myTheme = createTheme({
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

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: '#37474f',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        
      };
    
    // controls modal opening/closing
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };
    // controls for AppDialog alerts
    const handleSubmitClick = () => console.log('Dialog?!');
    const handleLogout = () => {
      localStorage.clear();
      appDialogState(`You have been logged out.`, handleSubmitClick)
    }


  return (
    <ThemeProvider theme={myTheme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="absolute" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ pr: '24px' }}>
            
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              align="left"
              sx={{ flexGrow: 1 }}
            >
              Clan Organizer
            </Typography>
            <Button className="loginButton" color="inherit" startIcon={<LoginIcon />} onClick={handleOpen}>Login</Button>
                <Dialog
                id="authModal"
                open={open}
                onClose={handleClose}
                >
                    <DialogContent>
                        <Auth state={props.state} updateToken={props.updateToken} />
                    </DialogContent>
                </Dialog>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Button className="logoutButton" color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
          </Toolbar>
          <List>{navBarList}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Clan Overview */}
              <Grid item xs={12} md={7} lg={8}>
                <Paper elevation={3}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <ClanDisplay state={props.state} sessionToken={props.sessionToken} />
                </Paper>
              </Grid>
              {/* Clan Members List */}
              <Grid item xs={12} md={5} lg={4}>
                <Paper elevation={3}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Members state={props.state} sessionToken={props.sessionToken} />
                </Paper>
              </Grid>
              {/* Clan Events */}
              <Grid item xs={12}>
                <Paper elevation={3}
                sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                >
                  <Events state={props.state} sessionToken={props.sessionToken} />
                </Paper>
              </Grid>
            </Grid>
            <div className="footerDiv">
            <Typography variant="body2" color="text.secondary" align="center">
                Copyright © Richard Carter 2021.
            </Typography>
            </div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;