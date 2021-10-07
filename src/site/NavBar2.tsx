import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import MessageIcon from '@mui/icons-material/Message';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { AppDialog, appDialogState } from '../helpers/AppDialog';
import ContactMe from './Contact';



type StateData = {
  login: boolean,
  id: number,
  name: string,
  description: string,
  owner: number,
  sessionToken: string,
}

type PropsType = {
  state: StateData,
  sessionToken: string
}

type StateType = {
  open: boolean,
}

export default class NavBarList2 extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // helper for modals
    handleSubmitClick = () => console.log('Dialog?!');

    handleOpen() {
        this.setState({open: true})
    }

    handleClose() {
        this.setState({open: false})
    }

  render() {

  return(
  <div>
    <List>
    <Divider />
    <ListSubheader>Support</ListSubheader>
    {/* <Link underline="none" href="mailto:rbc.coding@gmail.com"> */}
      {/* <ListItem button onClick={() =>
          appDialogState(`If your email client does not load, you can reach me at: rbc.coding@gmail.com`, handleSubmitClick)}> */}
          <ListItem button onClick={this.handleOpen}>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItem>
      <Dialog
            id="contactModal"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogContent>
              <ContactMe />
            </DialogContent>
          </Dialog>
      {/* <AppDialog /> */}
    {/* </Link> */}
    <ListItem button onClick={() => appDialogState('Feature not added yet. In the meantime, the developer gratefully accepts: Cashapp $reeshard', this.handleSubmitClick)}>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Donate" />
    </ListItem>
    <AppDialog />
    </List>
  </div>
  );
  }
}