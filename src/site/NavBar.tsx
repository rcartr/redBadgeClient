import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PublicIcon from '@mui/icons-material/Public';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import ClanCreate from '../clan/ClanCreate';

// helper for modals
// const handleSubmitClick = () => console.log('Dialog?!');

type StateData = {
  login: boolean,
  id: number,
  name: string,
  description: string,
  owner: number,
  role: string,
  email: string,
  clanId: number,
  sessionToken: string,
}

type PropsType = {
  state: StateData
  sessionToken: string
  updateToken: any
}

type StateType = {
  open: boolean,
}

export default class NavBarList extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

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
    <ListSubheader>Main</ListSubheader>
   
    <ListItem button  onClick={this.handleOpen}>
      <ListItemIcon>
        <PublicIcon />
      </ListItemIcon>
      <ListItemText primary="Create Clan" />
    </ListItem>
          <Dialog
            id="createClanModal"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogContent>
              <ClanCreate state={this.props.state} sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} />
            </DialogContent>
          </Dialog>
    {/* <ListItem button>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="Add Member" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EventNoteIcon />
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EmojiEventsIcon />
      </ListItemIcon>
      <ListItemText primary="Leaderboard" />
    </ListItem> */}
    </List>
    </div>
  );
  }
}